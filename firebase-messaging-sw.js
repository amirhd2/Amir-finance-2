self.addEventListener('push', (event) => {
  let title = 'یادآوری امیر فایننس';
  let body = 'موعد قسط وام یا سررسید حساب شما فرا رسیده است.';
  let data = {};
  if (event.data) {
    try {
      const parsed = event.data.json();
      title = parsed.notification?.title || parsed.data?.title || parsed.title || title;
      body = parsed.notification?.body || parsed.data?.body || parsed.body || body;
      data = parsed.data || parsed;
    } catch (e) {
      body = event.data.text() || body;
    }
  }
  const notificationOptions = {
    body: body,
    icon: './icon-192x192.png',
    badge: './favicon-96x96.png',
    tag: 'loan-reminder-' + (data.date || Date.now()),
    renotify: true,
    requireInteraction: true,
    vibrate: [250, 100, 250],
    dir: 'rtl',
    lang: 'fa',
    data: data
  };
  event.waitUntil(self.registration.showNotification(title, notificationOptions));
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
