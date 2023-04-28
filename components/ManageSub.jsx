import React, { useEffect, useRef, useState } from 'react';
import { addDoc, collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { child, get, ref, update } from 'firebase/database';
import { database, firestore } from '../firebase/firebaseClient';
import { getFunctions, httpsCallable } from 'firebase/functions';

import { PayPalButton } from './paypal';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

const ManageSub = () => {
  const { currentUser, userData } = useAuth();
  const { theme } = useSettings();
  const [show, setShow] = useState(false);
  let addData = [];
  const userIsPremium = Date.parse(userData?.subscriptionData?.next_billing_time || 0) > Date.now();

  return !userIsPremium ? (
    <>
      {currentUser && !currentUser.isAnonymous ? (
        <span className="SubscribeComponent">
          <PayPalButton
            createSubscription={(data, actions) => {
              return actions.subscription.create({
                plan_id: 'P-68L32667LU016372RMEZF47A'
              });
            }}
            onApprove={(data, actions) => {

              axios.get(`https://us-central1-calloutsevolved.cloudfunctions.net/api/subscription/${data.subscriptionId}`);
            }}
          />
        </span>
      ) : show ? (
        <>
          <h3>Thank you!</h3>
          <p>
            Please note that this donation will appear in your bank as follows:
            <br />
            PAYPAL *MAVERICK {new Date().getFullYear()}
          </p>
        </>
      ) : (
        <>
          <h3>Donations</h3>
          <p>
            We have a lot of expenses between now and 05/31/2023 and would greatly appreciate
            any assistance you can provide. Your contribution will help us sponsor twitch
            streamers to get the word out, and help us absorb the costs of providing all
            features for free for the first month after release.
          </p>
          <PayPalButton
            amount={2.99}
            shippingPreference="NO_SHIPPING"
            style={{ color: theme.mod === 'light' ? 'white' : 'black' }}
            onApprove={async (details, data) => {
              let updates = {};
              if (currentUser) {
                get(child(ref(database), `userData/${currentUser.uid}/sessionId`)).then(
                  (DataSnapshot) => {
                    if (DataSnapshot.exists()) {
                      if (DataSnapshot.val() && DataSnapshot.val() !== '') {
                        updates[`userData/${currentUser.uid}/title`] = 'Donator';
                        updates[
                          `sessionLists/${DataSnapshot.val()}/whitelist/${currentUser.uid}`
                        ] = 'Donator';
                        update(ref(database), updates).then(() => {
                          setShow(true);
                        });
                      }
                    }
                  }
                );
              } else {
                setShow(true);
              }
            }}
            options={{
              clientId:
                'AZzZJns5CjnuIgWxB6ExeKo73EzpDQgTtskAfUBJMgYq5e242WlxvloneLUvGOi6LBTbGzP1RBnvBBWg',
              disableFunding: 'credit',
              enableFunding: 'venmo',
            }}
          />
        </>
      )}
    </>
  ) : (
    <span className="SubscribedAccountComponent">
      <h2>Subscribed Account</h2>
      {userData.subscriptionData?.status === 'CANCELLED' ? (
        <p>
          Your subscription will automatically end{' '}
          {new Date(userData?.subscriptionData?.next_billing_time || 0).toLocaleString()} and
          you will NOT be billed again.
        </p>
      ) : (
        <p>
          Next payment:{' '}
          {new Date(userData?.subscription?.next_billing_time || 0).toLocaleDateString()}
        </p>
      )}
      <button onClick={() => {

      }}>Cancel Subscription</button>
    </span>
  )
};

export default ManageSub;
