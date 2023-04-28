'use strict';

const axios = require('axios');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.database();
const store = admin.firestore();
const auth = {
  username: process.env.CLIENT_ID,
  password: process.env.CLIENT_SECRET,
};

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

async function sendEmail(userId, subscriptionId, reason, data) {
  const isCanceling = reason !== 'Unable to get subscription';
  await store
    .collection('email/data/deliver')
    .doc()
    .create({
      to: ['maverickcer@gmail.com'], // Email recipient(s)
      message: {
        subject: `URGENT: ${isCanceling && 'Cancellation '}Error on CalloutsEvolved PayPal!`, // Email subject line
        text: `There was an issue with the PayPal Firebase Functions on the CalloutsEvolved project.
             \n${
               isCanceling
                 ? 'Please resolve this error.'
                 : 'Please cancel this subscription and then resolve this error.'
             },
             \nuserId:${userId}
             \nsubscriptionId:${subscriptionId}
             \nreason:${reason}
             \nerror:${JSON.stringify(data)}`,
      },
    });
}

async function getSubscriptionData(subscriptionId) {
  const response = await axios
    .get(`https://api-m.paypal.com/v1/billing/subscriptions/${subscriptionId}`, {
      auth,
      headers,
    })
    .catch((error) => error.toJSON());

  return response;
}

async function cancelSubscriptionData(subscriptionId, reason) {
  const response = await axios
    .post(
      `https://api-m.paypal.com/v1/billing/subscriptions/${subscriptionId}/cancel`,
      { reason },
      {
        auth,
        headers,
      }
    )
    .catch((error) => error.toJSON());

  return response;
}

exports.getSubscription = functions.https.onCall(async (data, context) => {
  let subscriptionId = data.subscriptionId;
  let subscriptionData;

  if (subscriptionId) {
    subscriptionData = await getSubscriptionData(subscriptionId);
    if (subscriptionData?.data?.id === subscriptionId) {
      await db.ref(`/userData/${context.auth.uid}/subscriptionData`).set(subscriptionData.data);
      return subscriptionData.data;
    }
  }

  await sendEmail(
    context.auth.uid,
    subscriptionId,
    'Unable to get subscription',
    subscriptionData || 'Missing subscriptionId'
  );
  return undefined;
});

exports.cancelSubscription = functions.https.onCall(async (data, context) => {
  let subscriptionId = data.subscriptionId;
  let reason = data.reason || 'service no longer needed';
  let cancellation, subscriptionData;

  if (subscriptionId) {
    cancellation = await cancelSubscriptionData(subscriptionId, reason);
    if (cancellation?.status === 204 || cancellation?.status === 422) {
      subscriptionData = await getSubscriptionData(subscriptionId);
      if (subscriptionData?.data?.id === subscriptionId) {
        await db.ref(`/userData/${context.auth.uid}/subscriptionData`).set(subscriptionData.data);
        return subscriptionData?.data;
      }
    }
  }

  let error = { error: 'Missing subscriptionId' };
  if (cancellation || subscriptionData) {
    error = { cancellation, subscriptionData };
  }

  sendEmail(context.auth.uid, subscriptionId, reason, error);
  return undefined;
});

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
