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



import admin from 'firebase-admin';

let isFirebaseAdminInitialized = false;
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    isFirebaseAdminInitialized = true;
    console.log("Firebase Admin initialized successfully.");
  } else {
    console.warn("FIREBASE_SERVICE_ACCOUNT_KEY is not set. Push notifications via backend will not work.");
  }
} catch (error) {
  console.error("Error initializing Firebase Admin:", error);
}

app.get('/api/send-reminders', async (req, res) => {
  if (!isFirebaseAdminInitialized) {
    return res.status(500).json({ error: "Firebase Admin is not configured. Please set FIREBASE_SERVICE_ACCOUNT_KEY in your env variables." });
  }

  try {
    const db = admin.firestore();
    const snapshot = await db.collection('fcm_reminders').get();
    
    if (snapshot.empty) {
      return res.json({ message: "No users configured for reminders." });
    }

    let messagesSent = 0;
    
    // Use native JS Intl for Persian date formatting
    const todayJalaliFormatter = new Intl.DateTimeFormat('en-US-u-ca-persian', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const todayParts = todayJalaliFormatter.formatToParts(new Date());
    let jYear, jMonth, jDay;
    todayParts.forEach(p => {
        if (p.type === 'year') jYear = p.value;
        if (p.type === 'month') jMonth = p.value;
        if (p.type === 'day') jDay = p.value;
    });
    const todayStr = `${jYear}/${jMonth}/${jDay}`; // Expected format: 1403/06/25

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const token = data.token;
      const reminders = data.reminders || [];
      
      const dueToday = reminders.filter(r => !r.isCompleted && r.nextDueDateStr === todayStr);
      
      if (dueToday.length > 0 && token) {
        const names = dueToday.map(r => r.name).join(' و ');
        const text = dueToday.length > 1 
          ? `امروز موعد پرداخت قسط وام‌های ${names} است.`
          : `امروز موعد پرداخت قسط وام ${names} است.`;
        
        try {
          await admin.messaging().send({
            token: token,
            notification: {
              title: "یادآوری اقساط وام",
              body: text
            }
          });
          messagesSent++;
        } catch (e) {
          console.error("Failed to send message to token", token, e);
        }
      }
    }
    
    res.json({ message: `Cron executed. Sent ${messagesSent} reminders for date ${todayStr}.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error executing reminders." });
  }
});
