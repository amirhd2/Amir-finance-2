const fs = require('fs');
let code = fs.readFileSync('fcm-client.js', 'utf8');
code = code.replace(
  "console.error('Error requesting notification permission:', error);",
  "console.error('Error requesting notification permission:', error);\n    alert('خطای فایربیس: ' + error.message);"
);

// Also pass the service worker explicitly
code = code.replace(
  "fcmToken = await getToken(messaging, { vapidKey: VAPID_KEY });",
  "const reg = await navigator.serviceWorker.register('/firebase-messaging-sw.js');\n      fcmToken = await getToken(messaging, { vapidKey: VAPID_KEY, serviceWorkerRegistration: reg });"
);

fs.writeFileSync('fcm-client.js', code);
