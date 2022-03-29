import { Stripe, loadStripe } from "@stripe/stripe-js";

let initializeStripe = async () => {
  let isStripePromise;
  if (!isStripePromise) {
    isStripePromise = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
  }
  return isStripePromise;
};

export default initializeStripe;
