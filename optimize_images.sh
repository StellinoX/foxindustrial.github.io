#!/bin/bash

# Script di ottimizzazione immagini per Fox Industrial
echo "🖼️  Inizio ottimizzazione immagini..."

# Controlla se ImageMagick è installato
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick non trovato. Installalo con:"
    echo "   brew install imagemagick"
    exit 1
fi

# Backup
BACKUP_DIR="backup_images_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "📦 Creazione backup in $BACKUP_DIR..."

# Funzione per ottimizzare un'immagine
optimize_image() {
    local file="$1"
    local quality="$2"
    local max_width="$3"
    
    if [ -f "$file" ]; then
        # Backup
        cp "$file" "$BACKUP_DIR/"
        
        # Ottimizza
        convert "$file" \
            -resize "${max_width}x${max_width}>" \
            -quality "$quality" \
            -strip \
            "$file"
        
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
    convert "foto/logo.png" \
        -strip \
        -resize "200x200>" \
        "foto/logo.png"
    echo "  ✅ Ottimizzato: logo.png"
fi

# Report finale
echo ""
echo "✅ OTTIMIZZAZIONE COMPLETATA!"
echo ""
echo "📊 Confronto dimensioni:"
echo "Prima:"
du -sh "$BACKUP_DIR"
echo "Dopo:"
du -sh foto/

echo ""
echo "💾 Backup salvato in: $BACKUP_DIR"
echo ""
echo "🚀 Ora puoi fare il deploy su Netlify!"
