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

app.use(express.static(rootPath));

app.get('*', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.sendFile(path.join(rootPath, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});


