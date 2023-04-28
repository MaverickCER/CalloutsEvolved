// saving as I may decide to utilize fcm in the future.
// 'use strict';

// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp();

// exports.sendMessageNotification = functions.database
//   .ref('/guildMessages/{guildId}/{roomId}/{message}')
//   .onWrite(async (change, context) => {
//     const guildId = context.params.guildId;
//     const roomId = context.params.roomId;
//     const userId = context.params.message.userId;

//     if (!change.after.val()) {
//       return functions.logger.log(`Message deleted`);
//     }

//     // Get the list of device notification tokens.
//     const getDeviceTokensPromise = admin
//       .database()
//       .ref(`/guildNotifications/${guildId}/${roomId}/`)
//       .once('value');

//     // Get the list of device notification tokens.
//     const getGuildDataPromise = admin.database().ref(`/guildAliases/${guildId}`).once('value');
//     const getUserpDataPromise = admin.database().ref(`/userData/${userId}`).once('value');

//     // The snapshot to the user's tokens.
//     let tokensSnapshot;

//     // The array containing all the user's tokens.
//     let tokens;

//     const results = await Promise.all([
//       getDeviceTokensPromise,
//       getGuildDataPromise,
//       getUserpDataPromise,
//     ]);
//     tokensSnapshot = results[0];
//     const guild = results[1];
//     const user = results[2];

//     // Check if there are any device tokens.
//     if (!tokensSnapshot.hasChildren()) {
//       return functions.logger.log('There are no notification tokens to send to.');
//     }

//     // Notification details.
//     const payload = {
//       notification: {
//         title: `${guild.displayName}`,
//         body: `${user.displayName}: ${message.message}`,
//         icon: guild.guildPhotoURL,
//       },
//       webpush: {
//         fcm_options: {
//           link: `https://www.calloutsevolved.com/${guildId}?room=${roomId}`,
//         },
//       },
//     };

//     // Listing all tokens as an array.
//     tokens = Object.keys(tokensSnapshot.val());
//     // Send notifications to all tokens.
//     const response = await admin.messaging().sendToDevice(tokens, payload);
//     // For each message check if there was an error.
//     const tokensToRemove = [];
//     response.results.forEach((result, index) => {
//       const error = result.error;
//       if (error) {
//         functions.logger.error('Failure sending notification to', tokens[index], error);
//         // Cleanup the tokens who are not registered anymore.
//         if (
//           error.code === 'messaging/invalid-registration-token' ||
//           error.code === 'messaging/registration-token-not-registered'
//         ) {
//           tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove());
//         }
//       }
//     });
//     return Promise.all(tokensToRemove);
//   });
