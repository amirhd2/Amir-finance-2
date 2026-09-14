import re

with open('server_old.js', 'r') as f:
    content = f.read()

# Remove the appended API from the old file
if "let isFirebaseAdminInitialized = false;" in content:
    content = content.split("let isFirebaseAdminInitialized = false;")[0]

# Now append the Firebase logic and API route *before* app.get('*')
firebase_logic = """
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
    
    const todayJalaliFormatter = new Intl.DateTimeFormat('en-US-u-ca-persian', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const todayParts = todayJalaliFormatter.formatToParts(new Date());
    let jYear, jMonth, jDay;
    todayParts.forEach(p => {
        if (p.type === 'year') jYear = p.value;
        if (p.type === 'month') jMonth = p.value;
        if (p.type === 'day') jDay = p.value;
    });
    const todayStr = `${jYear}/${jMonth}/${jDay}`; 

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
"""

content = content.replace("app.get('*', (req, res) => {", firebase_logic + "\napp.get('*', (req, res) => {")

with open('server.js', 'w') as f:
    f.write(content)
