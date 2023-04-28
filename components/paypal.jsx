import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const PayPalButton = (props) => {
  const [isSdkReady, setIsSdkReady] = useState(false);

  const addPaypalSdk = () => {
    const queryParams = [];

    let options = props.options;
    options.clientId = options.clientId || process.env.NEXT_PRIVATE_PAYPAL_CLIENT_ID || "sb"
    Object.keys(options).forEach((k) => {
      const name = k
        .split(/(?=[A-Z])/)
        .join('-')
        .toLowerCase();
      queryParams.push(`${name}=${options[k]}`);
    });

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?${queryParams.join('&')}`;
    script.async = true;
    script.onload = () => {
      setIsSdkReady(true);

      if (props.onButtonReady) {
        props.onButtonReady();
      }
    };
    script.onerror = () => {
      throw new Error('Paypal SDK could not be loaded.');
    };

    document.body.appendChild(script);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window !== undefined && window.paypal === undefined) {
      addPaypalSdk();
    } else if (
      typeof window !== 'undefined' &&
      window !== undefined &&
      window.paypal !== undefined &&
      props.onButtonReady
    ) {
      props.onButtonReady();
    }
  }, []);

  const createOrder = (data, actions) => {
    if (props.amount !== undefined) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: props.amount.toString(),
            },
          },
        ],
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      });
    }
  };

  const onApprove = (data, actions) => {
    return actions.order
      .capture()
      .then((details) => {
        if (props.onSuccess !== undefined) {
          return props.onSuccess(details, data);
        }
      })
      .catch((err) => {
        if (props.catchError) {
          return props.catchError(err);
        }
        console.error(err);
      });
  };

  const createOrderFn = (data, actions) => {
    if (props.createOrder !== undefined) {
      return props.createOrder(data, actions);
    }
    return createOrder(data, actions);
  }

  const Button = window.paypal.Buttons.driver('react', {
    React,
    ReactDOM,
  });

  return !isSdkReady && (typeof window === 'undefined' || window.paypal === undefined) ? null : (
    <Button
      {...props}
      createOrder={
        props.createSubscription || props.createBillingAgreement ? undefined : createOrderFn
      }
      createSubscription={props.createSubscription}
      createBillingAgreement={props.createBillingAgreement}
      onApprove={(data, actions) => {
        if (props.onSuccess) {
          return onApprove(data, actions);
        }
        if (props.onApprove !== undefined) {
          return props.onApprove(data, actions)
        }
      }}
    />
  );
};

export default PayPalButton;

/**
 * Example Single Time Purchase
<PayPalButton
  amount="0.01"
  onSuccess={(details, data) => {
    // update firebase real-time database userData with the corresponding purchase
  }}
/>
 * Example Subsction Purchase
<PayPalButton
  createSubscription={(data, actions) => {
    return actions.subscription.create({
      plan_id: 'P-XXXXXXXXXXXXXXXXXXXXXXXX' // exchange for the proper plan_id
    });
  }}
  onApprove={(data, actions) => {
    return actions.subscription.get().then(function(details) {
      console.error(data.subscriptionID);
    });
  }}
/>
 */