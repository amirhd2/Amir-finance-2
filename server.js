import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

const rootPath = process.cwd();

// Explicit route for favicon and app icons with correct MIME types
app.get(['/favicon.ico', '/favicon.svg', '/favicon-16x16.png', '/favicon-32x32.png', '/favicon-48x48.png', '/favicon-96x96.png', '/apple-touch-icon.png', '/apple-touch-icon-precomposed.png', '/apple-touch-icon-180x180.png', '/apple-touch-icon-167x167.png', '/apple-touch-icon-152x152.png', '/icon-192x192.png', '/icon-512x512.png'], (req, res) => {
  let fileName = req.path.substring(1);
  if (fileName === 'apple-touch-icon-precomposed.png') {
    fileName = 'apple-touch-icon.png';
  }
  let mimeType = 'image/png';
  if (fileName.endsWith('.ico')) mimeType = 'image/x-icon';
  if (fileName.endsWith('.svg')) mimeType = 'image/svg+xml';
  
  res.setHeader('Content-Type', mimeType);
  res.setHeader('Cache-Control', 'public, max-age=86400');
  const filePath = path.join(rootPath, fileName);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.sendFile(path.join(rootPath, 'apple-touch-icon.png'));
  }
});
app.get(['/site.webmanifest', '/manifest.webmanifest'], (req, res) => {
  res.setHeader('Content-Type', 'application/manifest+json; charset=UTF-8');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  const reqFile = req.path.endsWith('manifest.webmanifest') ? 'manifest.webmanifest' : 'site.webmanifest';
  res.sendFile(path.join(rootPath, reqFile));
});

// Explicitly disable HTTP caching for version.json
app.get('/version.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=UTF-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.sendFile(path.join(rootPath, 'version.json'));
});

// Disable caching for service worker sw.js so updates are detected immediately
app.get('/sw.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
  res.setHeader('Service-Worker-Allowed', '/');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.sendFile(path.join(rootPath, 'sw.js'));
});

// Explicit route for app.compiled.js with correct MIME type
app.get('/app.compiled.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.sendFile(path.join(rootPath, 'app.compiled.js'));
});

// Disable caching for index.html / navigation so app reloads always receive fresh code
app.get(['/', '/index.html'], (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.sendFile(path.join(rootPath, 'index.html'));
});

// Static assets middleware - mount both public and root directories
app.use('/public', express.static(path.join(rootPath, 'public')));
app.use(express.static(path.join(rootPath, 'public')));
app.use(express.static(rootPath));

// Guard font requests so they are served with correct MIME type and caching
app.use((req, res, next) => {
  if (req.path.match(/\.(woff2|woff|ttf|otf|eot)$/i)) {
    const cleanPath = req.path.replace(/^\//, '');
    const possiblePaths = [
      path.join(rootPath, 'public', cleanPath),
      path.join(rootPath, cleanPath),
      path.join(rootPath, 'public', path.basename(req.path)),
      path.join(rootPath, path.basename(req.path)),
      path.join(rootPath, 'src/assets/fonts', path.basename(req.path)),
      path.join(rootPath, 'public/src/assets/fonts', path.basename(req.path)),
      path.join(rootPath, 'public/vendor/fonts', path.basename(req.path))
    ];

    let mimeType = 'font/ttf';
    if (req.path.endsWith('.woff2')) mimeType = 'font/woff2';
    else if (req.path.endsWith('.woff')) mimeType = 'font/woff';
    else if (req.path.endsWith('.otf')) mimeType = 'font/otf';
    else if (req.path.endsWith('.eot')) mimeType = 'application/vnd.ms-fontobject';

    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        res.setHeader('Content-Type', mimeType);
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        return res.sendFile(p);
      }
    }
  }
  next();
});

// Guard image requests so they never fall through to index.html
app.use((req, res, next) => {
  if (req.path.match(/\.(png|jpg|jpeg|svg|ico|webp|gif)$/i)) {
    const rawName = path.basename(req.path);
    const inPublic = path.join(rootPath, 'public', rawName);
    const inRoot = path.join(rootPath, rawName);
    const defaultIcon = path.join(rootPath, 'apple-touch-icon.png');
    
    let mimeType = 'image/png';
    if (rawName.endsWith('.ico')) mimeType = 'image/x-icon';
    if (rawName.endsWith('.svg')) mimeType = 'image/svg+xml';
    if (rawName.endsWith('.jpg') || rawName.endsWith('.jpeg')) mimeType = 'image/jpeg';
    if (rawName.endsWith('.webp')) mimeType = 'image/webp';
    
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    
    if (fs.existsSync(inPublic)) {
      return res.sendFile(inPublic);
    } else if (fs.existsSync(inRoot)) {
      return res.sendFile(inRoot);
    } else if (fs.existsSync(defaultIcon)) {
      return res.sendFile(defaultIcon);
    }
  }
  next();
});

app.get('*', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.sendFile(path.join(rootPath, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});


