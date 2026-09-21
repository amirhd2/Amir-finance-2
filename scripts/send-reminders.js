import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getMessaging } from 'firebase-admin/messaging';

const FIRESTORE_DB_ID = 'ai-studio-newfinanceapp-374c3a0a-cf0b-49f8-895c-4c25e6036db1';

async function main() {
  console.log('[Daily Reminders] Starting daily loan installment reminder check...');
  
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKey) {
    console.warn('[Daily Reminders] FIREBASE_SERVICE_ACCOUNT_KEY is not set.');
    console.log('[Daily Reminders] To enable remote background push, set FIREBASE_SERVICE_ACCOUNT_KEY in environment/secrets.');
    process.exit(0);
  }

  let app;
  try {
    const serviceAccount = JSON.parse(serviceAccountKey);
    app = initializeApp({
      credential: cert(serviceAccount)
    });
  } catch (err) {
    console.error('[Daily Reminders] Error parsing FIREBASE_SERVICE_ACCOUNT_KEY or initializing app:', err);
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

    let sentCount = 0;

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const token = data.token;
      const reminders = data.reminders || [];
      
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
              date: todayStr
            },
            webpush: {
              notification: {
                title: "یادآوری اقساط وام",
                body: bodyText,
                icon: '/icon-192x192.png',
                badge: '/favicon-96x96.png',
                tag: 'loan-reminder-' + todayStr,
                renotify: true
              }
            }
          });
          console.log(`[Daily Reminders] Successfully sent notification to token: ${token.substring(0, 15)}...`);
          sentCount++;
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
