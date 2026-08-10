import zlib, struct, math, imghdr, os

def draw_splash(width, height, is_portrait=True):
    # Buffer: RGBA
    buf = bytearray(width * height * 4)
    cx, cy = width // 2, (height // 2) - int(height * 0.04)
    card_size = min(width, height) // 3.2
    
    # Background color: #0b101d
    bg_r, bg_g, bg_b = 11, 16, 29
    
    for y in range(height):
        row_offset = y * width * 4
        for x in range(width):
            dx = x - cx
            dy = y - cy
            
            # Base background
            r, g, b, a = bg_r, bg_g, bg_b, 255
            
            # Radial background glow around center emblem
            dist_center = math.sqrt(dx*dx + dy*dy)
            glow_radius = min(width, height) * 0.7
            if dist_center < glow_radius:
                glow_factor = (1.0 - (dist_center / glow_radius)) ** 2
                r = int(r + 20 * glow_factor)
                g = int(g + 30 * glow_factor)
                b = int(b + 70 * glow_factor)
            
            # Rounded Rect Icon Card in Center (size = card_size)
            half_w = card_size / 2.0
            half_h = card_size / 2.0
            corner_r = card_size * 0.28
            
            # Check distance to rounded rect
            ax = abs(dx)
            ay = abs(dy)
            
            in_card = False
            if ax <= half_w - corner_r and ay <= half_h:
                in_card = True
            elif ax <= half_w and ay <= half_h - corner_r:
                in_card = True
            else:
                cdx = ax - (half_w - corner_r)
                cdy = ay - (half_h - corner_r)
                if cdx > 0 and cdy > 0 and (cdx*cdx + cdy*cdy <= corner_r*corner_r):
                    in_card = True
                    
            if in_card:
                # Indigo to Violet Gradient inside emblem
                t_grad = (dy + half_h) / (2.0 * half_h)
                r = int(79 * (1 - t_grad) + 124 * t_grad)   # #4f46e5 to #7c3aed
                g = int(70 * (1 - t_grad) + 58 * t_grad)
                b = int(229 * (1 - t_grad) + 237 * t_grad)
                
                # Draw "A" / Diamond / Wallet emblem in center of card
                # Elegant "A" & Trend Line inside emblem
                emblem_scale = card_size * 0.35
                
                # Diamond emblem
                d_dist = abs(dx) + abs(dy)
                if d_dist < emblem_scale and d_dist > emblem_scale * 0.65:
                    r, g, b = 255, 255, 255
                elif abs(dx) < emblem_scale * 0.4 and abs(dy) < emblem_scale * 0.12:
                    r, g, b = 255, 255, 255
                elif abs(dx - dy * 0.3) < emblem_scale * 0.12 and abs(dy) < emblem_scale * 0.45:
                    r, g, b = 255, 255, 255

            # Set pixel
            px_idx = row_offset + (x * 4)
            buf[px_idx] = min(255, max(0, r))
            buf[px_idx + 1] = min(255, max(0, g))
            buf[px_idx + 2] = min(255, max(0, b))
            buf[px_idx + 3] = 255

    # Encode RGBA buffer to PNG
    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0) # Filter 0
        raw_data.extend(buf[y * width * 4 : (y + 1) * width * 4])
        
    compressed = zlib.compress(bytes(raw_data), 6)
    
    def chunk(tag, data):
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)
        
    header = b'\x89PNG\r\n\x1a\n'
    ihdr = chunk(b'IHDR', struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0))
    idat = chunk(b'IDAT', compressed)
    iend = chunk(b'IEND', b'')
    
    return header + ihdr + idat + iend

print("Generating portrait splash screen...")
portrait_png = draw_splash(750, 1334, is_portrait=True)
with open('splash-portrait.png', 'wb') as f:
    f.write(portrait_png)
with open('public/splash-portrait.png', 'wb') as f:
    f.write(portrait_png)

print("Generating landscape splash screen...")
landscape_png = draw_splash(1334, 750, is_portrait=False)
with open('splash-landscape.png', 'wb') as f:
    f.write(landscape_png)
with open('public/splash-landscape.png', 'wb') as f:
    f.write(landscape_png)

# Copy to all apple-splash-*.png as well
for fname in os.listdir('.'):
    if fname.startswith('apple-splash-') and fname.endswith('.png'):
        with open(fname, 'wb') as f:
            f.write(portrait_png)
        if os.path.exists('public'):
            with open(os.path.join('public', fname), 'wb') as f:
                f.write(portrait_png)

# Create icons
icon_192 = draw_splash(192, 192, is_portrait=True)
icon_512 = draw_splash(512, 512, is_portrait=True)

for name, data in [
    ('icon-192x192.png', icon_192),
    ('icon-512x512.png', icon_512),
    ('apple-touch-icon.png', icon_192),
    ('apple-touch-icon-180x180.png', icon_192),
    ('favicon-32x32.png', draw_splash(32, 32)),
    ('favicon-16x16.png', draw_splash(16, 16)),
]:
    with open(name, 'wb') as f:
        f.write(data)
    with open(os.path.join('public', name), 'wb') as f:
        f.write(data)

print("All PNG files regenerated with 100% valid PNG headers!")
