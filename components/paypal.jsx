import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { child, get, ref, update } from 'firebase/database';
import { httpsCallable } from 'firebase/functions';
import { useState } from 'react';

import { database, functions } from '../lib/firebase';
import { useSettings } from '../context/SettingsContext';

export default function PayPalButton(props) {
  const { theme } = useSettings();
  const [show, setShow] = useState(false);

  return (
    <PayPalScriptProvider
      options={{
        'client-id': 'AZzZJns5CjnuIgWxB6ExeKo73EzpDQgTtskAfUBJMgYq5e242WlxvloneLUvGOi6LBTbGzP1RBnvBBWg',
        components: 'buttons',
        'data-namespace': !props.plan_id ? 'paypalOrder' : undefined,
        intent: props.plan_id ? 'subscription' : undefined,
        vault: props.plan_id ? true : undefined,
      }}>
      {props.plan_id ? (
        <PayPalButtons
          createSubscription={(data, actions) => {
            return actions.subscription.create({
              plan_id: props.plan_id,
              application_context: {
                shipping_preference: 'NO_SHIPPING',
              },
            });
          }}
          onApprove={(data, actions) => {
            const updateSubscription = httpsCallable(functions, 'updateSubscription');
            updateSubscription({ subscriptionId: data.subscriptionId })
              .then((result) => {
                console.log(result);
                setShow(true);
              })
              .catch((error) => console.error(error));
            if (currentUser) {
              get(child(ref(database), `userData/${currentUser.uid}`)).then((DataSnapshot) => {
                if (DataSnapshot.exists()) {
                  if (DataSnapshot.data() && DataSnapshot.data() !== '') {
                    let updates = {};
                    updates[`userData/${currentUser.uid}/title`] = 'MVP';
                    updates[
                      `sessionLists/${DataSnapshot.data().sessionId}/whitelist/${currentUser.uid}`
                    ] = 'MVP';
                    update(ref(database), updates);
                  }
                }
              });
            }
            setShow(true);
          }}
          style={{
            color: theme.mod === 'light' ? 'white' : 'black',
            label: 'subscribe',
          }}
        />
      ) : (
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: 'USD',
                    value: props.amount.toString() || '2.99',
                  },
                },
              ],
              application_context: {
                shipping_preference: 'NO_SHIPPING',
              },
            });
          }}
          onApprove={() => {
            let amount = props.amount ? parseFloat(props.amount) : 2.99;
            let val = ((amount - (amount * 0.049 + amount * 0.3) - 0.59) * 50000).toString();
            let index = val.indexOf('.');
            let characters = parseInt(val.slice(0, index < 0 ? 0 : index));
            if (currentUser) {
              get(child(ref(database), `userData/${currentUser.uid}`)).then((DataSnapshot) => {
                if (DataSnapshot.exists()) {
                  if (DataSnapshot.data() && DataSnapshot.data() !== '') {
                    let updates = {};
                    updates[`userData/${currentUser.uid}/title`] = 'Donator';
                    updates[`userData/${currentUser.uid}/characters`] = characters;
                    updates[
                      `sessionLists/${DataSnapshot.data().sessionId}/whitelist/${currentUser.uid}`
                    ] = 'Donator';
                    update(ref(database), updates);
                  }
                }
              });
            }
            setShow(true);
          }}
          style={{
            color: theme.mod === 'light' ? 'white' : 'black',
            label: 'Donate',
          }}
        />
      )}
      {show && <p>Thank you for your support! Your account will be updated shortly.</p>}
    </PayPalScriptProvider>
  );
}
