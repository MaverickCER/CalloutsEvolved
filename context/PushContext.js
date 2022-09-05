// import 'firebase/messaging';

// import * as firebase from 'firebase/app';

// import React, { useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';

// import { firebaseCloudMessaging } from '../utils/firebaseCloudMessaging';
// import { useRouter } from 'next/router';

// function PushNotificationsProvider({ children }) {
//   const router = useRouter();
//   useEffect(() => {
//     setToken();

//     // Event listener that listens for the push notification event in the background
//     if ('serviceWorker' in navigator) {
//       navigator.serviceWorker.addEventListener('message', (event) => {
//         console.log('event for the service worker', event);
//       });
//     }

//     // Calls the getMessage() function if the token is there
//     async function setToken() {
//       try {
//         const token = await firebaseCloudMessaging.init();
//         if (token) {
//           console.log('token', token);
//           getMessage();
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   });

//   // Handles the click function on the toast showing push notification
//   const handleClickPushNotification = (url) => {
//     router.push(url);
//   };

//   // Get the push notification message and triggers a toast to show it
//   function getMessage() {
//     const messaging = firebase.messaging();
//     messaging.onMessage((message) => {
//       toast(
//         <div onClick={() => handleClickPushNotification(message?.webpush?.fcm_options?.link)}>
//           <h5>{message?.notification?.title}</h5>
//           <h6>{message?.notification?.body}</h6>
//         </div>,
//         {
//           closeOnClick: false,
//         }
//       );
//     });
//   }

//   return (
//     <>
//       <ToastContainer />
//       {children}
//     </>
//   );
// }

// export default PushNotificationsProvider;
