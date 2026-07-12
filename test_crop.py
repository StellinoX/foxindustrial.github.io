from PIL import Image, ImageChops
import os

img_path = "/Users/alfi/Documents/fox/Fox-Industrial 2/foto/webp/mati group.webp"
img = Image.open(img_path).convert("RGB")
bg = Image.new("RGB", img.size, (255, 255, 255))
diff = ImageChops.difference(img, bg)
bbox = diff.getbbox()
print(f"bbox for {os.path.basename(img_path)}: {bbox}")
if bbox:
    cropped = img.crop(bbox)
    cropped.save(img_path)
    print("Cropped successfully!")
