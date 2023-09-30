// Import and configure the Firebase SDK
importScripts('/__/firebase/9.8.2/firebase-app-compat.js');
importScripts('/__/firebase/9.8.2/firebase-messaging-compat.js');
importScripts('/__/firebase/init.js');

const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically
// and you should use data messages for custom notifications.
// For more info see:
// https://firebase.google.com/docs/cloud-messaging/concept-options
messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = 'Callouts Evolved';
  const notificationOptions = {
    body: 'Guild Activity',
    icon: '/logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
