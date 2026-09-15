import admin from 'firebase-admin';

async function main() {
  console.log('[Daily Reminders] Starting daily loan installment reminder check...');
  
  // Check if service account key is provided via env
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKey) {
    console.warn('[Daily Reminders] FIREBASE_SERVICE_ACCOUNT_KEY is not set.');
    console.log('[Daily Reminders] To enable remote background push, set FIREBASE_SERVICE_ACCOUNT_KEY in repository Secrets.');
    process.exit(0);
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountKey);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch (err) {
    console.error('[Daily Reminders] Error parsing FIREBASE_SERVICE_ACCOUNT_KEY:', err);
    process.exit(1);
  }

  try {
    const db = admin.firestore();
    const snapshot = await db.collection('fcm_reminders').get();
    
    if (snapshot.empty) {
      console.log('[Daily Reminders] No device tokens registered in fcm_reminders.');
      process.exit(0);
    }

    const todayJalaliFormatter = new Intl.DateTimeFormat('en-US-u-ca-persian', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    });
    const todayParts = todayJalaliFormatter.formatToParts(new Date());
    let jYear, jMonth, jDay;
    todayParts.forEach(p => {
      if (p.type === 'year') jYear = p.value;
      if (p.type === 'month') jMonth = p.value;
      if (p.type === 'day') jDay = p.value;
    });
    const todayStr = `${jYear}/${jMonth}/${jDay}`;
    console.log(`[Daily Reminders] Today's Jalali Date: ${todayStr}`);

    let sentCount = 0;

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const token = data.token;
      const reminders = data.reminders || [];
      
      const dueToday = reminders.filter(r => !r.isCompleted && r.nextDueDateStr === todayStr);
      
      if (dueToday.length > 0 && token) {
        const names = dueToday.map(r => r.name || r.title || 'وام').join(' و ');
        const bodyText = dueToday.length > 1 
          ? `امروز موعد پرداخت قسط وام‌های ${names} است.`
          : `امروز موعد پرداخت قسط وام ${names} است.`;
        
        try {
          await admin.messaging().send({
            token: token,
            notification: {
              title: "یادآوری اقساط وام",
              body: bodyText
            },
            data: {
              type: 'loan_reminder',
              date: todayStr
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
