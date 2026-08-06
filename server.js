import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

const rootPath = process.cwd();

// Explicitly serve site.webmanifest and manifest.webmanifest with manifest JSON content type
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


