# 🧹 Report Pulizia Progetto Fox Industrial

## ❌ FILE DA ELIMINARE (non usati)

### 📁 CSS inutilizzati
- `css/custom.css` - NON usato in nessun file HTML
- `css/custom.css.bak` - File di backup non necessario

### 📁 Foto duplicate/inutilizzate

#### Cartelle completamente inutilizzate:
- `foto/foto generali/` - 1.7MB - Foto duplicate (già presenti in foto/)
  - foto home.jpg (duplicato)
  - immagini gallery (2).jpg (duplicato)
  - immagini gallery (3).jpg (duplicato)
  - immagini gallery.jpg (duplicato)
  - warehouse nippon gases (4).jpg (duplicato)
  - warehouse nippon gases (6).jpg (duplicato)

- `foto/webp/` - 2.7MB - Cartella webp NON usata (solo 1 file usato)
  - Mantieni solo: `warehouse nippon gases (4).webp`
  - Elimina tutti gli altri file webp

#### File singoli inutilizzati:
- `foto/foto home.jpg` - NON usato (204KB)
- `foto/immagini gallery.jpg` - NON usato (244KB)
- `foto/immagini gallery (2).jpg` - NON usato (184KB)
- `foto/immagini gallery (3).jpg` - NON usato (164KB)
- `foto/foto nuove/img-20251006-wa0016.jpg` - NON usato nel carousel
- `foto/foto nuove/vid-20251006-wa0001.mp4` - Video NON usato (pesante!)

### 📁 Altri file
- `deno.lock` - File non necessario per il deployment
- `improvements.md` - File di sviluppo, non serve in produzione
- `convert_images.sh` - Script di sviluppo
- `foto/logo vettoriale/` - 1.3MB - File PDF non usato sul sito

## ⚠️ PROBLEMI CRITICI DA RISOLVERE

### 🔴 Case Sensitivity (IMPORTANTE per Netlify!)
Il codice JavaScript riferisce foto con maiuscole ma la cartella è minuscola:
- Codice usa: `./foto/Foto Nuove/IMG-20251006-WA0017.jpg`
- Cartella è: `foto/foto nuove/`

**QUESTO CAUSERÀ ERRORI SU NETLIFY!**

### Soluzioni:
1. Rinominare `foto/foto nuove` → `foto/Foto Nuove`
2. Oppure correggere il codice JavaScript

## 📊 RISPARMIO TOTALE STIMATO

- CSS: ~10KB
- Foto duplicate: ~4-5MB
- Cartella webp inutilizzata: ~2.5MB
- Video e file extra: ~3-4MB
- **TOTALE: ~10-12MB risparmiati**

## ✅ FILE DA MANTENERE

### JavaScript (tutti usati)
- ✅ js/app.js
- ✅ js/carousel.js
- ✅ js/form-handler.js
- ✅ js/i18n.js
- ✅ js/motion.js
- ✅ js/structured-data.js
- ✅ js/ui-enhancements.js
- ✅ js/min/* (tutti i minificati)

### Foto usate nel carousel
- ✅ officine tecnomec taranto (2024)1-6.jpg
- ✅ warehouse nippon gases (1,2,3,5,6).jpg
- ✅ foto/Foto Nuove/IMG-20251006-WA0017.jpg
- ✅ foto/Foto Nuove/Immagine WhatsApp 2025-09-23 ore 08.29.26_fdef9781.jpg
- ✅ foto/newfoto11022026/* (tutte le 13 foto .webp)

### Certificati
- ✅ iso9001.jpg
- ✅ wel 24-0703-c015-4099.jpg
- ✅ wel-24-0703-c015-4100.jpg
- ✅ wel-24-0703-c015-4101.jpg
- ✅ wel-24-0703-c015-4102.jpg

### Clienti
- ✅ foto/foto clienti/* (tutti usati)

## 🚀 AZIONI CONSIGLIATE

1. **PRIORITÀ ALTA**: Risolvere problema case-sensitivity
2. Eliminare cartella `foto/foto generali`
3. Eliminare cartella `foto/webp` (tranne 1 file)
4. Eliminare file CSS inutilizzati
5. Eliminare file di sviluppo (deno.lock, improvements.md, convert_images.sh)
6. Eliminare video in foto nuove
7. Eliminare cartella logo vettoriale

Vuoi che proceda con la pulizia automatica?
