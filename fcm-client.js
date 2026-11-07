import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
  projectId: "gen-lang-client-0095210864",
  appId: "1:759840178251:web:139a44353950e56ae34dce",
  apiKey: "AIzaSyDCxwfdom8Uwe5Q0C-EH7pAYNQN3B9c5gY",
  authDomain: "gen-lang-client-0095210864.firebaseapp.com",
  messagingSenderId: "759840178251"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const db = getFirestore(app, "ai-studio-newfinanceapp-374c3a0a-cf0b-49f8-895c-4c25e6036db1");

// Replace this with your actual VAPID key from Firebase Console -> Project Settings -> Cloud Messaging -> Web configuration
const VAPID_KEY = "BJ-9kaBziQUmvzmiRalAEbiGzG-60DfOQGORlfW3tqOCPoaS9E5r51VLudTU0HXP2IG_WTNp_2wv5Np2zIajvck"; 

let fcmToken = (typeof localStorage !== 'undefined' ? localStorage.getItem('amir_fin_fcm_token') : null) || null;
if (typeof window !== 'undefined') {
  window.fcmToken = fcmToken;
}

// Helper to get or ensure active service worker registration
async function getOrRegisterServiceWorker() {
  if (!('serviceWorker' in navigator)) return null;
  let reg = null;
  try {
    reg = await Promise.race([
      navigator.serviceWorker.ready,
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 3000))
    ]);
  } catch (e) {
    console.warn('[FCM] serviceWorker.ready wait error or timeout:', e);
  }

  if (!reg) {
    try {
      reg = await navigator.serviceWorker.getRegistration();
    } catch (e) {
      console.warn('[FCM] getRegistration error:', e);
    }
  }

  if (!reg) {
    const swUrl = new URL('./sw.js', window.location.href).href;
    reg = await navigator.serviceWorker.register(swUrl);
    if (reg.installing || reg.waiting) {
      await new Promise((resolve) => {
        const worker = reg.installing || reg.waiting;
        if (!worker || worker.state === 'activated') return resolve();
        worker.addEventListener('statechange', () => {
          if (worker.state === 'activated') resolve();
        });
        setTimeout(resolve, 2500);
      });
    }
  }
  return reg;
}

export async function requestNotificationPermission() {
  try {
    if (!('Notification' in window)) {
      alert('مرورگر شما از اعلان‌ها پشتیبانی نمی‌کند. اگر کاربر آیفون هستید، ابتدا باید برنامه را از طریق منوی Share به صفحه اصلی (Add to Home Screen) اضافه کنید.');
      return null;
    }
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      const reg = await getOrRegisterServiceWorker();
      try {
        fcmToken = await getToken(messaging, { 
          vapidKey: VAPID_KEY, 
          serviceWorkerRegistration: reg || undefined 
        });
      } catch (vErr) {
        console.warn('[FCM] getToken with VAPID key failed, trying without VAPID key:', vErr);
        try {
          fcmToken = await getToken(messaging, { serviceWorkerRegistration: reg || undefined });
        } catch (dErr) {
          console.warn('[FCM] getToken default fallback failed:', dErr);
        }
      }

      if (fcmToken) {
        localStorage.setItem('amir_fin_fcm_token', fcmToken);
        window.fcmToken = fcmToken;
        console.log('FCM Token registered and saved:', fcmToken);
      }
      await syncRemindersToFirestore();
      window.dispatchEvent(new CustomEvent('fcm_permission_changed', { detail: { permission: 'granted', token: fcmToken } }));
      return fcmToken;
    } else {
      console.log('Unable to get permission to notify. Permission status:', permission);
      window.dispatchEvent(new CustomEvent('fcm_permission_changed', { detail: { permission } }));
      return null;
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    alert('خطا در ارتباط با سرور اعلان: ' + error.message);
    return null;
  }
}

export async function autoInitFCM() {
  if (typeof window === 'undefined' || !('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;

  try {
    const reg = await getOrRegisterServiceWorker();
    let token = null;
    try {
      token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: reg || undefined
      });
    } catch (vErr) {
      console.warn('[FCM] Auto-init getToken with VAPID failed, trying without VAPID key:', vErr);
      try {
        token = await getToken(messaging, { serviceWorkerRegistration: reg || undefined });
      } catch (_) {}
    }

    if (token) {
      fcmToken = token;
      localStorage.setItem('amir_fin_fcm_token', token);
      window.fcmToken = token;
      console.log('[FCM] Auto-initialized token:', token.substring(0, 15) + '...');
      window.dispatchEvent(new CustomEvent('fcm_token_ready', { detail: { token } }));
    }
  } catch (e) {
    console.warn('[FCM] Auto-init token warning:', e);
  } finally {
    await syncRemindersToFirestore();
  }
}

export async function sendTestNotification(delaySeconds = 0) {
  if (typeof Notification === 'undefined') {
    throw new Error('مرورگر شما از اعلان‌ها پشتیبانی نمی‌کند');
  }
  if (Notification.permission !== 'granted') {
    const res = await requestNotificationPermission();
    if (!res) throw new Error('دسترسی اعلان داده نشده است');
  }

  const title = 'آزمایش سیستم یادآوری اقساط';
  const body = delaySeconds > 0
    ? 'اعلان تست در حالت پس‌زمینه با موفقیت دریافت شد.'
    : 'سیستم اعلان اقساط فعال است و یادآوری‌ها با موفقیت ارسال می‌شوند.';

  // 1. Only show immediate client-side notification if delaySeconds is 0
  if (!delaySeconds || delaySeconds <= 0) {
    let shownLocally = false;
    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.ready;
        if (reg && reg.showNotification) {
          await reg.showNotification(title, {
            body,
            icon: './icon-192x192.png',
            badge: './favicon-96x96.png',
            tag: 'test-reminder',
            renotify: true
          });
          shownLocally = true;
        }
      } catch (e) {
        console.warn('SW test notification warning:', e);
      }
    }

    if (!shownLocally) {
      try {
        new Notification(title, { body, icon: './icon-192x192.png' });
      } catch (e) {
        console.warn('Direct test notification error:', e);
      }
    }
  } else {
    // 2. Delayed background test: Tell active Service Worker to wait and show notification after delaySeconds
    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.ready;
        const targetWorker = reg?.active || navigator.serviceWorker.controller;
        if (targetWorker) {
          targetWorker.postMessage({
            type: 'SCHEDULE_TEST_NOTIFICATION',
            delayMs: delaySeconds * 1000,
            title,
            body
          });
        }
      } catch (e) {
        console.warn('Could not postMessage to SW:', e);
      }
    }
  }

  // 2. Ensure FCM Token is initialized and synced
  if (!fcmToken) {
    await autoInitFCM();
  } else {
    await syncRemindersToFirestore();
  }

  // 3. Send test push request to backend server (server will apply delaySeconds before sending FCM message)
  try {
    const currentTok = fcmToken || localStorage.getItem('amir_fin_fcm_token');
    const resp = await fetch('/api/send-test-push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: currentTok, delaySeconds })
    });
    const data = await resp.json();
    return data;
  } catch (e) {
    console.warn('Backend test push ping error (normal if local/offline):', e);
  }

  return { success: true };
}

export async function syncRemindersToFirestore(resetLastNotified = false) {
  const tokenToUse = fcmToken || (typeof localStorage !== 'undefined' ? localStorage.getItem('amir_fin_fcm_token') : null);
  if (!tokenToUse) return;
  const remindersStr = localStorage.getItem('amir_fin_fcm_reminders');
  const enableRemindersStr = localStorage.getItem('amir_fin_enable_reminders');
  const reminderTimeStr = localStorage.getItem('amir_fin_reminder_time');

  const remindersEnabled = enableRemindersStr !== null ? JSON.parse(enableRemindersStr) : true;
  const reminderTime = reminderTimeStr || "10:00";
  const [rHour, rMin] = reminderTime.split(':').map(n => parseInt(n, 10));

  if (remindersStr) {
    try {
      const reminders = JSON.parse(remindersStr);
      const docRef = doc(db, "fcm_reminders", tokenToUse);
      const payload = {
        token: tokenToUse,
        updatedAt: new Date().toISOString(),
        remindersEnabled: remindersEnabled,
        reminderTime: reminderTime,
        reminderHour: isNaN(rHour) ? 10 : rHour,
        reminderMinute: isNaN(rMin) ? 0 : rMin,
        reminders: reminders
      };
      if (resetLastNotified) {
        payload.lastNotifiedDate = null;
      }
      await setDoc(docRef, payload, { merge: true });
      console.log("Reminders synced to Firebase successfully. Enabled:", remindersEnabled, "Time:", reminderTime);
    } catch (e) {
      console.error("Error syncing reminders to Firebase", e);
    }
  }
}

// Auto-run autoInitFCM when window loads if permission is already granted
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    autoInitFCM();
  } else {
    window.addEventListener('load', autoInitFCM);
  }
}

// Sync whenever App.jsx updates the local storage payload
if (typeof window !== 'undefined') {
  window.addEventListener('amir_fin_reminders_updated', (e) => {
    const resetLastNotified = e?.detail?.resetLastNotified || false;
    syncRemindersToFirestore(resetLastNotified);
  });
  window.requestNotificationPermission = requestNotificationPermission;
  window.syncRemindersToFirestore = syncRemindersToFirestore;
  window.sendTestNotification = sendTestNotification;
  window.autoInitFCM = autoInitFCM;
}
