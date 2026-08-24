# Übergabe- & Anpassungs-Anleitung – Heizung Mantsch Website
*V3.1 – MotionSites Edition*

Diese Anleitung erklärt Schritt für Schritt, wie die erstellte Website konfiguriert, mit Kundenzugängen verknüpft und auf Produktionsservern bereitgestellt wird.

---

## 1. Kontaktformular aktivieren (Formspree)
Im Formular in `index.html` (Zeile mit `action="https://formspree.io/f/YOUR_FORM_ID"`):
1. Kostenlosen Account auf [formspree.io](https://formspree.io) anlegen.
2. Neues Formular erstellen und die E-Mail-Adresse von Herrn Mantsch als Zieladresse angeben.
3. Den Platzhalter `YOUR_FORM_ID` in `index.html` durch die generierte ID ersetzen.
4. Nach dem Absenden einer Testanfrage die E-Mail-Verifizierung in Formspree bestätigen.

---

## 2. Eigene Fotos & Bildmaterial austauschen
Die generierten Beispielbilder in `assets/` können jederzeit durch echte Fotos aus dem Betrieb oder von Referenzobjekten ersetzt werden:
- `assets/hero_heating_system.jpg` → Hero-Bereich (Wärmepumpe / Heizanlage)
- `assets/emergency_service.jpg` → Service- & Reparatureinsatz
- `assets/smart_climate_interior.jpg` → Klimatechnik im Wohnbereich
- `assets/heatpump_climate.jpg` → Außenaufstellung Wärmepumpe

*Tipp:* Bilder vor dem Upload mit [squoosh.app](https://squoosh.app) oder `cwebp` komprimieren (WebP-Format, Qualität ~85%).

---

## 3. Online-Terminbuchung aktivieren (Cal.com / Calendly)
Der Bereich `#termin` enthält aktuell einen ansprechenden UI-Dummy. Um eine echte Kalenderbuchung freizuschalten:
1. Account bei [cal.com](https://cal.com) (kostenlos) oder [calendly.com](https://calendly.com) anlegen.
2. Ereignisart anlegen (z.B. „30 Min. Erstberatung Heizung & Klima“).
3. Den Kommentar im Abschnitt `#termin` in `index.html` entfernen und den iFrame-Code einfügen:
   ```html
   <iframe src="https://cal.com/heizung-mantsch/beratung?embed=true" width="100%" height="600" style="border:0; border-radius:1.5rem;"></iframe>
   ```

---

## 4. Farbanpassungen & Dark/Light Mode
- **Akzentfarben:** In `style.css` unter `:root` und `[data-theme="dark"]` können `--accent-orange` und `--accent-cyan` feingetunt werden.
- **Default-Theme:** In `app.js` (Zeile mit `localStorage.getItem('mantsch_theme') || 'dark'`) kann das Start-Design von `'dark'` auf `'light'` geändert werden.

---

## 5. Rechtliche Angaben & Impressum vervollständigen
Im Bereich `#impressum` in `index.html`:
- Sobald die Umsatzsteuer-Identifikationsnummer (USt-IdNr.) vorliegt, diese im vorbereiteten Block eintragen.
- Handwerkskammer-Mitgliedsnummer / Registernummer bei Bedarf ergänzen.

---

## 6. Hosting & Deployment (Vercel / Netlify)
Die Website besteht aus rein statischen Dateien (HTML, CSS, JS, Bilder) und kann ohne Build-Step auf jedem Webserver oder Edge-Network gehostet werden:
- **Vercel:** Projektordner auf GitHub pushen oder via `vercel deploy` im Terminal veröffentlichen.
- **Netlify:** Projektordner per Drag & Drop auf [app.netlify.com/drop](https://app.netlify.com/drop) ziehen.
- **Eigener Webspace / FTP:** Den gesamten Inhalt des Ordners `Projekte/heizung-mantsch/` ins `public_html` bzw. `www` Verzeichnis hochladen.

---

## 7. Performance-Optimierung für Produktion
- **Google Fonts:** Für 100% DSGVO-Sicherheit ohne Drittland-Transfer Schriften via [gwfh.mranftl.com](https://gwfh.mranftl.com/fonts) herunterladen und lokal in einem `fonts/` Ordner einbinden.
- **Tailwind CSS:** Bei Bedarf via npm (`npx tailwindcss -i ./style.css -o ./dist.css --minify`) kompilieren, um die Ladezeit um weitere 50ms zu verkürzen.
