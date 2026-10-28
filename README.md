# moritz-poth.com

Statische Version der Portfolio-Website. GitHub baut die Seite automatisch neu, sobald sich hier etwas ändert.

## Ordner

| Ordner / Datei | Inhalt |
|---|---|
| `content/projekte/` | ein Projekt = eine `.md`-Datei |
| `content/seiten/` | About, Contact, Impressum, Datenschutzerklärung |
| `content/site.json` | Name, Menü, Kategorien, Social-Links |
| `static/images/<projekt>/` | Bilder der Galerie, Reihenfolge nach Dateiname (`01.jpg`, `02.jpg` …) |
| `static/css/style.css` | das Stylesheet aus dem alten Theme |
| `static/royalslider/` | hier kommen die RoyalSlider-Dateien hin (siehe unten) |
| `templates.js` | die HTML-Vorlagen (entsprechen header.php, single.php usw.) |
| `build.js` | erzeugt aus allem die fertige Seite im Ordner `_site/` |

## Neues Projekt anlegen

1. Ordner `static/images/mein-neuer-film/` anlegen, Bilder als `01.jpg`, `02.jpg` … hineinlegen (am besten 1600 px breit).
2. Datei `content/projekte/mein-neuer-film.md` anlegen. Der Dateiname wird zur Adresse: `moritz-poth.com/mein-neuer-film/`.

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

3. In GitHub Desktop: Commit → Push. Nach etwa einer Minute ist das Projekt online.

## RoyalSlider

Aus der jQuery-Version von RoyalSlider diese zwei Dateien nach `static/royalslider/` kopieren:

- `jquery.royalslider.min.js`
- `royalslider.css`

Bis dahin zeigt die Galerie nur das erste Bild. Die Slider-Einstellungen stehen in `static/js/slider.js`.

## Vorschau auf dem eigenen Rechner (optional)

Mit installiertem Node.js im Terminal in diesem Ordner: `node build.js --serve`, dann http://localhost:8080 öffnen.
