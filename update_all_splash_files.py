import os, shutil, subprocess

# 1. Ensure splash-portrait.png and splash-landscape.png exist in root and public/
shutil.copy('splash-portrait.png', 'public/splash-portrait.png')
shutil.copy('splash-landscape.png', 'public/splash-landscape.png')

print("Copied splash-portrait.png and splash-landscape.png to public/")

# 2. Update all apple-splash-*.png files depending on aspect ratio
for folder in ['.', 'public']:
    if not os.path.exists(folder):
        continue
    for fname in os.listdir(folder):
        if fname.startswith('apple-splash-') and fname.endswith('.png'):
            parts = fname.replace('apple-splash-', '').replace('.png', '').split('-')
            if len(parts) == 2:
                try:
                    w, h = int(parts[0]), int(parts[1])
                    dest_path = os.path.join(folder, fname)
                    if w > h:
                        # Landscape
                        shutil.copy('splash-landscape.png', dest_path)
                    else:
                        # Portrait
                        shutil.copy('splash-portrait.png', dest_path)
                except Exception as e:
                    print(f"Error copying for {fname}: {e}")

print("All apple-splash files updated!")

