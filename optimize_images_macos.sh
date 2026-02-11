#!/bin/bash

# Script di ottimizzazione immagini con SIPS (nativo macOS)
echo "🖼️  Inizio ottimizzazione immagini con SIPS..."

# Backup
BACKUP_DIR="backup_images_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "📦 Creazione backup in $BACKUP_DIR..."

# Funzione per ottimizzare un'immagine con sips
optimize_image() {
    local file="$1"
    local quality="$2"
    local max_width="$3"
    
    if [ -f "$file" ]; then
        # Backup
        cp "$file" "$BACKUP_DIR/"
        
        # Get current width
        width=$(sips -g pixelWidth "$file" | grep pixelWidth | awk '{print $2}')
        
        # Resize se necessario
        if [ "$width" -gt "$max_width" ]; then
            sips -Z "$max_width" "$file" > /dev/null 2>&1
        fi
        
        # Comprimi
        sips -s format jpeg -s formatOptions "$quality" "$file" > /dev/null 2>&1
        
        echo "  ✅ Ottimizzato: $(basename "$file")"
    fi
}

# 1. OTTIMIZZA FOTO WAREHOUSE (le più pesanti)
echo ""
echo "🏭 Ottimizzazione foto warehouse..."
for img in foto/warehouse*.jpg; do
    [ -f "$img" ] && optimize_image "$img" 75 1920
done

# 2. OTTIMIZZA FOTO OFFICINE TECNOMEC
echo ""
echo "🏗️  Ottimizzazione foto officine tecnomec..."
for img in foto/officine*.jpg; do
    [ -f "$img" ] && optimize_image "$img" 75 1920
done

# 3. OTTIMIZZA FOTO NUOVE
echo ""
echo "📸 Ottimizzazione Foto Nuove..."
for img in "foto/Foto Nuove"/*.jpg; do
    [ -f "$img" ] && optimize_image "$img" 75 1920
done

# 4. OTTIMIZZA CERTIFICATI (più conservativi per leggibilità)
echo ""
echo "📜 Ottimizzazione certificati..."
for img in foto/wel*.jpg foto/iso9001.jpg; do
    [ -f "$img" ] && optimize_image "$img" 85 2400
done

# 5. OTTIMIZZA LOGO (PNG)
echo ""
echo "🦊 Ottimizzazione logo..."
if [ -f "foto/logo.png" ]; then
    cp "foto/logo.png" "$BACKUP_DIR/"
    sips -Z 200 "foto/logo.png" > /dev/null 2>&1
    echo "  ✅ Ottimizzato: logo.png"
fi

# Report finale
echo ""
echo "✅ OTTIMIZZAZIONE COMPLETATA!"
echo ""
echo "📊 Confronto dimensioni:"
echo "Prima (backup):"
du -sh "$BACKUP_DIR"
echo "Dopo:"
du -sh foto/

# Calcola risparmio
before=$(du -sk "$BACKUP_DIR" | awk '{print $1}')
after=$(du -sk foto/ | awk '{print $1}')
saved=$((before - after))
percent=$((saved * 100 / before))

echo ""
echo "💾 Spazio risparmiato: ~${percent}%"
echo "📁 Backup salvato in: $BACKUP_DIR"
echo ""
echo "🚀 Ora puoi fare il deploy su Netlify!"
