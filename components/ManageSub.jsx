import { httpsCallable } from 'firebase/functions';

import PayPalButton from './paypal';
import { functions } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

const ManageSub = () => {
  const { currentUser, userData } = useAuth();
  const userIsPremium = Date.parse(userData?.subscriptionData?.next_billing_time || 0) > Date.now();

  return !userIsPremium ? (
    <>
      {currentUser && !currentUser.isAnonymous ? (
        <span className="SubscribeComponent">
          <PayPalButton plan_id='P-68L32667LU016372RMEZF47A' />
        </span>
      ) : (
        <>
          <h3>Donations</h3>
          <p>
            We have a lot of expenses between now and 05/31/2023 and would greatly appreciate
            any assistance you can provide. Your contribution will help us sponsor twitch
            streamers to get the word out, and help us absorb the costs of providing all
            features for free for the first month after release.
          </p>
          <PayPalButton amount={2.99} />
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
        const cancelSubscription = httpsCallable(functions, 'cancelSubscription');
        cancelSubscription({ subscriptionId: data.subscriptionId })
          .then((result) => console.log(result))
          .catch((error) => console.error(error));
      }}>Cancel Subscription</button>
    </span>
  )
};

export default ManageSub;
