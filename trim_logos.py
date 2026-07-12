from PIL import Image
import os
import glob

def trim_transparency(img_path):
    img = Image.open(img_path).convert("RGBA")
    
    # Get bounding box of non-transparent pixels
    bbox = img.getbbox()
    if bbox:
        # Crop to the bounding box
        cropped = img.crop(bbox)
        # Save over original
        cropped.save(img_path)
        print(f"Trimmed {os.path.basename(img_path)}")
    else:
        print(f"Skipped {os.path.basename(img_path)} (empty or no transparency)")

files = glob.glob("/Users/alfi/Documents/fox/Fox-Industrial 2/foto/webp/*.webp")
for f in files:
    try:
        trim_transparency(f)
    except Exception as e:
        print(f"Error on {f}: {e}")
