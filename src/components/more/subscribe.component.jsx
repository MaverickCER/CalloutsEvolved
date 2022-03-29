import React from "react";
import { connect } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import { auth, firestore } from "../../utils/firebase.util";
import { setOptionsData } from "../../redux/options/options.actions";
import { getOptionsData } from "../../redux/options/options.selectors";

const Subscribe = (props) => {
  return (
    <div>Coming Soon!</div>
    // <PayPalButton
    //   createSubscription={(data, actions) => {
    //     return actions.subscription.create({
    //       plan_id: "P-68L32667LU016372RMEZF47A",
    //       auto_renewal: true
    //     });
    //   }}
    //   onApprove={(data, actions) => {
    //     console.log(data);
    //     firestore.doc(`customers/${auth.currentUser.uid}`).set(
    //       {
    //         userData: {
    //           ppi: data.subscriptionID
    //         }
    //       },
    //       { merge: true }
    //     );
    //     let options = JSON.parse(JSON.stringify(props.optionsData));
    //     options.ppi = "";
    //     props.setOptionsData(options);
    //   }}
    //   options={{
    //     clientId:
    //       "AZzZJns5CjnuIgWxB6ExeKo73EzpDQgTtskAfUBJMgYq5e242WlxvloneLUvGOi6LBTbGzP1RBnvBBWg",
    //     vault: true
    //   }}
    // />
  );
};

const mapStateToProps = (state) => ({
  optionsData: getOptionsData(state)
});

const mapDispatchToProps = (dispatch) => ({
  setOptionsData: (user) => dispatch(setOptionsData(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe);