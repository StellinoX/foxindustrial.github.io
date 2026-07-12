from PIL import Image, ImageChops
import os
import glob

def trim_white(img_path):
    try:
        img = Image.open(img_path).convert("RGB")
        bg = Image.new("RGB", img.size, (255, 255, 255))
        diff = ImageChops.difference(img, bg)
        bbox = diff.getbbox()
        
        if bbox:
            # Check if bbox is actually smaller than the original image
            if bbox[0] > 0 or bbox[1] > 0 or bbox[2] < img.width or bbox[3] < img.height:
                pad = 5
                left = max(0, bbox[0] - pad)
                upper = max(0, bbox[1] - pad)
                right = min(img.width, bbox[2] + pad)
                lower = min(img.height, bbox[3] + pad)
                
                # We crop the original RGBA image to preserve any transparency inside
                orig_img = Image.open(img_path)
                cropped = orig_img.crop((left, upper, right, lower))
                cropped.save(img_path)
                print(f"Trimmed {os.path.basename(img_path)}")
            else:
                print(f"Already tight {os.path.basename(img_path)}")
        else:
            print(f"Skipped {os.path.basename(img_path)} (fully white or empty)")
    except Exception as e:
        print(f"Error processing {img_path}: {e}")

files = glob.glob("/Users/alfi/Documents/fox/Fox-Industrial 2/foto/webp/*.webp")
for f in files:
    trim_white(f)
