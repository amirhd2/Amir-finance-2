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

let fcmToken = null;

export async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      if (VAPID_KEY === "YOUR_VAPID_KEY_HERE") {
        console.warn('VAPID_KEY is not set. Push notifications require a VAPID key from Firebase Console.');
        return null;
      }
      fcmToken = await getToken(messaging, { vapidKey: VAPID_KEY });
      console.log('FCM Token:', fcmToken);
      await syncRemindersToFirestore();
      return fcmToken;
    } else {
      console.log('Unable to get permission to notify.');
      return null;
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return null;
  }
}

async function syncRemindersToFirestore() {
  if (!fcmToken) return;
  const remindersStr = localStorage.getItem('amir_fin_fcm_reminders');
  if (remindersStr) {
    try {
      const reminders = JSON.parse(remindersStr);
      // We store the user's token and their upcoming reminders
      const docRef = doc(db, "fcm_reminders", fcmToken);
      await setDoc(docRef, {
        token: fcmToken,
        updatedAt: new Date().toISOString(),
        reminders: reminders
      });
      console.log("Reminders synced to Firebase successfully");
    } catch (e) {
      console.error("Error syncing reminders to Firebase", e);
    }
  }
}

// Sync whenever App.jsx updates the local storage payload
window.addEventListener('amir_fin_reminders_updated', () => {
  syncRemindersToFirestore();
});

// Create a hidden button to request permission (due to browser policy requiring user gesture)
// The UI can call window.requestNotificationPermission() when the user clicks a specific setting.
window.requestNotificationPermission = requestNotificationPermission;
