/*
 * HTML-Vorlagen der Website – entsprechen den PHP-Dateien des alten
 * WordPress-Themes "moritz_poth_v06" (header.php, footer.php, index.php,
 * single.php, page.php, 404.php).
 */

const ICON = {
  copyright: '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 448c-110.532 0-200-89.451-200-200 0-110.531 89.451-200 200-200 110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200zm107.351-101.064c-9.614 9.712-45.53 41.396-104.065 41.396-82.43 0-140.484-61.425-140.484-141.567 0-79.152 60.275-139.401 139.762-139.401 55.531 0 88.738 26.62 97.593 34.779a11.965 11.965 0 0 1 1.936 15.322l-18.155 28.113c-3.841 5.950-11.966 7.282-17.499 2.921-8.595-6.776-31.814-22.538-61.708-22.538-48.303 0-77.916 35.33-77.916 80.082 0 41.589 26.888 83.692 78.277 83.692 32.657 0 56.843-19.039 65.726-27.225 5.27-4.857 13.596-4.039 17.82 1.738l19.865 27.170a11.947 11.947 0 0 1-1.152 15.518z"/></svg>',
  vimeo: '<svg viewBox="0 0 448 512" aria-hidden="true"><path d="M447.8 153.6c-2 43.6-32.4 103.3-91.4 179.1-60.9 79.2-112.4 118.8-154.6 118.8-26.1 0-48.2-24.1-66.3-72.3C100.3 250 85.3 174.3 56.2 174.3c-3.4 0-15.1 7.1-35.2 21.1L0 168.2c51.6-45.3 100.9-95.7 131.8-98.5 34.9-3.4 56.3 20.5 64.4 71.5 28.7 181.5 41.4 208.9 93.6 126.7 18.7-29.6 28.8-52.1 30.2-67.6 4.8-45.9-35.8-42.8-63.3-31 22-72.1 64.1-107.1 126.2-105.1 45.8 1.2 67.5 31.1 64.9 89.4z"/></svg>',
  instagram: '<svg viewBox="0 0 448 512" aria-hidden="true"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>',
  envelope: '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.490-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"/></svg>',
  angleUp: '<svg viewBox="0 0 320 512" aria-hidden="true"><path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"/></svg>',
};

// ---------------------------------------------------------------- header.php

function header(c, { title, description = '', active = '', bodyClass = '' }) {
  const { site, url, esc, royalSlider } = c;
  const fullTitle = title ? `${title} | ${site.titel}` : site.titel;
  const menu = site.menue
    .map((m) => {
      const href = m.link.startsWith('http') ? m.link : url(m.link);
      const current = href === active ? ' current-menu-item' : '';
      return `<li class="menu-item${current}"><a href="${href}">${m.name}</a></li>`;
    })
    .join('\n\t\t\t\t\t');

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="de-DE">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=1030">
<title>${esc(fullTitle)}</title>
${description ? `<meta name="description" content="${esc(description)}" />\n` : ''}<link rel="icon" href="${url('/favicon-32.jpg')}" sizes="32x32" />
<link rel="icon" href="${url('/favicon-192.jpg')}" sizes="192x192" />
<link rel="apple-touch-icon" href="${url('/apple-touch-icon.jpg')}" />
${royalSlider ? `<link rel="stylesheet" href="${url('/royalslider/royalslider.css')}" />\n<link rel="stylesheet" href="${url('/royalslider/skin/rs-moritz-poth.css')}" />\n` : ''}<link rel="stylesheet" href="${url('/css/fonts.css')}" type="text/css" />
<link rel="stylesheet" href="${url('/css/style.css')}" type="text/css" media="screen" />
</head>
<body id="main_page" class="${bodyClass}">
	<div id="wrapper">
		<div id="body_center">
			<div id="navigation">
				<div id="navi-name">${site.titel}</div>
				<div id="navi-sub">${site.untertitel}</div>
				<div id="navi-center"><div class="menu-container"><ul class="menu">
					${menu}
				</ul></div></div>
			</div>
			<div id="clear"></div>
			<div id="content">
`;
}

// ---------------------------------------------------------------- footer.php

function footer(c, { scripts = '' } = {}) {
  const { site, url, year } = c;
  const s = site.social;
  return `
			</div>
		</div>
	</div>
	<footer>
		<div id="footer_content">
			<div id="footer_content_center">
				<p><i class="icon">${ICON.copyright}</i> <span id="year">${year}</span> - all rights reserved - <a href="${url('/datenschutzerklaerung/')}" title="Datenschutzerkl&auml;rung">Datenschutzerkl&auml;rung</a> - <a href="${url('/impressum/')}" title="Impressum">Impressum</a><br /><br /></p>
				<ul class="social_icon">
					<li>
						<a href="${s.vimeo}" target="_blank" rel="noopener" title="Vimeo"><i class="icon">${ICON.vimeo}</i></a>
					</li>
					<li>
						<a href="${s.instagram}" target="_blank" rel="noopener" title="Instagram"><i class="icon">${ICON.instagram}</i></a>
					</li>
					<li>
						<a href="${url('/contact/')}" title="Contact"><i class="icon">${ICON.envelope}</i></a>
					</li>
				</ul>
			</div>
		</div>
	</footer>
	<button onclick="topFunction()" id="gototop" title="zur&uuml;ck zum Seitenanfang"><i class="icon">${ICON.angleUp}</i> top</button>
${scripts}<script src="${url('/js/scroll.js')}"></script>
<script>document.getElementById('year').textContent = new Date().getFullYear();</script>
</body>
</html>
`;
}

// ------------------------------------------------- index.php / category-*.php

function list(c, { title, active, projects }) {
  const { esc } = c;
  const items = projects
    .map((p) => {
      const t = p.thumb;
      const img = t
        ? `<img width="800" height="${Math.round((t.h * 800) / t.w)}" src="${t.src}" class="attachment-large size-large wp-post-image" alt="${esc(p.title)}" title="${esc(p.title)}" />`
        : '';
      return `				<li id="post-${p.slug}">
					<a href="${p.url}" title="${esc(p.title)}"><div class="title">
						<div class="headline">${p.title}</div>
						<div class="line"><span class="vline">&nbsp;</span><hr /></div>
						<div class="subline">${p.subtitle}</div>
					</div>
					${img}</a>
				</li>`;
    })
    .join('\n');

  return (
    header(c, { title, active, bodyClass: 'home' }) +
    `			<ul>
${items}
			</ul>
` +
    footer(c)
  );
}

// ---------------------------------------------------------------- single.php

function project(c, { p, newer, older }) {
  const { url, royalSlider, esc } = c;
  let stills = '';
  if (p.images.length) {
    const slides = p.images
      .map((i) => `<div class="rsContent">\n  <img class="rsImg" src="${i.src}" alt="${esc(p.title)}" />\n</div>`)
      .join('\n');
    stills = `	<div id="stills" class="stills">
		<div class="royalSlider rsMoritzPoth rs-default-template" style="width:100%;">
		${slides}
		</div>
	</div>
`;
  }
  const scripts = royalSlider
    ? `<script src="${url('/js/jquery.min.js')}"></script>
<script src="${url('/royalslider/jquery.royalslider.min.js')}"></script>
<script src="${url('/js/slider.js')}"></script>
`
    : '';

  return (
    header(c, { title: p.title, bodyClass: 'single' }) +
    `<div class="next">${newer ? `<a href="${newer.url}" rel="next">&laquo; next</a>` : ''}</div>
<div class="previous">${older ? `<a href="${older.url}" rel="prev">previous &raquo;</a>` : ''}</div>
<div id="clear"></div>
<div class="projektseite" id="post-${p.slug}">
${stills}
	<div class="title">
		<div class="headline">${p.title}</div>
		<div class="line"><span class="vline">&nbsp;</span><hr /></div>
		<div class="subline">${p.subtitle}</div>
	</div>

	<div class="the_content">${p.html}</div>

	<div class="projekt_daten">${p.credits}</div>
</div>
<div id="clear"></div>
` +
    footer(c, { scripts })
  );
}

// ------------------------------------------------------------------ page.php

function page(c, { page, active }) {
  const { esc } = c;
  const img = page.image
    ? `<img width="${page.image.w}" height="${page.image.h}" src="${page.image.src}" class="attachment-full size-full wp-post-image" alt="${esc(page.title)}" title="${esc(page.title)}" />`
    : '';
  return (
    header(c, { title: page.title, description: page.description, active, bodyClass: 'page' }) +
    `		${img}
		<div class="text">
${page.html}
		</div>
		<div id="clear"></div>
` +
    footer(c)
  );
}

// ------------------------------------------------------------------- 404.php

function notFound(c) {
  return (
    header(c, { title: 'Seite nicht gefunden', bodyClass: 'error404' }) +
    `		<div class="text">Sorry, but you are looking for something that isn&#8217;t here.</div>
` +
    footer(c)
  );
}

module.exports = { list, project, page, notFound };
