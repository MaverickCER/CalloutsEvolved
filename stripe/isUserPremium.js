import { auth } from "../firebase/firebaseClient";

export default async function isUserPremium() {
  try {
    await auth.currentUser?.getIdToken(true);
    const decodedToken = await auth.currentUser?.getIdTokenResult();
    return decodedToken?.claims?.stripeRole ? true : false;
  } catch (error) {
    console.error(error.message);
  }
}
