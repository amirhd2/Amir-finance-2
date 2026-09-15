importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js');

const firebaseConfig = {
  projectId: "gen-lang-client-0095210864",
  apiKey: "AIzaSyDCxwfdom8Uwe5Q0C-EH7pAYNQN3B9c5gY",
  appId: "1:759840178251:web:139a44353950e56ae34dce",
  messagingSenderId: "759840178251"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification?.title || payload.data?.title || 'یادآوری امیر فایننس';
  const notificationOptions = {
    body: payload.notification?.body || payload.data?.body || 'موعد قسط وام یا سررسید حساب شما فرا رسیده است.',
    icon: './icon-192x192.png',
    badge: './favicon-96x96.png',
    data: payload.data || {},
    tag: 'loan-reminder-' + Date.now(),
    renotify: true
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('./');
      }
    })
  );
});
