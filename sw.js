const CACHE_NAME = 'amir-finance-v3.3.2-b537';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './app.compiled.js',
  './version.json',
  './site.webmanifest',
  './manifest.webmanifest',
  './favicon.ico',
  './favicon.svg',
  './favicon-16x16.png',
  './favicon-32x32.png',
  './favicon-48x48.png',
  './favicon-96x96.png',
  './apple-touch-icon.png',
  './apple-touch-icon-152x152.png',
  './apple-touch-icon-167x167.png',
  './apple-touch-icon-180x180.png',
  './icon-192x192.png',
  './icon-512x512.png',
  './maskable-icon-512x512.png',
  './web-app-manifest-192x192.png',
  './web-app-manifest-512x512.png',
  './splash-portrait.png',
  './splash-landscape.png',
  './fcm-client.js',
  './firebase-messaging-sw.js',

  // Local Offline Vendor Dependencies
  './vendor/material-symbols.css',
  './vendor/vazirmatn.css',
  './vendor/tailwindcss.js',
  './vendor/react.production.min.js',
  './vendor/react-dom.production.min.js',
  './vendor/babel.min.js',
  './vendor/framer-motion.js',
  './vendor/lucide.js',

  // Local Offline Fonts
  './vendor/fonts/material-symbols.woff2',
  './vendor/fonts/webfonts/Vazirmatn-Thin.woff2',
  './vendor/fonts/webfonts/Vazirmatn-ExtraLight.woff2',
  './vendor/fonts/webfonts/Vazirmatn-Light.woff2',
  './vendor/fonts/webfonts/Vazirmatn-Regular.woff2',
  './vendor/fonts/webfonts/Vazirmatn-Medium.woff2',
  './vendor/fonts/webfonts/Vazirmatn-SemiBold.woff2',
  './vendor/fonts/webfonts/Vazirmatn-Bold.woff2',
  './vendor/fonts/webfonts/Vazirmatn-ExtraBold.woff2',
  './vendor/fonts/webfonts/Vazirmatn-Black.woff2',
  './src/assets/fonts/Vazir.ttf',
  './assets/fonts/Vazir.ttf',
  './fonts/Vazir.ttf'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await Promise.allSettled(
        ASSETS_TO_CACHE.map((asset) => cache.add(asset).catch((err) => {
          console.warn('SW pre-cache failed for:', asset, err);
        }))
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Always fetch version.json with network-first but fallback to cache when offline
  if (url.pathname.endsWith('/version.json') || url.pathname.endsWith('version.json')) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match('./version.json') || caches.match('version.json'))
    );
    return;
  }

  // Network-first strategy for app.compiled.js to ensure fresh code on reload when online
  if (url.pathname.endsWith('/app.compiled.js') || url.pathname.endsWith('app.compiled.js')) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        })
        .catch(() => caches.match('./app.compiled.js') || caches.match('app.compiled.js'))
    );
    return;
  }

  // Navigation / HTML page requests (Network-first with immediate offline fallback to cached index.html)
  if (event.request.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('/index.html') || url.pathname.endsWith('index.html')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put('./', responseClone.clone());
              cache.put('./index.html', responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match('./index.html')
            .then((cachedIndex) => cachedIndex || caches.match('./') || caches.match('index.html'));
        })
    );
    return;
  }

  // Cache-first strategy for static assets, vendor JS/CSS, icons, and fonts
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached version immediately for 100% offline availability
        if (navigator.onLine) {
          fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
            }
          }).catch(() => {});
        }
        return cachedResponse;
      }

      // Not in cache yet, fetch from network and store in cache
      return fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          return new Response('Offline resource not available', { status: 503, statusText: 'Offline' });
        });
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// --- Firebase Cloud Messaging (FCM) Background Push Notifications ---
let fcmInitialized = false;
try {
  importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js');
  importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js');

  const firebaseConfig = {
    projectId: "gen-lang-client-0095210864",
    apiKey: "AIzaSyDCxwfdom8Uwe5Q0C-EH7pAYNQN3B9c5gY",
    appId: "1:759840178251:web:139a44353950e56ae34dce",
    messagingSenderId: "759840178251"
  };

  if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();
    messaging.onBackgroundMessage((payload) => {
      console.log('[sw.js] Received FCM background message:', payload);
      const title = payload.notification?.title || payload.data?.title || 'یادآوری امیر فایننس';
      const body = payload.notification?.body || payload.data?.body || 'موعد قسط وام یا سررسید حساب شما فرا رسیده است.';
      return self.registration.showNotification(title, {
        body: body,
        icon: './icon-192x192.png',
        badge: './favicon-96x96.png',
        data: payload.data || {},
        tag: 'loan-reminder-' + Date.now(),
        renotify: true
      });
    });
    fcmInitialized = true;
  }
} catch (fcmErr) {
  console.warn('[sw.js] FCM compat scripts load warning (normal if offline):', fcmErr);
}

// Dedicated push event handler to guarantee notification delivery on all devices & browsers
self.addEventListener('push', (event) => {
  let title = 'یادآوری اقساط وام';
  let body = 'موعد پرداخت قسط وام شما فرا رسیده است.';
  let data = {};
  if (event.data) {
    try {
      const parsed = event.data.json();
      title = parsed.notification?.title || parsed.title || title;
      body = parsed.notification?.body || parsed.body || body;
      data = parsed.data || parsed;
    } catch (e) {
      body = event.data.text() || body;
    }
  }
  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: './icon-192x192.png',
      badge: './favicon-96x96.png',
      tag: 'loan-reminder-' + Date.now(),
      renotify: true,
      dir: 'rtl',
      lang: 'fa',
      data: data
    })
  );
});

// Focus or open app on notification click
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


