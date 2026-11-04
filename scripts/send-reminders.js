import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getMessaging } from 'firebase-admin/messaging';

const FIRESTORE_DB_ID = 'ai-studio-newfinanceapp-374c3a0a-cf0b-49f8-895c-4c25e6036db1';

function parseServiceAccountKey(raw) {
  if (!raw) return null;
  let str = String(raw).trim();
  // Strip outer quotes if secret was surrounded by quotes
  if ((str.startsWith('"') && str.endsWith('"')) || (str.startsWith("'") && str.endsWith("'"))) {
    str = str.slice(1, -1).trim();
  }
  // Check if string is base64 encoded JSON
  if (!str.startsWith('{')) {
    try {
      const decoded = Buffer.from(str, 'base64').toString('utf8').trim();
      if (decoded.startsWith('{')) {
        str = decoded;
      }
    } catch (_) {}
  }
  return JSON.parse(str);
}

async function main() {
  console.log('[Daily Reminders] Starting daily loan installment reminder check...');
  console.log(`[Daily Reminders] Runtime: Node.js ${process.version}`);
  
  const rawKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!rawKey || !rawKey.trim()) {
    console.warn('[Daily Reminders] FIREBASE_SERVICE_ACCOUNT_KEY environment secret is not set.');
    console.log('[Daily Reminders] Please ensure FIREBASE_SERVICE_ACCOUNT_KEY is configured in GitHub Repository Secrets.');
    process.exit(0);
  }

  let app;
  try {
    const serviceAccount = parseServiceAccountKey(rawKey);
    if (!serviceAccount || !serviceAccount.project_id) {
      throw new Error("Invalid service account JSON: missing project_id");
    }
    console.log(`[Daily Reminders] Service Account parsed successfully for project: ${serviceAccount.project_id}`);
    app = initializeApp({
      credential: cert(serviceAccount)
    });
  } catch (err) {
    console.error('[Daily Reminders] Error parsing FIREBASE_SERVICE_ACCOUNT_KEY or initializing app:', err.message);
    process.exit(1);
  }

  try {
    const db = getFirestore(app, FIRESTORE_DB_ID);
    const messaging = getMessaging(app);
    const snapshot = await db.collection('fcm_reminders').get();
    
    if (snapshot.empty) {
      console.log('[Daily Reminders] No device tokens registered in fcm_reminders.');
      process.exit(0);
    }

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
    const todayStr = `${jYear}/${jMonth}/${jDay}`;
    const numYear = parseInt(jYear, 10);
    const numMonth = parseInt(jMonth, 10);
    const numDay = parseInt(jDay, 10);
    console.log(`[Daily Reminders] Today's Jalali Date (Asia/Tehran): ${todayStr}`);

    // Get current Tehran time for checking target notification hours
    const now = new Date();
    const tehranTimeParts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Tehran',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    }).formatToParts(now);
    let currentTehranHour = 10, currentTehranMinute = 0;
    tehranTimeParts.forEach(p => {
      if (p.type === 'hour') currentTehranHour = parseInt(p.value, 10);
      if (p.type === 'minute') currentTehranMinute = parseInt(p.value, 10);
    });
    const currentTehranTotalMin = currentTehranHour * 60 + currentTehranMinute;

    let sentCount = 0;

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const token = data.token;
      const reminders = data.reminders || [];
      
      // 1. Skip if user turned off reminders in settings
      if (data.remindersEnabled === false) {
        console.log(`[Daily Reminders] Skipping token ${token.substring(0, 10)}... (reminders disabled by user).`);
        continue;
      }

      // 2. Skip if already notified today by server
      if (data.lastNotifiedDate === todayStr) {
        console.log(`[Daily Reminders] Token ${token.substring(0, 10)}... already notified today (${todayStr}).`);
        continue;
      }

      // 3. Check requested reminder time
      const targetHour = typeof data.reminderHour === 'number' ? data.reminderHour : 10;
      const targetMin = typeof data.reminderMinute === 'number' ? data.reminderMinute : 0;
      const targetTotalMin = targetHour * 60 + targetMin;

      if (currentTehranTotalMin < targetTotalMin) {
        console.log(`[Daily Reminders] Skipping token ${token.substring(0, 10)}... Requested time is ${data.reminderTime || '10:00'}, current Tehran time is ${currentTehranHour}:${String(currentTehranMinute).padStart(2, '0')}.`);
        continue;
      }

      const dueToday = reminders.filter(r => {
        if (r.isCompleted) return false;
        if (r.nextDueDateIso && r.nextDueDateIso === todayStr) return true;
        if (r.dueYear === numYear && r.dueMonth === numMonth && r.dueDay === numDay) return true;
        if (r.nextDueDateStr === todayStr) return true;
        if (typeof r.daysLeft === 'number' && r.daysLeft === 0) return true;
        return false;
      });
      
      if (dueToday.length > 0 && token) {
        const names = dueToday.map(r => r.name || r.title || 'وام').join(' و ');
        const bodyText = dueToday.length > 1 
          ? `امروز موعد پرداخت قسط وام‌های ${names} است.`
          : `امروز موعد پرداخت قسط وام ${names} است.`;
        
        try {
          await messaging.send({
            token: token,
            notification: {
              title: "یادآوری اقساط وام",
              body: bodyText
            },
            data: {
              type: 'loan_reminder',
              date: todayStr,
              title: "یادآوری اقساط وام",
              body: bodyText
            },
            android: {
              priority: 'high'
            },
            webpush: {
              headers: {
                Urgency: 'high',
                TTL: '86400'
              },
              notification: {
                title: "یادآوری اقساط وام",
                body: bodyText,
                icon: '/icon-192x192.png',
                badge: '/favicon-96x96.png',
                tag: 'loan-reminder-' + todayStr,
                renotify: true,
                requireInteraction: true
              },
              fcmOptions: {
                link: '/'
              }
            }
          });
          console.log(`[Daily Reminders] Successfully sent notification to token: ${token.substring(0, 15)}...`);
          sentCount++;
          try {
            await doc.ref.set({ lastNotifiedDate: todayStr }, { merge: true });
          } catch (_) {}
        } catch (e) {
          console.error(`[Daily Reminders] Failed to send push message to token ${token.substring(0, 15)}...`, e.message);
        }
      }
    }

    console.log(`[Daily Reminders] Finished! Total messages sent: ${sentCount}`);
  } catch (error) {
    console.error('[Daily Reminders] Unhandled error during execution:', error);
    process.exit(1);
  }
}

main();
