import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBitD-gDNoabPG9iqsFmZ7s3wEHA2Lk8lo",
  authDomain: "testingcallouts2.firebaseapp.com",
  projectId: "testingcallouts2",
  storageBucket: "testingcallouts2.appspot.com",
  messagingSenderId: "478188268826",
  appId: "1:478188268826:web:3687c7a06e39c4442f50a3"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
} else {
  firebase.app();
}

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const eap = firebase.auth.EmailAuthProvider;

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // Get a reference to the place in the database where the user is stored
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error("error creating user", error.message);
    }
  }

  return getUserDocumentRef(userAuth.uid);
};

export const getUserDocumentRef = async (uid) => {
  if (!uid) return null;

  try {
    return firestore.doc(`users/${uid}`);
  } catch (error) {
    console.error("error fetching user", error.message);
  }
};

export default firebase;
