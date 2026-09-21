import express from 'express';
import path from 'path';
import fs from 'fs';
import cron from 'node-cron';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getMessaging } from 'firebase-admin/messaging';

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';
const rootPath = process.cwd();

// Firestore Named Database ID for this project
const FIRESTORE_DB_ID = 'ai-studio-newfinanceapp-374c3a0a-cf0b-49f8-895c-4c25e6036db1';

// Firebase Admin Initialization
let firebaseAdminApp = null;
let firestoreDb = null;
let firebaseMessaging = null;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    firebaseAdminApp = getApps().length > 0
      ? getApps()[0]
      : initializeApp({ credential: cert(serviceAccount) });
    firestoreDb = getFirestore(firebaseAdminApp, FIRESTORE_DB_ID);
    firebaseMessaging = getMessaging(firebaseAdminApp);
    console.log(`Firebase Admin initialized successfully with database: ${FIRESTORE_DB_ID}`);
  } else {
    console.warn("FIREBASE_SERVICE_ACCOUNT_KEY is not set. Push notifications via backend will not work.");
  }
} catch (error) {
  console.error("Error initializing Firebase Admin:", error);
}

// Helper to get today's Jalali date in Asia/Tehran timezone
function getTehranJalaliDate() {
  const todayJalaliFormatter = new Intl.DateTimeFormat('en-US-u-ca-persian', {
    timeZone: 'Asia/Tehran',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const todayParts = todayJalaliFormatter.formatToParts(new Date());
  let jYear = '1405', jMonth = '01', jDay = '01';
  todayParts.forEach(p => {
    if (p.type === 'year') jYear = p.value;
    if (p.type === 'month') jMonth = p.value;
    if (p.type === 'day') jDay = p.value;
  });
  return {
    iso: `${jYear}/${jMonth}/${jDay}`,
    year: parseInt(jYear, 10),
    month: parseInt(jMonth, 10),
    day: parseInt(jDay, 10)
  };
}

// Core function to execute reminders
async function executeSendReminders() {
  if (!firebaseAdminApp || !firestoreDb || !firebaseMessaging) {
    throw new Error("Firebase Admin is not configured. Please set FIREBASE_SERVICE_ACCOUNT_KEY in your env variables.");
  }

  const snapshot = await firestoreDb.collection('fcm_reminders').get();
  if (snapshot.empty) {
    return { success: true, count: 0, message: "No registered devices in fcm_reminders." };
  }

  let messagesSent = 0;
  const errors = [];
  const tehranDate = getTehranJalaliDate();
  const todayStr = tehranDate.iso;

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const token = data.token;
    const reminders = data.reminders || [];

    // Filter reminders due today: support nextDueDateIso, nextDueDateStr, year/month/day, or daysLeft === 0
    const dueToday = reminders.filter(r => {
      if (r.isCompleted) return false;
      if (r.nextDueDateIso && r.nextDueDateIso === todayStr) return true;
      if (r.dueYear === tehranDate.year && r.dueMonth === tehranDate.month && r.dueDay === tehranDate.day) return true;
      if (r.nextDueDateStr === todayStr) return true;
      if (typeof r.daysLeft === 'number' && r.daysLeft === 0) return true;
      return false;
    });

    if (dueToday.length > 0 && token) {
      const names = dueToday.map(r => r.name || r.title || 'وام').join(' و ');
      const text = dueToday.length > 1
        ? `امروز موعد پرداخت قسط وام‌های ${names} است.`
        : `امروز موعد پرداخت قسط وام ${names} است.`;

      try {
        await firebaseMessaging.send({
          token: token,
          notification: {
            title: "یادآوری اقساط وام",
            body: text
          },
          data: {
            type: 'loan_reminder',
            date: todayStr,
            names: names
          },
          webpush: {
            notification: {
              title: "یادآوری اقساط وام",
              body: text,
              icon: '/icon-192x192.png',
              badge: '/favicon-96x96.png',
              tag: 'loan-reminder-' + todayStr,
              renotify: true
            }
          }
        });
        messagesSent++;
      } catch (e) {
        console.error("Failed to send message to token", token, e);
        errors.push({ token: token.substring(0, 15) + '...', error: e.message });
      }
    }
  }

  return {
    success: true,
    count: messagesSent,
    todayStr,
    totalDevices: snapshot.size,
    errors: errors.length > 0 ? errors : undefined,
    message: `Executed successfully. Sent ${messagesSent} reminders for date ${todayStr} across ${snapshot.size} device(s).`
  };
}

// Setup internal automatic cron job at 10:00 AM Asia/Tehran every day
let lastCronRunDate = null;
try {
  cron.schedule('0 10 * * *', async () => {
    const today = getTehranJalaliDate().iso;
    console.log(`[Internal Cron] Running scheduled daily reminder check at 10:00 AM (Tehran Time) for date ${today}...`);
    try {
      const result = await executeSendReminders();
      lastCronRunDate = today;
      console.log('[Internal Cron Result]:', result);
    } catch (err) {
      console.error('[Internal Cron Error]:', err.message);
    }
  }, {
    timezone: 'Asia/Tehran'
  });
  console.log('[Internal Cron] Daily reminder schedule registered (10:00 AM Asia/Tehran).');
} catch (cronErr) {
  console.warn('[Internal Cron] Failed to register cron schedule:', cronErr);
}

// Safety check: if server container boots up or wakes up after 10:00 AM Tehran time and today's run has not happened yet
function checkAndRunIfMissed10AM() {
  try {
    if (!firebaseAdminApp || !firestoreDb || !firebaseMessaging) return;
    const now = new Date();
    const tehranHourStr = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Tehran',
      hour: 'numeric',
      hour12: false
    }).format(now);
    const tehranHour = parseInt(tehranHourStr, 10);
    const today = getTehranJalaliDate().iso;

    if (tehranHour >= 10 && lastCronRunDate !== today) {
      console.log(`[Safety Check] Current Tehran hour is ${tehranHour} (>=10:00 AM) and date (${today}) not yet checked. Executing reminder check now...`);
      lastCronRunDate = today;
      executeSendReminders()
        .then(res => console.log('[Safety Check Result]:', res))
        .catch(err => {
          lastCronRunDate = null; // allow retry if failed
          console.error('[Safety Check Error]:', err.message);
        });
    }
  } catch (e) {
    console.warn('[Safety Check Error]:', e);
  }
}
setInterval(checkAndRunIfMissed10AM, 10 * 60 * 1000);
setTimeout(checkAndRunIfMissed10AM, 4000);

// CORS & Middleware for API routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// JSON body parser for POST API endpoints
app.use(express.json());

// API Endpoint for External Cron triggers (e.g. cron-job.org) or manual triggers
app.all(['/api/send-reminders', '/api/send-reminders/'], async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=UTF-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  try {
    const result = await executeSendReminders();
    return res.status(200).json(result);
  } catch (err) {
    console.error('API Send Reminders Error:', err);
    return res.status(500).json({
      success: false,
      error: err.message || "Server error executing reminders."
    });
  }
});

// API Endpoint for testing push notification immediately from UI
app.post('/api/send-test-push', async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=UTF-8');
  try {
    if (!firebaseAdminApp || !firebaseMessaging) {
      return res.status(400).json({ success: false, error: 'Firebase Admin پیکربندی نشده است.' });
    }
    let token = req.body?.token;
    if (!token && firestoreDb) {
      const snap = await firestoreDb.collection('fcm_reminders').limit(1).get();
      if (!snap.empty) {
        token = snap.docs[0].data().token;
      }
    }
    if (!token) {
      return res.status(404).json({
        success: false,
        error: 'هیچ توکن دستگاهی یافت نشد. لطفاً در برنامه روی دکمه فعال‌سازی اعلان‌ها کلیک نمایید.'
      });
    }
    await firebaseMessaging.send({
      token,
      notification: {
        title: "آزمایش سیستم یادآوری اقساط",
        body: "سیستم اعلان اقساط فعال است و یادآوری‌ها در ساعت ۱۰:۰۰ صبح با موفقیت ارسال خواهند شد."
      },
      data: {
        type: 'test_reminder',
        timestamp: String(Date.now())
      },
      webpush: {
        notification: {
          title: "آزمایش سیستم یادآوری اقساط",
          body: "سیستم اعلان اقساط فعال است و یادآوری‌ها در ساعت ۱۰:۰۰ صبح با موفقیت ارسال خواهند شد.",
          icon: '/icon-192x192.png',
          badge: '/favicon-96x96.png'
        }
      }
    });
    return res.status(200).json({ success: true, message: 'اعلان تست با موفقیت به دستگاه ارسال شد.' });
  } catch (err) {
    console.error('Test Push Error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

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

// Catch-all route to serve SPA
app.get('*', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.sendFile(path.join(rootPath, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

