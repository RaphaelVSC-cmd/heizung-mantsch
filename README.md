# Heizung Mantsch – Offizielle Website (Modern UI Pro v3.1)

Hochmoderne, conversion-optimierte Webpräsenz für **Heizung Mantsch** (Heizungs- und Klimatechnikbetrieb in Ingolstadt).

---

## 🌟 Features & Highlights

- **Awwwards-Level Design:** Thermal Precision & Industrial Glass mit Double-Bezel Architektur, Thermal Aurora Gradients und subtiler Noise-Textur.
- **Lenis Smooth Scroll & GSAP:** Nahtlose Physik für Trackpad und Mausrad mit synchronisierter ScrollTrigger-Engine.
- **Unified Sticky Header:** Ein einzelner, kompakter Header mit integrierter Notdienst-Hotline-Zeile, die sich beim Scrollen zusammenfaltet.
- **3 Alleinstellungsmerkmale:**
  1. *Multi-Layer Mouse Parallax Showcase (§ 18)*
  2. *Character-by-Character Scroll Reveal (§ 17)*
  3. *Scroll-Driven Horizontal Service Showcase (§ 0A #7)*
- **Interaktiver Heizungs- & Klimatechnik-Rechner:** Dynamische Berechnung von KfW-Förderung (bis 70%), jährlicher Heizkostenersparnis (€) und CO₂-Reduktion.
- **Multi-Step Kontakt-Funnel:** 3-stufiges Formular mit Fortschrittsbalken, Honeypot-Spamschutz und DSGVO-Checkbox.
- **DSGVO- & Rechtskonformität:** Consent-Banner mit Google Maps Blockierung (`data-src`), vollständiges Impressum (§ 5 TMG) und Datenschutzerklärung (DSGVO Art. 13).
- **Dark/Light Mode:** Nahtloses Umschalten mit Speicherung im `localStorage`.
- **Barrierefreiheit (WCAG 2.1 AA):** Skip-to-Content Link, sichtbare `:focus-visible` Outlines, Tastaturnavigation im FAQ-Akkordeon (Arrow-Keys).

---

## 🚀 Lokale Vorschau starten

### Windows:
Doppelklick auf `start.bat` oder im Terminal:
```bash
.\start.bat
```

### macOS / Linux:
```bash
chmod +x start.sh
./start.sh
```

Die Website öffnet sich automatisch unter: `http://localhost:8090/`

---

## 📁 Projektstruktur

```
heizung-mantsch/
├── .agents/
│   └── QA-RESULTS.json       # Automatisierte Testergebnisse
├── assets/                   # Fotorealistische Branchenbilder
│   ├── hero_heating_system.jpg
│   ├── heatpump_climate.jpg
│   ├── emergency_service.jpg
│   └── smart_climate_interior.jpg
├── docs/
│   ├── ANLEITUNG.md          # Setup- & Kunden-Anleitung
│   ├── design-system.md      # Vollständige Design-Tokens & Blueprint
│   ├── prd.md                # Produktanforderungen & Zielgruppen
│   ├── retro.md              # Lessons Learned
│   └── review.md             # Qualitäts- & Compliance-Audit
├── app.js                    # Interaktive JS-Engine (Lenis, GSAP, Rechner, Funnel)
├── COMMIT_MESSAGE.txt        # Strukturierte Git-Commit Nachricht
├── index.html                # Semantische HTML5-Struktur
├── README.md                 # Projektdokumentation
├── start.bat                 # Windows Start-Skript
├── start.sh                  # Linux/Mac Start-Skript
├── style.css                 # Modern UI Pro CSS-Design-System
└── TODOS.md                  # Projekt-Checkliste
```
