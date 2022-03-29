import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { auth } from "../../utils/firebase.util";

const Donate = () => {
  const [show, setShow] = React.useState(false);
  const [order, setOrder] = React.useState("");

  return (
    <>
      {show ? (
        <>
          <h3>Thank you!</h3>
          <h5>Order #: {order}</h5>
          <p>
            Your contribution helps reduce operational costs and keep our
            service financially accessible. As a small token of apprechiation,
            your display name has been updated to reflect your generosity.
          </p>
          <p>{auth.currentUser.displayName}</p>
        </>
      ) : (
        <>
          <h3>Donations</h3>
          <p>
            Callouts Evolved participates in thousands of activities around the
            globe in an effort to reduce communication barriers and support
            gamers with disabilities. Please help us remain financially
            accessible by contributing $2.99
          </p>
          <PayPalButton
            amount={2.99}
            shippingPreference="NO_SHIPPING"
            onSuccess={(details, data) => {
              setShow(true);
              setOrder(data.orderID);
              auth.currentUser.updateProfile({
                displayName: `${auth.currentUser.displayName} &#10084;`
              });
            }}
            options={{
              clientId:
                "AZzZJns5CjnuIgWxB6ExeKo73EzpDQgTtskAfUBJMgYq5e242WlxvloneLUvGOi6LBTbGzP1RBnvBBWg"
            }}
          />
        </>
      )}
    </>
  );
};

export default Donate;
