#!/usr/bin/env node
/*
 * MORITZ POTH – Website-Generator
 * --------------------------------
 * Baut aus den Dateien in /content und /static die fertige Website in /_site.
 * Braucht nur Node.js, keine weiteren Pakete.
 *
 *   node build.js           → Website in _site/ erzeugen
 *   node build.js --serve   → erzeugen und unter http://localhost:8080 ansehen
 */

const fs = require('fs');
const path = require('path');
const T = require('./templates.js');

const ROOT = __dirname;
const OUT = path.join(ROOT, '_site');
const site = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', 'site.json'), 'utf8'));

// Wird von GitHub automatisch gesetzt, solange noch keine eigene Domain verbunden ist
// (dann liegt die Seite z. B. unter benutzername.github.io/repo-name/).
const BASE = (process.env.BASE_PATH || '').replace(/\/$/, '');
const url = (p) => BASE + p;

// ---------------------------------------------------------------------------
// Hilfsfunktionen
// ---------------------------------------------------------------------------

/** Liest "---"-Kopfbereich (schlüssel: wert) und Text einer Inhaltsdatei. */
function readContentFile(file) {
  const raw = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: Kopfbereich (---) fehlt`);
  const data = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i === -1 || !line.trim()) continue;
    data[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { data, body: m[2] };
}

const BLOCK = /^<(p|h[1-6]|ul|ol|li|div|table|blockquote|hr|figure|pre|iframe)[\s>\/]/i;

/** Wie WordPress' wpautop: Leerzeile = neuer Absatz, Zeilenumbruch = <br>. */
function autop(text) {
  return text
    .trim()
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      chunk = inlineMarkdown(chunk);
      if (BLOCK.test(chunk)) return chunk;
      return '<p>' + chunk.replace(/\n/g, '<br />\n') + '</p>';
    })
    .join('\n');
}

/** Ein bisschen Markdown für neue Texte: [Text](Link) und **fett**. */
function inlineMarkdown(s) {
  return s
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

const esc = (s) => String(s).replace(/&(?!#?\w+;)/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Breite/Höhe eines JPG/PNG direkt aus der Datei lesen. */
function imageSize(file) {
  const b = fs.readFileSync(file);
  if (b[0] === 0x89 && b[1] === 0x50) return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  let i = 2;
  while (i < b.length) {
    if (b[i] !== 0xff) { i++; continue; }
    const marker = b[i + 1];
    const len = b.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
    }
    i += 2 + len;
  }
  throw new Error(`Bildgröße nicht lesbar: ${file}`);
}

function writePage(route, html) {
  const file = path.join(OUT, route, route.endsWith('.html') ? '' : 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

function copyImage(img, slug) {
  const dst = path.join(OUT, slug, img.name);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(img.file, dst);
}

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    e.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}

// ---------------------------------------------------------------------------
// Inhalte einlesen
// ---------------------------------------------------------------------------

const IMG_EXT = /\.(jpe?g|png|webp)$/i;
const warnings = [];

const listMd = (dir) =>
  fs.readdirSync(dir).filter((f) => f.endsWith('.md') && !f.startsWith('.')).map((f) => f.replace(/\.md$/, ''));

// Jedes Projekt: content/projekte/<adresse>.md + Bilder im Ordner content/projekte/<adresse>/
const projects = listMd(path.join(ROOT, 'content', 'projekte'))
  .map((slug) => {
    const { data, body } = readContentFile(path.join(ROOT, 'content', 'projekte', `${slug}.md`));
    if (data.entwurf === 'ja') return null;
    const [text, credits = ''] = body.split(/^##\s*Credits\s*$/im);

    const dir = path.join(ROOT, 'content', 'projekte', slug);
    const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((x) => IMG_EXT.test(x)).sort() : [];
    if (!files.length) warnings.push(`Projekt "${slug}": keine Bilder im Ordner content/projekte/${slug}/`);
    const images = files.map((name) => ({
      file: path.join(dir, name),
      name,
      src: url(`/${slug}/${encodeURIComponent(name)}`),
      ...imageSize(path.join(dir, name)),
    }));
    const thumb = images.find((i) => i.name === data.vorschaubild) || images[0];
    if (data.vorschaubild && thumb && thumb.name !== data.vorschaubild) {
      warnings.push(`Projekt "${slug}": Vorschaubild "${data.vorschaubild}" nicht gefunden, nehme ${thumb.name}`);
    }
    if (!site.kategorien[data.kategorie]) {
      warnings.push(`Projekt "${slug}": unbekannte Kategorie "${data.kategorie}"`);
    }
    return {
      slug,
      url: url(`/${slug}/`),
      title: data.titel || slug,
      subtitle: data.untertitel || '',
      category: data.kategorie,
      date: data.datum || '1970-01-01',
      html: autop(text),
      credits: autop(credits),
      images,
      thumb,
    };
  })
  .filter(Boolean)
  // Neueste zuerst – wie bei WordPress
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));

// Jede Seite: content/seiten/<adresse>.md, ein Bild ggf. im Ordner content/seiten/<adresse>/
const pages = listMd(path.join(ROOT, 'content', 'seiten')).map((slug) => {
  const { data, body } = readContentFile(path.join(ROOT, 'content', 'seiten', `${slug}.md`));
  let image = null;
  if (data.bild) {
    const file = path.join(ROOT, 'content', 'seiten', slug, data.bild);
    image = { file, name: data.bild, src: url(`/${slug}/${encodeURIComponent(data.bild)}`), ...imageSize(file) };
  }
  return { slug, url: url(`/${slug}/`), title: data.titel || slug, description: data.beschreibung || '', html: autop(body), image };
});

// ---------------------------------------------------------------------------
// Seiten erzeugen
// ---------------------------------------------------------------------------

fs.rmSync(OUT, { recursive: true, force: true });
copyDir(path.join(ROOT, 'static'), OUT);

const royalSlider =
  fs.existsSync(path.join(ROOT, 'static', 'royalslider', 'jquery.royalslider.min.js')) &&
  fs.existsSync(path.join(ROOT, 'static', 'royalslider', 'royalslider.css'));
if (!royalSlider) {
  warnings.push('RoyalSlider-Dateien fehlen in static/royalslider/ – Galerie zeigt vorerst nur das erste Bild.');
}

const ctx = { site, url, esc, royalSlider, year: new Date().getFullYear() };

// Übersichtsseiten: Startseite = Kategorie mit "startseite": true
for (const [key, cat] of Object.entries(site.kategorien)) {
  const list = projects.filter((p) => p.category === key);
  const routes = [`/category/${key}/`];
  if (cat.startseite) routes.unshift('/');
  for (const route of routes) {
    const active = cat.startseite ? url('/') : url(`/category/${key}/`);
    writePage(route, T.list(ctx, { title: cat.startseite && route === '/' ? null : cat.name, active, projects: list }));
  }
}

// Projektseiten mit "next"/"previous" innerhalb der Kategorie
for (const p of projects) {
  for (const img of p.images) copyImage(img, p.slug);
  const same = projects.filter((x) => x.category === p.category);
  const i = same.indexOf(p);
  writePage(`/${p.slug}/`, T.project(ctx, { p, newer: same[i - 1], older: same[i + 1] }));
}

for (const page of pages) {
  if (page.image) copyImage(page.image, page.slug);
  writePage(`/${page.slug}/`, T.page(ctx, { page, active: page.url }));
}

writePage('/404.html', T.notFound(ctx));

// ---------------------------------------------------------------------------

console.log(`✔ Fertig: ${projects.length} Projekte, ${pages.length} Seiten → _site/`);
for (const w of warnings) console.warn('⚠ ' + w);

if (process.argv.includes('--serve')) {
  const http = require('http');
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
  http
    .createServer((req, res) => {
      let p = decodeURIComponent(req.url.split('?')[0]);
      let file = path.join(OUT, p);
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
      if (!fs.existsSync(file)) { res.writeHead(404, { 'Content-Type': types['.html'] }); return res.end(fs.readFileSync(path.join(OUT, '404.html'))); }
      res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    })
    .listen(8080, () => console.log('→ Vorschau: http://localhost:8080  (Beenden mit Strg+C)'));
}
