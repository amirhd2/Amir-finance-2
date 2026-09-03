import fs from 'fs';
import path from 'path';
import Babel from '@babel/standalone';

function updateVersionTags() {
  const versionPath = path.join(process.cwd(), 'version.json');
  const indexHtmlPath = path.join(process.cwd(), 'index.html');
  const swPath = path.join(process.cwd(), 'sw.js');
  const appJsxPath = path.join(process.cwd(), 'src', 'App.jsx');
  const gdriveJsPath = path.join(process.cwd(), 'gdrive.js');

  if (fs.existsSync(versionPath)) {
    try {
      const vData = JSON.parse(fs.readFileSync(versionPath, 'utf8'));
      const versionTag = `${vData.installedVersion || '3.3.0'}-b${vData.buildNumber || 490}`;

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

      if (fs.existsSync(gdriveJsPath)) {
        let gdrive = fs.readFileSync(gdriveJsPath, 'utf8');
        gdrive = gdrive.replace(/version:\s*['"][^'"]*['"]/, `version: "${vData.installedVersion || '3.3.0'}"`);
        fs.writeFileSync(gdriveJsPath, gdrive, 'utf8');
        console.log(`[compile-app] Updated gdrive.js version to ${vData.installedVersion || '3.3.0'}`);
      }

      if (fs.existsSync(appJsxPath)) {
        let jsx = fs.readFileSync(appJsxPath, 'utf8');
        jsx = jsx.replace(/const EMBEDDED_BUILD = \d+;/, `const EMBEDDED_BUILD = ${vData.buildNumber || 490};`);
        jsx = jsx.replace(/const EMBEDDED_VERSION = ['"][^'"]*['"];/, `const EMBEDDED_VERSION = "${vData.installedVersion || '3.3.0'}";`);
        
        // Update defaultVersionData installedVersion and buildNumber inside App.jsx
        jsx = jsx.replace(/"installedVersion":\s*['"][^'"]*['"]/, `"installedVersion": "${vData.installedVersion || '3.3.0'}"`);
        jsx = jsx.replace(/"buildNumber":\s*\d+/, `"buildNumber": ${vData.buildNumber || 490}`);
        jsx = jsx.replace(/"latestVersion":\s*['"][^'"]*['"]/, `"latestVersion": "${vData.installedVersion || '3.3.0'}"`);
        jsx = jsx.replace(/"latestBuild":\s*\d+/, `"latestBuild": ${vData.buildNumber || 490}`);
        
        fs.writeFileSync(appJsxPath, jsx, 'utf8');
        console.log(`[compile-app] Synchronized App.jsx constants with version ${vData.installedVersion} (Build ${vData.buildNumber})`);
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
    'app.compiled.js', 'gdrive.js'
  ];

  for (const file of filesToCopy) {
    const src = path.join(process.cwd(), file);
    const dest = path.join(publicDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  }

  // Copy all apple-splash PNGs
  const rootFiles = fs.readdirSync(process.cwd());
  for (const f of rootFiles) {
    if (f.startsWith('apple-splash-') && f.endsWith('.png')) {
      const src = path.join(process.cwd(), f);
      const dest = path.join(publicDir, f);
      fs.copyFileSync(src, dest);
    }
  }

  // Copy vendor folder recursively if exists
  const vendorSrc = path.join(process.cwd(), 'vendor');
  const vendorDest = path.join(publicDir, 'vendor');
  if (fs.existsSync(vendorSrc)) {
    fs.cpSync(vendorSrc, vendorDest, { recursive: true });
  }

  // Copy mockups folder if exists
  const mockupsSrc = path.join(process.cwd(), 'src', 'assets', 'images');
  if (fs.existsSync(mockupsSrc)) {
    const mockupsDest = path.join(publicDir, 'mockups');
    fs.mkdirSync(mockupsDest, { recursive: true });
    for (const item of ['option1.jpg', 'option2.jpg', 'option3.jpg']) {
      const s = path.join(mockupsSrc, item);
      if (fs.existsSync(s)) {
        fs.copyFileSync(s, path.join(mockupsDest, item));
      }
    }
  }

  // Copy src/assets folder recursively if exists
  const srcAssets = path.join(process.cwd(), 'src', 'assets');
  if (fs.existsSync(srcAssets)) {
    fs.cpSync(srcAssets, path.join(publicDir, 'src', 'assets'), { recursive: true });
    fs.cpSync(srcAssets, path.join(publicDir, 'assets'), { recursive: true });
    const fontsSrc = path.join(srcAssets, 'fonts');
    if (fs.existsSync(fontsSrc)) {
      fs.cpSync(fontsSrc, path.join(publicDir, 'fonts'), { recursive: true });
    }
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
