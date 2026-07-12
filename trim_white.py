from PIL import Image, ImageChops
import os
import glob

def trim_white_and_transparency(img_path):
    try:
        img = Image.open(img_path).convert("RGBA")
        
        # Create a solid white background image of the same size
        bg = Image.new("RGBA", img.size, (255, 255, 255, 255))
        
        # Paste the image on the white background (flatten transparency to white)
        flattened = Image.alpha_composite(bg, img)
        
        # Get difference between flattened image and pure white
        diff = ImageChops.difference(flattened, bg)
        
        # Get bounding box of the non-white regions
        bbox = diff.getbbox()
        
        if bbox:
            # Add a small padding (e.g. 5 pixels)
            pad = 5
            left = max(0, bbox[0] - pad)
            upper = max(0, bbox[1] - pad)
            right = min(img.width, bbox[2] + pad)
            lower = min(img.height, bbox[3] + pad)
            
            # Crop the original image (preserving original transparency inside the box)
            cropped = img.crop((left, upper, right, lower))
            cropped.save(img_path)
            print(f"Trimmed {os.path.basename(img_path)}")
        else:
            print(f"Skipped {os.path.basename(img_path)} (fully white or empty)")
    except Exception as e:
        print(f"Error processing {img_path}: {e}")

files = glob.glob("/Users/alfi/Documents/fox/Fox-Industrial 2/foto/webp/*.webp")
for f in files:
    trim_white_and_transparency(f)
