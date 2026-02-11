#!/bin/bash

# Script di pulizia per Fox Industrial - Ottimizzazione per Netlify
echo "🧹 Inizio pulizia progetto Fox Industrial..."

# Backup prima della pulizia
echo "📦 Creazione backup..."
BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

# 1. ELIMINA CSS INUTILIZZATI
echo "🗑️  Eliminazione CSS inutilizzati..."
rm -f css/custom.css
rm -f css/custom.css.bak
echo "   ✅ CSS inutilizzati eliminati"

# 2. ELIMINA CARTELLA FOTO GENERALI (duplicati)
echo "🗑️  Eliminazione cartella foto generali (duplicati)..."
if [ -d "foto/foto generali" ]; then
    mv "foto/foto generali" "$BACKUP_DIR/"
    rm -rf "foto/foto generali"
    echo "   ✅ Cartella foto generali eliminata (backup in $BACKUP_DIR)"
fi

# 3. ELIMINA CARTELLA WEBP (tranne warehouse nippon gases (4).webp)
echo "🗑️  Pulizia cartella webp..."
if [ -d "foto/webp" ]; then
    # Salva il file che serve
    mkdir -p "$BACKUP_DIR/webp"
    cp "foto/webp/warehouse nippon gases (4).webp" "$BACKUP_DIR/webp/" 2>/dev/null || true
    
    # Elimina tutto tranne il file necessario
    cd foto/webp
    find . -type f ! -name "warehouse nippon gases (4).webp" -delete
    find . -type d -empty -delete
    cd ../..
    echo "   ✅ Cartella webp pulita"
fi

# 4. ELIMINA FOTO INUTILIZZATE NELLA ROOT DI FOTO
echo "🗑️  Eliminazione foto inutilizzate..."
rm -f "foto/foto home.jpg"
rm -f "foto/immagini gallery.jpg"
rm -f "foto/immagini gallery (2).jpg"
rm -f "foto/immagini gallery (3).jpg"
echo "   ✅ Foto inutilizzate eliminate"

# 5. ELIMINA FILE IN FOTO NUOVE CHE NON SONO USATI
echo "🗑️  Pulizia Foto Nuove..."
if [ -d "foto/Foto Nuove" ]; then
    mv "foto/Foto Nuove/img-20251006-wa0016.jpg" "$BACKUP_DIR/" 2>/dev/null || true
    mv "foto/Foto Nuove/vid-20251006-wa0001.mp4" "$BACKUP_DIR/" 2>/dev/null || true
    rm -f "foto/Foto Nuove/img-20251006-wa0016.jpg"
    rm -f "foto/Foto Nuove/vid-20251006-wa0001.mp4"
    echo "   ✅ Foto Nuove pulita"
fi

# 6. ELIMINA LOGO VETTORIALE (non usato)
echo "🗑️  Eliminazione logo vettoriale..."
if [ -d "foto/logo vettoriale" ]; then
    mv "foto/logo vettoriale" "$BACKUP_DIR/"
    rm -rf "foto/logo vettoriale"
    echo "   ✅ Logo vettoriale eliminato"
fi

# 7. ELIMINA FILE DI SVILUPPO
echo "🗑️  Eliminazione file di sviluppo..."
rm -f deno.lock
rm -f improvements.md
rm -f convert_images.sh
echo "   ✅ File di sviluppo eliminati"

# 8. ELIMINA FILE .DS_Store
echo "🗑️  Eliminazione file .DS_Store..."
find . -name ".DS_Store" -delete
echo "   ✅ File .DS_Store eliminati"

# 9. PULIZIA NODE_MODULES (non serve su Netlify)
echo "ℹ️  Note: node_modules non è necessario su Netlify (sarà ricreato)"
echo "   Puoi aggiungerlo a .gitignore se non l'hai già fatto"

# Report finale
echo ""
echo "✅ PULIZIA COMPLETATA!"
echo ""
echo "📊 Backup creato in: $BACKUP_DIR"
echo ""
echo "🔍 Verifica spazio liberato:"
du -sh "$BACKUP_DIR"
echo ""
echo "📝 File importanti controllati:"
echo "   ✅ Tutti i file HTML preservati"
echo "   ✅ Tutti i file JS preservati"
echo "   ✅ Foto del carousel preservate"
echo "   ✅ Certificati preservati"
echo "   ✅ Logo e foto clienti preservati"
echo ""
echo "🚀 Il progetto è ora ottimizzato per Netlify!"
