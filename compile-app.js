import fs from 'fs';
import path from 'path';
import Babel from '@babel/standalone';

function updateVersionTags() {
  const versionPath = path.join(process.cwd(), 'version.json');
  const indexHtmlPath = path.join(process.cwd(), 'index.html');
  const swPath = path.join(process.cwd(), 'sw.js');

  if (fs.existsSync(versionPath)) {
    try {
      const vData = JSON.parse(fs.readFileSync(versionPath, 'utf8'));
      const versionTag = `${vData.installedVersion || '2.1.3'}-b${vData.buildNumber || 204}`;

      if (fs.existsSync(indexHtmlPath)) {
        let html = fs.readFileSync(indexHtmlPath, 'utf8');
        html = html.replace(/app\.compiled\.js\?v=[^"']*/g, `app.compiled.js?v=${versionTag}`);
        fs.writeFileSync(indexHtmlPath, html, 'utf8');
        console.log(`[compile-app] Updated index.html script tag to app.compiled.js?v=${versionTag}`);
      }

      if (fs.existsSync(swPath)) {
        let sw = fs.readFileSync(swPath, 'utf8');
        sw = sw.replace(/const CACHE_NAME = ['"][^'"]*['"];/, `const CACHE_NAME = 'amir-finance-v${versionTag}';`);
        fs.writeFileSync(swPath, sw, 'utf8');
        console.log(`[compile-app] Updated sw.js CACHE_NAME to amir-finance-v${versionTag}`);
      }
    } catch (e) {
      console.warn('[compile-app] Warning updating version tags:', e);
    }
  }
}

function syncPublicFiles() {
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
    'splash-portrait.jpg', 'splash-landscape.jpg',
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
}

function compileApp() {
  console.log('[compile-app] Checking source JSX file...');
  updateVersionTags();

  let jsxCode = '';
  const appJsxPath = path.join(process.cwd(), 'src', 'App.jsx');
  const indexHtmlPath = path.join(process.cwd(), 'index.html');

  if (fs.existsSync(appJsxPath)) {
    console.log('[compile-app] Reading JSX from src/App.jsx...');
    jsxCode = fs.readFileSync(appJsxPath, 'utf8');
  } else if (fs.existsSync(indexHtmlPath)) {
    console.log('[compile-app] Reading JSX from index.html script tag...');
    const html = fs.readFileSync(indexHtmlPath, 'utf8');
    const match = html.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);
    if (match) {
      jsxCode = match[1];
    }
  }

  if (!jsxCode) {
    console.error('[compile-app] No JSX code found to compile!');
    process.exit(1);
  }

  console.log(`[compile-app] Found JSX code (${(jsxCode.length / 1024).toFixed(1)} KB). Compiling with Babel...`);

  try {
    const output = Babel.transform(jsxCode, {
      presets: ['react'],
      compact: false
    });

    const compiledJs = output.code;
    const compiledPath = path.join(process.cwd(), 'app.compiled.js');

    fs.writeFileSync(compiledPath, compiledJs, 'utf8');

    // Sync all static files to public/
    syncPublicFiles();

    console.log(`[compile-app] Successfully pre-compiled React components into app.compiled.js (${(compiledJs.length / 1024).toFixed(1)} KB) and synced to public/!`);
  } catch (err) {
    console.error('[compile-app] Error compiling JSX with Babel:', err);
    process.exit(1);
  }
}

compileApp();
