import React, { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { child, get, ref, update } from 'firebase/database';
import { database, firestore } from '../firebase/firebaseClient';
import { getFunctions, httpsCallable } from 'firebase/functions';

import { PayPalButton } from 'react-paypal-button-v2';
import getStripe from '../stripe/initializeStripe';
import { useAuth } from '../context/AuthContext';
import usePremiumStatus from '../stripe/usePremiumStatus';
import { useSettings } from '../context/SettingsContext';

const ManageSub = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [subscription, setSubscription] = useState({});
  const [isSubscriptionLoading, setIsSubscriptionLoading] = useState(false);
  const [show, setShow] = React.useState(false);
  const [order, setOrder] = React.useState('');
  const { currentUser } = useAuth();
  const { theme } = useSettings();
  let addData = [];
  const userIsPremium = usePremiumStatus(currentUser);

  // fetch subscription portal
  const openCustomerPortal = async () => {
    setIsLoading(true);
    const functions = getFunctions();
    const functionRef = httpsCallable(functions, 'ext-firestore-stripe-payments-createPortalLink');
    const { data } = await functionRef({
      returnUrl: window.location.origin,
    });
    if (data.url) {
      window.location.assign(data.url);
    }
    if (data.error) {
      alert(data.error.message);
    }
  };

  // Create a portal for checking out
  const createCheckoutSession = async () => {
    setIsLoading(true);

    let payDoc, payMode, payPrice;

    if (!currentUser) {
      payDoc = Date.now();
      payMode = 'payment';
      payPrice = 'price_1KLfLvJUSFsRcf8hgKsEd6s0';
    } else if (currentUser.isAnonymous) {
      payDoc = currentUser.uid;
      payMode = 'payment';
      payPrice = 'price_1KLfLvJUSFsRcf8hgKsEd6s0';
    } else {
      payDoc = currentUser.uid;
      payMode = 'subscription';
      payPrice = 'price_1KLfFdJUSFsRcf8h6ynw426E';
    }

    const collectionRef = collection(
      firestore,
      'stripe/data/customers',
      payDoc,
      'checkout_sessions'
    );

    try {
      const docRef = await addDoc(collectionRef, {
        cancel_url: window.location.origin,
        mode: payMode,
        price: payPrice,
        success_url: window.location.origin,
      });

      try {
        onSnapshot(docRef, async (snap) => {
          const { error, sessionId, url } = snap.data();
          if (error) {
            console.error(error.message);
            setIsLoading(false);
          }

          if (sessionId) {
            try {
              const stripe = await getStripe();
              stripe.redirectToCheckout({ sessionId });
            } catch (error) {
              setIsLoading(false);
              alert(error.message);
            }
          }
        });
      } catch (error) {
        setIsLoading(false);
        alert(error.message);
      }
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
    }
  };

  useEffect(() => {
    // fetch subscription data
    const fetchSubscription = async () => {
      setIsSubscriptionLoading(true);
      const subsRef = collection(
        firestore,
        `stripe/data/customers/${currentUser.uid}/subscriptions`
      );
      const subsQuery = query(
        subsRef,
        where('status', 'in', ['trialing', 'active', 'past_due', 'unpaid'])
      );

      try {
        const subscriptionData = async () =>
          await getDocs(subsQuery).then((sub) => {
            let data = null;
            if (sub.docs.length > 0) {
              data = sub.docs[0].data();
            }
            return data;
          });

        setSubscription(await subscriptionData());
        setIsSubscriptionLoading(false);
      } catch (error) {
        console.log('error: ', error);
        setSubscription(null);
        setIsSubscriptionLoading(false);
      }
    };

    if (currentUser) {
      if (!currentUser.isAnonymous) {
        if (userIsPremium) {
          fetchSubscription();
        }
      }
    }
  }, [currentUser, userIsPremium]);

  return (
    <>
      {!userIsPremium ? (
        <>
          {currentUser && !currentUser.isAnonymous ? (
            <span className="SubscribeComponent">
              <button
                onClick={() => {
                  createCheckoutSession(setIsLoading);
                }}>
                {isLoading ? 'Loading...' : 'Subscribe'}
              </button>
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
                              setOrder(data.orderID);
                              setShow(true);
                            });
                          }
                        }
                      }
                    );
                  } else {
                    setOrder(data.orderID);
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
          {isSubscriptionLoading ? (
            <>
              <p>Loading Subscription Data</p>
              <button disabled>Loading...</button>
            </>
          ) : (
            <>
              {subscription?.cancel_at_period_end ? (
                <p>
                  Your subscription will automatically end{' '}
                  {new Date(subscription?.current_period_end?.seconds * 1000).toLocaleString()} and
                  you will NOT be billed again.
                </p>
              ) : (
                <p>
                  Next payment:{' '}
                  {new Date(subscription?.current_period_end?.seconds * 1000).toDateString()}
                </p>
              )}
              {isLoading ? (
                <button disabled>Redirecting...</button>
              ) : (
                <button onClick={openCustomerPortal}>Manage Subscription</button>
              )}
            </>
          )}
        </span>
      )}
    </>
  );
};

export default ManageSub;
