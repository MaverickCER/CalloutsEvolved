import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase/firebaseClient";
import { useAuth } from "../contexts/AuthContext";
import getStripe from "./initializeStripe";

export const createCheckoutSession = async (setIsLoading) => {
  const { currentUser } = useAuth();
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
          setIsLoading(false);
        }

        if (sessionId) {
          try {
            const stripe = await getStripe();
            stripe.redirectToCheckout({ sessionId });
          } catch (error) {
            console.error(error.message);
            setIsLoading(false);
          }
        }
      });
    } catch (error) {
      setIsLoading(false);
      console.error(error.message);
    }
  } catch (error) {
    setIsLoading(false);
    console.error(error.message);
  }
};
