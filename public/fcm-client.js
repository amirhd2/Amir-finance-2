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
      fcmToken = await getToken(messaging, { 
        vapidKey: VAPID_KEY, 
        serviceWorkerRegistration: reg || undefined 
      });
      if (fcmToken) {
        localStorage.setItem('amir_fin_fcm_token', fcmToken);
        window.fcmToken = fcmToken;
        console.log('FCM Token registered and saved:', fcmToken);
        await syncRemindersToFirestore();
      }
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
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: reg || undefined
    });
    if (token) {
      fcmToken = token;
      localStorage.setItem('amir_fin_fcm_token', token);
      window.fcmToken = token;
      console.log('[FCM] Auto-initialized token:', token.substring(0, 15) + '...');
      await syncRemindersToFirestore();
      window.dispatchEvent(new CustomEvent('fcm_token_ready', { detail: { token } }));
    }
  } catch (e) {
    console.warn('[FCM] Auto-init token warning:', e);
    // If getting token fails, we can still use locally saved token to sync
    if (fcmToken) {
      await syncRemindersToFirestore();
    }
  }
}

export async function sendTestNotification() {
  if (typeof Notification === 'undefined') {
    throw new Error('مرورگر شما از اعلان‌ها پشتیبانی نمی‌کند');
  }
  if (Notification.permission !== 'granted') {
    const res = await requestNotificationPermission();
    if (!res) throw new Error('دسترسی اعلان داده نشده است');
  }

  // 1. Show immediate test notification via Service Worker or Notification API
  const title = 'آزمایش سیستم یادآوری اقساط';
  const body = 'سیستم اعلان اقساط فعال است و یادآوری‌ها در ساعت ۱۰:۰۰ صبح با موفقیت ارسال خواهند شد.';
  let shownLocally = false;

  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.ready;
      if (reg && reg.showNotification) {
        await reg.showNotification(title, {
          body,
          icon: './icon-192x192.png',
          badge: './favicon-96x96.png',
          tag: 'test-reminder-' + Date.now(),
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

  // 2. Ensure FCM Token is initialized and synced
  if (!fcmToken) {
    await autoInitFCM();
  } else {
    await syncRemindersToFirestore();
  }

  // 3. Also ping the backend test push endpoint
  try {
    const currentTok = fcmToken || localStorage.getItem('amir_fin_fcm_token');
    await fetch('/api/send-test-push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: currentTok })
    });
  } catch (e) {
    console.warn('Backend test push ping error (normal if local/offline):', e);
  }

  return true;
}

export async function syncRemindersToFirestore() {
  const tokenToUse = fcmToken || (typeof localStorage !== 'undefined' ? localStorage.getItem('amir_fin_fcm_token') : null);
  if (!tokenToUse) return;
  const remindersStr = localStorage.getItem('amir_fin_fcm_reminders');
  if (remindersStr) {
    try {
      const reminders = JSON.parse(remindersStr);
      const docRef = doc(db, "fcm_reminders", tokenToUse);
      await setDoc(docRef, {
        token: tokenToUse,
        updatedAt: new Date().toISOString(),
        reminders: reminders
      });
      console.log("Reminders synced to Firebase successfully. Count:", reminders.length);
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
  window.addEventListener('amir_fin_reminders_updated', () => {
    syncRemindersToFirestore();
  });
  window.requestNotificationPermission = requestNotificationPermission;
  window.syncRemindersToFirestore = syncRemindersToFirestore;
  window.sendTestNotification = sendTestNotification;
  window.autoInitFCM = autoInitFCM;
}
