const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const jpeg = require('jpeg-js');

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// 1. Helper to create Icon PNG
function createIconPng(size, isMaskable = false) {
  const png = new PNG({ width: size, height: size });
  const center = size / 2;
  const contentRadius = (size / 2) * (isMaskable ? 0.68 : 0.86);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (size * y + x) << 2;
      const nx = (x - center) / contentRadius;
      const ny = (y - center) / contentRadius;

      // Dark Navy Background #0B101D
      let r = 11, g = 16, b = 29, a = 255;

      const ax = Math.abs(nx);
      const ay = Math.abs(ny);

      // Rounded Badge Container
      let inBadge = false;
      if (ax <= 0.82 && ay <= 0.82) {
        const cornerR = 0.35;
        if (ax <= 0.82 - cornerR || ay <= 0.82 - cornerR) {
          inBadge = true;
        } else {
          const dx = ax - (0.82 - cornerR);
          const dy = ay - (0.82 - cornerR);
          if (dx * dx + dy * dy <= cornerR * cornerR) inBadge = true;
        }
      }

      if (inBadge) {
        // Gradient badge background (#0F172A to #1E293B)
        const t = (ny + 1) / 2;
        r = Math.round(15 + t * 15);
        g = Math.round(23 + t * 18);
        b = Math.round(42 + t * 30);

        // Financial Chart Bars
        // Bar 1 (Emerald #10B981)
        if (nx >= -0.52 && nx <= -0.22 && ny >= -0.12 && ny <= 0.48) {
          r = 16; g = 185; b = 129;
        }
        // Bar 2 (Sky Blue #0EA5E9)
        if (nx >= -0.14 && nx <= 0.14 && ny >= -0.38 && ny <= 0.48) {
          r = 14; g = 165; b = 233;
        }
        // Bar 3 (Indigo #6366F1)
        if (nx >= 0.22 && nx <= 0.52 && ny >= -0.64 && ny <= 0.48) {
          r = 99; g = 102; b = 241;
        }

        // Golden trend line / arrow across top (#F59E0B)
        const lineY = -0.62 * (nx + 0.36) - 0.02;
        if (Math.abs(ny - lineY) < 0.08 && nx >= -0.48 && nx <= 0.48) {
          r = 245; g = 158; b = 11;
        }
      }

      png.data[idx] = r;
      png.data[idx + 1] = g;
      png.data[idx + 2] = b;
      png.data[idx + 3] = a;
    }
  }

  return PNG.sync.write(png);
}

// 2. Helper to create Splash Screen PNG
function createSplashPng(width, height) {
  const png = new PNG({ width, height });
  const iconSize = Math.round(Math.min(width, height) * 0.32);
  const iconHalf = iconSize / 2;
  const centerX = width / 2;
  const centerY = height / 2;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) << 2;

      // Dark Navy Background #0B101D
      let r = 11, g = 16, b = 29, a = 255;

      const dx = x - centerX;
      const dy = y - centerY;

      if (Math.abs(dx) <= iconHalf && Math.abs(dy) <= iconHalf) {
        const nx = dx / iconHalf;
        const ny = dy / iconHalf;
        const ax = Math.abs(nx);
        const ay = Math.abs(ny);

        let inBadge = false;
        if (ax <= 0.82 && ay <= 0.82) {
          const cornerR = 0.35;
          if (ax <= 0.82 - cornerR || ay <= 0.82 - cornerR) {
            inBadge = true;
          } else {
            const cdx = ax - (0.82 - cornerR);
            const cdy = ay - (0.82 - cornerR);
            if (cdx * cdx + cdy * cdy <= cornerR * cornerR) inBadge = true;
          }
        }

        if (inBadge) {
          const t = (ny + 1) / 2;
          r = Math.round(15 + t * 15);
          g = Math.round(23 + t * 18);
          b = Math.round(42 + t * 30);

          if (nx >= -0.52 && nx <= -0.22 && ny >= -0.12 && ny <= 0.48) {
            r = 16; g = 185; b = 129;
          }
          if (nx >= -0.14 && nx <= 0.14 && ny >= -0.38 && ny <= 0.48) {
            r = 14; g = 165; b = 233;
          }
          if (nx >= 0.22 && nx <= 0.52 && ny >= -0.64 && ny <= 0.48) {
            r = 99; g = 102; b = 241;
          }

          const lineY = -0.62 * (nx + 0.36) - 0.02;
          if (Math.abs(ny - lineY) < 0.08 && nx >= -0.48 && nx <= 0.48) {
            r = 245; g = 158; b = 11;
          }
        }
      }

      png.data[idx] = r;
      png.data[idx + 1] = g;
      png.data[idx + 2] = b;
      png.data[idx + 3] = a;
    }
  }

  return PNG.sync.write(png);
}

// 3. Helper to create Splash Screen JPG
function createSplashJpg(width, height) {
  const frameData = Buffer.alloc(width * height * 4);
  const iconSize = Math.round(Math.min(width, height) * 0.32);
  const iconHalf = iconSize / 2;
  const centerX = width / 2;
  const centerY = height / 2;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) * 4;

      let r = 11, g = 16, b = 29, a = 255;

      const dx = x - centerX;
      const dy = y - centerY;

      if (Math.abs(dx) <= iconHalf && Math.abs(dy) <= iconHalf) {
        const nx = dx / iconHalf;
        const ny = dy / iconHalf;
        const ax = Math.abs(nx);
        const ay = Math.abs(ny);

        let inBadge = false;
        if (ax <= 0.82 && ay <= 0.82) {
          const cornerR = 0.35;
          if (ax <= 0.82 - cornerR || ay <= 0.82 - cornerR) {
            inBadge = true;
          } else {
            const cdx = ax - (0.82 - cornerR);
            const cdy = ay - (0.82 - cornerR);
            if (cdx * cdx + cdy * cdy <= cornerR * cornerR) inBadge = true;
          }
        }

        if (inBadge) {
          const t = (ny + 1) / 2;
          r = Math.round(15 + t * 15);
          g = Math.round(23 + t * 18);
          b = Math.round(42 + t * 30);

          if (nx >= -0.52 && nx <= -0.22 && ny >= -0.12 && ny <= 0.48) {
            r = 16; g = 185; b = 129;
          }
          if (nx >= -0.14 && nx <= 0.14 && ny >= -0.38 && ny <= 0.48) {
            r = 14; g = 165; b = 233;
          }
          if (nx >= 0.22 && nx <= 0.52 && ny >= -0.64 && ny <= 0.48) {
            r = 99; g = 102; b = 241;
          }

          const lineY = -0.62 * (nx + 0.36) - 0.02;
          if (Math.abs(ny - lineY) < 0.08 && nx >= -0.48 && nx <= 0.48) {
            r = 245; g = 158; b = 11;
          }
        }
      }

      frameData[idx] = r;
      frameData[idx + 1] = g;
      frameData[idx + 2] = b;
      frameData[idx + 3] = a;
    }
  }

  const raw = { data: frameData, width, height };
  return jpeg.encode(raw, 88).data;
}

// Write file to both root and public
function saveAsset(filename, buffer) {
  const rootPath = path.join(ROOT_DIR, filename);
  const publicPath = path.join(PUBLIC_DIR, filename);

  fs.writeFileSync(rootPath, buffer);
  fs.writeFileSync(publicPath, buffer);
  console.log(`Saved ${filename} (${buffer.length} bytes) to root & public/`);
}

console.log('Generating clean PWA assets...');

// Icons
const iconSizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'favicon-96x96.png', size: 96 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'apple-touch-icon-180x180.png', size: 180 },
  { name: 'apple-touch-icon-167x167.png', size: 167 },
  { name: 'apple-touch-icon-152x152.png', size: 152 },
  { name: 'icon-192x192.png', size: 192 },
  { name: 'web-app-manifest-192x192.png', size: 192 },
  { name: 'icon-512x512.png', size: 512 },
  { name: 'web-app-manifest-512x512.png', size: 512 },
  { name: 'maskable-icon-512x512.png', size: 512, maskable: true },
];

for (const item of iconSizes) {
  const buf = createIconPng(item.size, item.maskable);
  saveAsset(item.name, buf);
}

// Favicon SVG
const faviconSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="128" fill="#0b101d"/>
  <rect x="80" y="80" width="352" height="352" rx="64" fill="url(#bgGrad)"/>
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
  </defs>
  <rect x="130" y="220" width="60" height="150" rx="12" fill="#10b981"/>
  <rect x="226" y="150" width="60" height="220" rx="12" fill="#0ea5e9"/>
  <rect x="322" y="90" width="60" height="280" rx="12" fill="#6366f1"/>
  <path d="M 110 260 L 256 170 L 402 80" stroke="#f59e0b" stroke-width="24" stroke-linecap="round"/>
</svg>`;
saveAsset('favicon.svg', Buffer.from(faviconSvgContent, 'utf8'));

// Favicon ICO (PNG embedded ICO)
const ico32Buf = createIconPng(32);
const icoHeader = Buffer.alloc(22);
icoHeader.writeUInt16LE(0, 0);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(1, 4);
icoHeader.writeUInt8(32, 6);
icoHeader.writeUInt8(32, 7);
icoHeader.writeUInt8(0, 8);
icoHeader.writeUInt8(0, 9);
icoHeader.writeUInt16LE(1, 10);
icoHeader.writeUInt16LE(32, 12);
icoHeader.writeUInt32LE(ico32Buf.length, 14);
icoHeader.writeUInt32LE(22, 18);
saveAsset('favicon.ico', Buffer.concat([icoHeader, ico32Buf]));

// General Splash Screens
saveAsset('splash-portrait.png', createSplashPng(1170, 2532));
saveAsset('splash-landscape.png', createSplashPng(2532, 1170));
saveAsset('splash-portrait.jpg', createSplashJpg(1170, 2532));
saveAsset('splash-landscape.jpg', createSplashJpg(2532, 1170));

// Apple Splash Screens
const appleSplashes = [
  [1290, 2796], [2796, 1290],
  [1179, 2556], [2556, 1179],
  [1284, 2778], [2778, 1284],
  [1170, 2532], [2532, 1170],
  [1242, 2688], [2688, 1242],
  [828, 1792],  [1792, 828],
  [1125, 2436], [2436, 1125],
  [1242, 2208], [2208, 1242],
  [750, 1334],  [1334, 750],
  [2048, 2732], [2732, 2048],
  [1668, 2388], [2388, 1668],
  [1668, 2224], [2224, 1668],
  [1620, 2160], [2160, 1620],
  [1536, 2048], [2048, 1536]
];

for (const [w, h] of appleSplashes) {
  const filename = `apple-splash-${w}-${h}.png`;
  saveAsset(filename, createSplashPng(w, h));
}

console.log('All PWA assets successfully generated and saved!');
