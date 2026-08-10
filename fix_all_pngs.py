import os, imghdr

icon_192 = open('icon-192x192.png', 'rb').read()
icon_512 = open('icon-512x512.png', 'rb').read()

for folder in ['.', 'public']:
    if not os.path.exists(folder):
        continue
    for fname in os.listdir(folder):
        if fname.endswith('.png'):
            fpath = os.path.join(folder, fname)
            if imghdr.what(fpath) != 'png':
                with open(fpath, 'wb') as f:
                    if '512' in fname:
                        f.write(icon_512)
                    else:
                        f.write(icon_192)
                print(f"Fixed {fpath}")

