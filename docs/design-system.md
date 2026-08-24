# Design-System & Technische Architektur – Heizung Mantsch
*V3.1 – MotionSites Edition*

---

## 1. Farbpalette & Design-Tokens

### Farbpsychologie: Thermal Precision (Wärme & Klimatechnik)
- **Heiztechnik / Wärme:** Energetisches Thermal-Orange / Ember (`hsl(24, 95%, 52%)`) symbolisiert Wärme, Zuverlässigkeit, handwerkliche Energie und Notfall-Schnelligkeit.
- **Klimatechnik / Frische:** Klares Cool-Cyan (`hsl(195, 90%, 55%)`) symbolisiert saubere Luft, Kühlung, moderne Klimalösungen und Energieeffizienz.
- **Basis-Struktur:** Tiefes Nacht-Anthrazit (`#07090e`) für Kontrast und maximale Awwwards-Ästhetik.

### CSS Custom Properties:

```css
:root {
  /* Fonts */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;

  /* Theme Defaults: Light Mode */
  --bg: #f8fafc;
  --bg-secondary: #f1f5f9;
  --fg: #0f172a;
  --fg-muted: #475569;
  --card-bg: rgba(255, 255, 255, 0.92);
  --card-border: rgba(15, 23, 42, 0.08);
  --border: rgba(15, 23, 42, 0.08);
  --glass-bg: rgba(255, 255, 255, 0.8);
  
  /* Brand Accents */
  --accent-orange: hsl(24, 95%, 50%);
  --accent-cyan: hsl(195, 90%, 42%);
  --accent-glow: hsla(24, 95%, 50%, 0.35);
  --aurora-1: hsla(24, 95%, 55%, 0.15);
  --aurora-2: hsla(195, 90%, 55%, 0.12);
}

[data-theme="dark"] {
  /* Dark Mode Defaults (Default-Theme) */
  --bg: #07090e;
  --bg-secondary: #0c1017;
  --fg: #f8fafc;
  --fg-muted: #94a3b8;
  --card-bg: rgba(13, 17, 26, 0.88);
  --card-border: rgba(255, 255, 255, 0.08);
  --border: rgba(255, 255, 255, 0.08);
  --glass-bg: rgba(7, 9, 14, 0.85);

  --accent-orange: hsl(24, 95%, 54%);
  --accent-cyan: hsl(195, 90%, 65%);
  --accent-glow: hsla(24, 95%, 54%, 0.4);
  --aurora-1: hsla(24, 95%, 52%, 0.22);
  --aurora-2: hsla(195, 90%, 55%, 0.18);
}
```

### Kontrast- & Sichtbarkeits-Matrix (Regel 5):
- **Hero-Titel / Gradient-Headings:** Vermeidung der SplitType-Falle (`-webkit-text-fill-color: transparent` ist verboten für animierte Wörter). Akzente nutzen `-webkit-text-fill-color: var(--accent-orange) !important;` mit `text-shadow: 0 0 25px var(--accent-glow);`.
- **Text auf Glas-Panels:** Dark Mode nutzt weiße / hellgraue Typografie (`#f8fafc` / `#94a3b8`) auf abgedunkelten Panels (`rgba(13, 17, 26, 0.88)`). Light Mode schaltet auf tiefes Anthrazit (`#0f172a` / `#475569`) auf weißem Glas um.

---

## 2. Typografie-Hierarchie

| Element | Schriftart | Schnitt | Desktop-Größe | Mobile-Größe | Line-Height |
|---|---|---|---|---|---|
| **Eyebrow** | Plus Jakarta Sans | Medium (500) | `0.75rem` (12px) | `0.7rem` | 1.0 (Caps, +0.2em Tracking) |
| **H1 (Hero)** | Playfair Display | Black (900) / Italic | `clamp(2.75rem, 6.5vw, 5.5rem)` | `2.5rem` | 1.05 |
| **H2 (Section)** | Playfair Display | Bold (700) | `clamp(2rem, 4.5vw, 3.5rem)` | `1.85rem` | 1.15 |
| **H3 (Card Title)** | Plus Jakarta Sans | SemiBold (600) | `1.35rem` (22px) | `1.2rem` | 1.3 |
| **Body (Fließtext)**| Plus Jakarta Sans | Regular (400) | `1.05rem` (17px) | `0.95rem` | 1.65 |
| **CTA / Buttons** | Plus Jakarta Sans | SemiBold (600) | `0.95rem` (15px) | `0.9rem` | 1.0 |

---

## 3. Animation-Blueprint & Alleinstellungsmerkmale

### A. Lenis Smooth Scroll (§ 2)
```js
const lenis = new Lenis({
  duration: 0.9,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1.0,
  touchMultiplier: 1.5,
  syncTouch: false, // Natives Touch auf Mobilgeräten
  autoResize: true,
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### B. Alleinstellungsmerkmal 1: Multi-Layer Mouse Parallax Showcase (§ 18)
- 4 interagierende Tiefenebenen im Hero-Showcase:
  - Ebene 1: Hinteres Thermal-Aura-Glow (`data-parallax="15"`)
  - Ebene 2: Haupt-Hero-Visual (`data-parallax="25"`)
  - Ebene 3: Floating Badge „Reparatur am selben Tag“ (`data-parallax="40"`)
  - Ebene 4: Floating Badge „Meisterbetrieb Ingolstadt“ (`data-parallax="55"`)

### C. Alleinstellungsmerkmal 2: Character-by-Character Scroll Reveal (§ 17)
- Qualitäts-Statement von Herrn Mantsch: Buchstaben weisen beim Scrollen eine progressive Opazitäts-Transition von `0.15` auf `1.0` auf.

### D. Alleinstellungsmerkmal 3: Horizontal Scroll-Driven Feature Showcase (§ 0A #7)
- 5 interaktive Kacheln (Wärmepumpen, Kesseltausch, Klimatechnik, 24h Notfall-Reparatur, Wartung/Hydraulischer Abgleich), die über GSAP ScrollTrigger horizontal durchscrollen.

### E. Double-Bezel Nested Architecture (§ 3 / high-end-visual-design)
- Jede Karte besteht aus `.bento-shell` (äußere Hülle mit 1px Hairline-Border und 2rem Radius) und `.bento-core` (innerer Kern mit innerem Schatten und konzentrischem Radius).

---

## 4. Header-Architektur: Unified Sticky Header

- Ein einzelner, kompakter `<header class="unified-header" id="mainNav">`:
  - **Obere Notdienst-Leiste:** `⚡ Notfall-Service & Reparatur am selben Tag • ☎ 08458 3465357 • Kurt-Huber-Str. 19, Ingolstadt` (faltet sich beim Scrollen platzsparend zusammen).
  - **Haupt-Navigationszeile:** Logo (`Heizung Mantsch`), Desktop-Links (Leistungen, Rechner, Über uns, Notdienst, Kontakt), Theme-Toggle (☀️/🌙), Anruf-CTA-Button (`Jetzt anrufen`), Morphing Hamburger Icon.
- **Kein Doppelheader-Problem** (Regel 3).

---

## 5. Mobile Responsiveness & Hamburger-Mechanik

- **Hamburger-Icon:** 3 Linien, die fließend zu einem exakten 'X' morphen (`.hamburger.open`).
- **Overlay:** Vollflächiges Menü mit `backdrop-blur`, gestaffelt einblendenden Navigationslinks und direktem Notruf-CTA.
- **Scroll-Sperre:** Bei geöffnetem Menü wird `document.body.style.overflow = 'hidden'` gesetzt (nicht auf `html`).
- **Touchpad- & Touch-Sicherheit:** Alle Buttons erhalten `max-width: 100%; word-break: break-word;` und auf Mobilgeräten `width: 100%; white-space: normal;`.

---

## 6. Business Features Plan

- **Rechner-Typ (§ 6):** Interaktiver *Heizungs- & Klimatechnik-Rechner* (Eingabe: Wohnfläche in m², Gebäudezustand, gewünschte Technologie [Luft-Wasser-Wärmepumpe, Hybrid-Heizung, moderner Gasbrennwert, Klimatechnik] -> dynamische Ausgabe von Förderrichtwert, CO₂-Ersparnis und geschätztem Investitionsbereich).
- **WhatsApp Widget (§ 4):** Floating Button mit Link `https://wa.me/4984583465357?text=...`, pulsierender Animation und mobilem Fallback.
- **Multi-Step Formular (§ 5):** 3-stufiger Funnel (1. Anliegen, 2. Details & Dringlichkeit, 3. Kontaktdaten & DSGVO) mit Fortschrittsanzeige, Honeypot und Formspree-Endpoint.
- **Terminbuchung UI-Dummy (§ 11):** Ansprechende Kalender-Vorschau mit `<!-- SETUP: Cal.com / Calendly Embed -->` Kommentar.
- **DSGVO Consent Banner (§ 2):** Blockiert Google Maps iframe (`data-src`), speichert Auswahl in `localStorage`, Link für erneuten Aufruf im Footer (`cookieSettingsLink`).
- **Rechtstexte (§ 9 & 10):** Impressum und Datenschutzerklärung vollständig integriert mit echten Unternehmensdaten aus Ingolstadt.

---

## 7. Pre-Delivery Checkliste

* [ ] Favicon (Thermales Icon / Flamme & Schneeflocke SVG)
* [ ] Genau EIN Header (Unified Sticky Header)
* [ ] Hamburger: genau EIN Morphing-X Mechanismus
* [ ] Dark/Light Mode Toggle mit persistenter Speicherung
* [ ] Touchpad-Scroll mit passiven Listenern
* [ ] Kontrast- & Sichtbarkeitsprüfung aller Texte
* [ ] 3 Alleinstellungsmerkmale aktiv (Mouse Parallax, Char Reveal, Horizontal Scroll)
* [ ] Lenis + GSAP + SplitType CDN eingebunden
* [ ] Kinetic Typography auf Hero & Section Titles
* [ ] Bento-Grid & Double-Bezel auf allen Karten
* [ ] Aurora + Noise Texture im Hero
* [ ] Skip-to-Content Link als erstes Element nach `<body>`
* [ ] Alle `<img>` mit `alt`, `width` und `height`
* [ ] LCP-Bild mit `fetchpriority="high"`
* [ ] Alle Icon-Buttons mit `aria-label`
* [ ] FAQ: `aria-expanded`, `aria-controls` und Arrow-Key Navigation
* [ ] DSGVO Consent-Banner + Google Maps `data-src`
* [ ] WhatsApp-Widget mit Format `4984583465357`
* [ ] Multi-Step Formular mit 3 Schritten, Honeypot & Datenschutz-Checkbox
* [ ] Interaktiver Heizungs- & Klimatechnik-Rechner
* [ ] Erweitertes Schema.org JSON-LD (`HVACBusiness`, `OpeningHoursSpecification`, `FAQPage`)
* [ ] Impressum (§ 5 TMG) & Datenschutzerklärung (DSGVO Art. 13)
* [ ] 100% responsiv ohne horizontale Scrollbalken
* [ ] Keine halluzinierten Daten
