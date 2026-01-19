# Feedback & Beratung für Build & Consult Website

## 1. Feedback: Perspektivwechsel als Laie/Privater Bauherr

### Erste Eindrücke

**Positiv:**
- ✅ Die Website wirkt professionell und seriös
- ✅ Das Design ist hochwertig und strahlt Kompetenz aus
- ✅ Die Farbgebung (Dunkelblau/Gold) vermittelt Vertrauen und Exklusivität
- ✅ Der USP "Interim-Projektleitung" ist jetzt deutlich sichtbar (Banner auf Startseite + besondere Hervorhebung bei Dienstleistungen)
- ✅ Die grössere Schrift ist für die Zielgruppe 50+ sehr gut lesbar

**Verbesserungspotenzial aus Laien-Perspektive:**

### Was mir fehlt bzw. unklar ist:

1. **Konkrete Beispiele/Referenzen**
   - Als privater Bauherr möchte ich sehen: "Haben die schon Projekte wie meins gemacht?"
   - **Empfehlung:** Einen Bereich "Referenzen" oder "Projekte" hinzufügen mit:
     - 2-3 Beispielprojekte (anonymisiert, wenn nötig)
     - Projektart (z.B. "Einfamilienhaus", "Mehrfamilienhaus", "Umbau")
     - Kurzbeschreibung der Herausforderung und Lösung

2. **Preistransparenz / Kostenrahmen**
   - Was kostet mich das ungefähr? Stundenhonorar? Pauschalpreis?
   - **Empfehlung:** Einen Abschnitt "Investition" oder FAQ mit:
     - "Wie werden die Leistungen abgerechnet?"
     - "Was kostet eine Erstberatung?"
     - "Lohnt sich das auch für kleinere Projekte?"

3. **Verständlichkeit der Dienstleistungen**
   - Die Begriffe "Bauherrenvertretung", "Projektsteuerung" klingen für Laien ähnlich
   - **Empfehlung:** In den Texten (die noch eingefügt werden) konkrete Beispiele nennen:
     - "Bauherrenvertretung = Ich handle für Sie mit Architekten und Handwerkern"
     - "Projektsteuerung = Ich sorge dafür, dass Budget und Termine eingehalten werden"

4. **Emotionale Ansprache**
   - Die Seite ist sehr "business-like" - für private Bauherren könnte es persönlicher sein
   - **Empfehlung:**
     - Testimonials von zufriedenen Kunden
     - Ein persönliches Wort/Video der Geschäftsführung
     - Mehr "Sie"-Ansprache: "Ihr Projekt", "Ihre Vision"

5. **Call-to-Action unklar**
   - Was ist mein nächster Schritt? Anruf? E-Mail? Erstgespräch?
   - **Empfehlung:** Deutlicher Button "Kostenloses Erstgespräch vereinbaren" oder "Jetzt beraten lassen"

6. **Mobile Ansicht prüfen**
   - Wichtig: Viele Kunden schauen sich die Seite auf dem Handy an
   - Bitte testen, ob alle Elemente (insbesondere der USP-Banner) auf Mobilgeräten gut aussehen

### Zusammenfassung: Fühle ich mich angesprochen?

**Aktuell:** Die Website spricht eher institutionelle Investoren und Unternehmen an. Das ist professionell, aber für private Bauherren könnte es "zu gross" wirken.

**Verbesserungsvorschlag:** Einen separaten Bereich "Für private Bauherren" schaffen oder auf der Startseite deutlicher machen: "Wir begleiten auch Ihr privates Bauvorhaben - vom Einfamilienhaus bis zum Umbau."

---

## 2. Beratung: Setup (Hosting vs. Mail vs. Cloud)

### Aktuelle Situation

Sie haben eine statische Website (React/Vite), die auf GitHub Pages gehostet wird, und möchten:
- E-Mail-Adressen (z.B. info@build-consult.ch)
- Cloud-Speicher für Zusammenarbeit (OneDrive wird erwähnt)

### Setup-Erklärung

Grundsätzlich gibt es **3 separate Komponenten**:

#### 1. **Domain** (build-consult.ch)
- Ist bereits registriert
- Wird über einen Domain-Provider verwaltet
- **Funktion:** Ihre Internet-Adresse

#### 2. **Website-Hosting** (aktuell: GitHub Pages)
- Hier liegt Ihre Website
- **Aktuell:** GitHub Pages (kostenlos, gut für statische Seiten)
- **Funktion:** Macht Ihre Website im Internet sichtbar

#### 3. **E-Mail + Cloud** (noch einzurichten)
- **Zwei Optionen:**

  **Option A: Alles bei Microsoft 365**
  - Microsoft 365 Business Basic: ca. CHF 5-7 pro Nutzer/Monat
  - **Enthalten:**
    - Professionelle E-Mail (info@build-consult.ch, kontakt@build-consult.ch, etc.)
    - 1 TB OneDrive-Speicher pro Nutzer
    - Teams, Word, Excel, PowerPoint (Web-Versionen)
    - Kalender, Kontakte, Aufgaben

  **Option B: Getrennte Lösung**
  - E-Mail über separaten Provider (z.B. Hostpoint, Infomaniak): CHF 2-5/Monat
  - OneDrive separat kaufen: Komplizierter, nicht empfohlen

### Empfehlung

**✅ Microsoft 365 Business Basic**

**Warum?**
1. **Alles aus einer Hand:** E-Mail + OneDrive + Office-Apps
2. **Professionell:** Kein Webmail-Provider, sondern Business-Lösung
3. **Skalierbar:** Einfach weitere Nutzer hinzufügen
4. **Zuverlässig:** 99.9% Verfügbarkeit, Backup inklusive
5. **Preis-Leistung:** Für CHF 5-7/Monat alles dabei

**Setup-Prozess:**
1. Domain (build-consult.ch) mit Microsoft 365 verbinden
2. DNS-Einträge beim Domain-Provider anpassen (MX-Records)
3. E-Mail-Adressen einrichten (info@, kontakt@, etc.)
4. OneDrive für Teamzusammenarbeit nutzen

**Wichtig:** Domain/Website-Hosting bleibt bei GitHub Pages - Microsoft 365 übernimmt NUR E-Mail + Cloud!

### Alternative: Domain + E-Mail bei Schweizer Provider

Falls Sie einen "Swiss Made"-Ansatz bevorzugen:

**Infomaniak (Schweizer Anbieter)**
- E-Mail Hosting: CHF 6.90/Monat (5 Adressen inklusive)
- kDrive (Cloud-Speicher): CHF 5.99/Monat (2 TB)
- **Vorteil:** Daten in der Schweiz, DSGVO-konform
- **Nachteil:** Keine Office-Apps, kein OneDrive

### Zusammenfassung

```
┌─────────────────────────────────────────┐
│ Domain: build-consult.ch                │
│ Provider: Ihr aktueller Registrar       │
└─────────────────────────────────────────┘
              │
              ├─► Website (GitHub Pages)
              │   ↳ Kostenlos, bleibt so
              │
              └─► E-Mail + Cloud (Microsoft 365)
                  ↳ CHF 5-7/Monat pro Nutzer
                  ↳ info@build-consult.ch
                  ↳ OneDrive für Zusammenarbeit
```

### Nächste Schritte

1. **Microsoft 365 Business Basic** Account erstellen
2. Domain build-consult.ch mit M365 verbinden
3. DNS-Einträge anpassen (Support hilft dabei)
4. E-Mail-Adressen einrichten
5. OneDrive für Team freigeben

**Geschätzte Setup-Zeit:** 2-3 Stunden (mit Support-Hilfe)

---

## 3. Technische To-Dos für die Website

### Vor dem Go-Live noch ergänzen:

- [ ] Alle Platzhalter-Texte durch finale Inhalte ersetzen
- [ ] Adresse und Telefonnummer in Zürich eintragen
- [ ] Foto des Geschäftspartners einbinden (aktuell Platzhalter)
- [ ] Impressum und Datenschutzerklärung erstellen und verlinken
- [ ] Cookie-Banner hinzufügen (DSGVO)
- [ ] Favicon erstellen und einbinden
- [ ] Open Graph Tags für Social Media
- [ ] Google Analytics / Matomo einrichten (optional)
- [ ] Mobile Ansicht testen und optimieren
- [ ] Kontaktformular funktionsfähig machen (aktuell nur Design)

### SEO-Optimierung:

- [ ] Meta-Descriptions für alle Seiten
- [ ] Alt-Tags für alle Bilder
- [ ] Strukturierte Daten (Schema.org) für Kontaktdaten
- [ ] Sitemap erstellen
- [ ] robots.txt anpassen

---

**Erstellt:** 2026-01-19
**Status:** Alle technischen Anpassungen umgesetzt, Texte als Platzhalter vorbereitet
