import re

with open('compile-app.js', 'r', encoding='utf-8') as f:
    code = f.read()

target_sync = """function syncPublicFiles() {
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const filesToCopy = [
    'index.html', 'sw.js', 'version.json', 'manifest.webmanifest', 'site.webmanifest',
    'favicon.ico', 'favicon.svg', 'favicon-16x16.png', 'favicon-32x32.png',
    'favicon-48x48.png', 'favicon-96x96.png', 'apple-touch-icon.png',
    'apple-touch-icon-152x152.png', 'apple-touch-icon-167x167.png',
    'apple-touch-icon-180x180.png', 'icon-192x192.png', 'icon-512x512.png',
    'web-app-manifest-192x192.png', 'web-app-manifest-512x512.png',
    'maskable-icon-512x512.png', 'splash-portrait.png', 'splash-landscape.png',
    'app.compiled.js'
  ];
  for (const file of filesToCopy) {
    const src = path.join(process.cwd(), file);
    const dest = path.join(publicDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  }
  // Copy vendor folder recursively if exists
  const vendorSrc = path.join(process.cwd(), 'vendor');
  const vendorDest = path.join(publicDir, 'vendor');
  if (fs.existsSync(vendorSrc)) {
    fs.cpSync(vendorSrc, vendorDest, { recursive: true });
  }
}"""

replacement_sync = """function syncPublicFiles() {
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Copy all assets & icons
  const rootFiles = fs.readdirSync(process.cwd());
  for (const file of rootFiles) {
    if (file === 'node_modules' || file === 'public' || file === '.git' || file === 'src') continue;
    const src = path.join(process.cwd(), file);
    const stat = fs.statSync(src);
    if (stat.isFile()) {
      const dest = path.join(publicDir, file);
      fs.copyFileSync(src, dest);
    }
  }

  // Copy vendor folder recursively if exists
  const vendorSrc = path.join(process.cwd(), 'vendor');
  const vendorDest = path.join(publicDir, 'vendor');
  if (fs.existsSync(vendorSrc)) {
    fs.cpSync(vendorSrc, vendorDest, { recursive: true });
  }
}"""

code = code.replace(target_sync, replacement_sync)

with open('compile-app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("compile-app.js updated!")
