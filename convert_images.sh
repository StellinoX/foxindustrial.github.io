#!/bin/bash
mkdir -p foto/webp
mkdir -p "foto/webp/foto clienti"

# Convert root images
for file in foto/*.jpg foto/*.png; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    name="${filename%.*}"
    echo "Converting $file..."
    npx -y cwebp-bin "$file" -o "foto/webp/$name.webp" -quiet
  fi
done

# Convert 'foto clienti' images
for file in "foto/foto clienti"/*.jpg "foto/foto clienti"/*.png; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    name="${filename%.*}"
    echo "Converting $file..."
    npx -y cwebp-bin "$file" -o "foto/webp/foto clienti/$name.webp" -quiet
  fi
done
