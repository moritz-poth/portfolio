# moritz-poth.com

Statische Version der Portfolio-Website. GitHub baut die Seite automatisch neu, sobald sich hier etwas ändert.

## Ordner

| Ordner / Datei | Inhalt |
|---|---|
| `content/projekte/<adresse>.md` | Text eines Projekts |
| `content/projekte/<adresse>/` | die Galerie-Bilder dieses Projekts |
| `content/seiten/<adresse>.md` | About, Contact, Impressum, Datenschutzerklärung (Bild ggf. im gleichnamigen Ordner) |
| `content/site.json` | Name, Menü, Kategorien, Social-Links |
| `static/css/style.css` | das Stylesheet aus dem alten Theme |
| `static/fonts/` | die beiden Schriften (lokal, statt von Google) |
| `static/royalslider/` | RoyalSlider; Einstellungen in `static/js/slider.js` |
| `templates.js` | die HTML-Vorlagen (entsprechen header.php, single.php usw.) |
| `build.js` | erzeugt aus allem die fertige Seite im Ordner `_site/` |

## Neues Projekt anlegen

1. In `content/projekte/` einen Ordner `mein-neuer-film` anlegen. Der Name wird zur Adresse: `moritz-poth.com/mein-neuer-film/` (nur Kleinbuchstaben, Zahlen und Bindestriche).
2. Die Galerie-Bilder hineinlegen, benannt als `01.jpg`, `02.jpg` … (Reihenfolge = Dateiname, am besten 1600 px breit).
3. Neben dem Ordner (also direkt in `content/projekte/`) eine Datei `mein-neuer-film.md` anlegen – gleicher Name wie der Ordner:

```
---
titel: MEIN NEUER FILM
untertitel: Kinospielfilm
kategorie: fiction
datum: 2026-11-01
vorschaubild: 01.jpg
---

Beschreibungstext. Eine Leerzeile beginnt einen neuen Absatz.
Links gehen so: [Regie](https://example.com)

## Credits

90 Min.

Produktion: …
Regie: …
Schnitt: Moritz Poth
```

- `kategorie`: `fiction`, `documentary` oder `commercial-music`
- `datum` bestimmt die Reihenfolge (neueste oben)
- `vorschaubild`: Bild für die Übersicht; ohne Angabe das erste
- `entwurf: ja` blendet ein Projekt aus

Am einfachsten kopierst du ein bestehendes Projekt (`.md`-Datei + Ordner) und änderst Namen, Text und Bilder.

4. In GitHub Desktop: Commit → Push. Nach etwa einer Minute ist das Projekt online.

## RoyalSlider

Die Galerie nutzt RoyalSlider (jQuery-Version, lizenziert). Die Einstellungen sind 1:1 aus WordPress übernommen und stehen in `static/js/slider.js`.

## Vorschau auf dem eigenen Rechner (optional)

Mit installiertem Node.js im Terminal in diesem Ordner: `node build.js --serve`, dann http://localhost:8080 öffnen.
