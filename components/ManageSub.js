import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import usePremiumStatus from "../stripe/usePremiumStatus";
import { firestore } from "../firebase/firebaseClient";
import { getFunctions, httpsCallable } from "firebase/functions";
import {
  collection,
  getDocs,
  where,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { query } from "firebase/database";
import getStripe from "../stripe/initializeStripe";

const ManageSub = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [subscription, setSubscription] = useState({});
  const [isSubscriptionLoading, setIsSubscriptionLoading] = useState(false);
  const [mode, setMode] = useState(null);
  const { currentUser } = useAuth();
  let addData = [];
  const userIsPremium = usePremiumStatus(currentUser);

  // fetch subscription data
  const fetchSubscription = async () => {
    setIsSubscriptionLoading(true);
    const db = firestore;
    const subsRef = collection(
      db,
      `stripe/data/customers/${currentUser.uid}/subscriptions`
    );
    const subsQuery = query(
      subsRef,
      where("status", "in", ["trialing", "active", "past_due", "unpaid"])
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
      console.log("error: ", error);
      setSubscription(null);
      setIsSubscriptionLoading(false);
    }
  };

  // fetch subscription portal
  const openCustomerPortal = async () => {
    setIsLoading(true);
    const functions = getFunctions();
    const functionRef = httpsCallable(
      functions,
      "ext-firestore-stripe-payments-createPortalLink"
    );
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
      payMode = "payment";
      payPrice = "price_1KLfLvJUSFsRcf8hgKsEd6s0";
    } else if (currentUser.isAnonymous) {
      payDoc = currentUser.uid;
      payMode = "payment";
      payPrice = "price_1KLfLvJUSFsRcf8hgKsEd6s0";
    } else {
      payDoc = currentUser.uid;
      payMode = "subscription";
      payPrice = "price_1KLfFdJUSFsRcf8h6ynw426E";
    }

    const collectionRef = collection(
      firestore,
      "stripe/data/customers",
      payDoc,
      "checkout_sessions"
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
            alert(error.message);
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
    if (userIsPremium) {
      fetchSubscription();
    }
  }, [currentUser, userIsPremium]);

  return (
    <>
      {!userIsPremium ? (
        <div className="SubscribeComponent">
          <button
            onClick={() => {
              createCheckoutSession(setIsLoading);
            }}
          >
            {isLoading
              ? "Loading..."
              : !currentUser || currentUser.isAnonymous
              ? "Donate"
              : "Subscribe"}
          </button>
        </div>
      ) : (
        <div className="SubscribedAccountComponent">
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
                  Your subscription will automatically end{" "}
                  {new Date(
                    subscription?.current_period_end?.seconds * 1000
                  ).toLocaleString()}{" "}
                  and you will NOT be billed again.
                </p>
              ) : (
                <p>
                  Next payment:{" "}
                  {new Date(
                    subscription?.current_period_end?.seconds * 1000
                  ).toDateString()}
                </p>
              )}
              {isLoading ? (
                <button disabled>Redirecting...</button>
              ) : (
                <button onClick={openCustomerPortal}>
                  Manage Subscription
                </button>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ManageSub;
