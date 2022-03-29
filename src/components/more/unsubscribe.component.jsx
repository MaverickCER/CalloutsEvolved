import React from "react";
import { connect } from "react-redux";
import { auth, firestore } from "../../utils/firebase.util";
import { setOptionsData } from "../../redux/options/options.actions";
import { getOptionsData } from "../../redux/options/options.selectors";
import { Button, Modal } from "react-bootstrap";

const Unsubscribe = (props) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => {
    let token =
      "AZzZJns5CjnuIgWxB6ExeKo73EzpDQgTtskAfUBJMgYq5e242WlxvloneLUvGOi6LBTbGzP1RBnvBBWgAZzZJns5CjnuIgWxB6ExeKo73EzpDQgTtskAfUBJMgYq5e242WlxvloneLUvGOi6LBTbGzP1RBnvBBWg:EIdbuDfcsQ9qa3ymRXqp-UPQBN4BFmsUu_UsUvl85kMz55kF6Yfqz6jpVo3n8xFYi-wKL1fOH4z3hq-4";
    let baseToken = btoa(token);
    fetch(
      "https://api-m.sandbox.paypal.com/v1/billing/subscriptions/I-BW452GLLEP1G/cancel",
      {
        body: { reason: "None" },
        headers: {
          Authorization: `Basic ${baseToken}`,
          "Content-Type": "application/json"
        },
        method: "POST"
      }
    ).then((response) => {
      if (response.status === 204) {
        firestore.doc(`customers/${auth.currentUser.uid}`).set(
          {
            userData: {
              ppi: ""
            }
          },
          { merge: true }
        );
        let data = JSON.parse(JSON.stringify(props.optionsData));
        data.ppi = "";
        props.setOptionsData(data);
      } else {
        setShow(true);
      }
    });
  };
  return (
    <>
      <Button onClick={() => handleClick()}>Unsubscribe</Button>
      <Modal show={show} onHide={() => setShow(!show)} size="lg" centered>
        <Modal.Header>
          <Modal.Title>Failed to Unsubscribe:</Modal.Title>
          <div onClick={() => setShow(!show)}>Close X</div>
        </Modal.Header>
        <Modal.Body>
          <p>
            Our sincere apologies, but there was an error canceling your
            subsciption.
          </p>
          <p>Please contact paypal directly to cancel this subscription: </p>
          <a href="https://www.paypal.com/li/smarthelp/article/how-do-i-cancel-a-recurring-payment,-subscription,-or-automatic-billing-agreement-i-have-with-a-merchant-faq1067">
            Cancel subscription with a merchant
          </a>
          <p>
            If you subscribed as a guest, you will need to call Paypal toll-free
            customer support between 8.00 and 4.30 GMT Monday to Friday:{" "}
          </p>
          <a href="tel:00353 1 436 9111">00353 1 436 9111</a>
          <p>
            Per Paypal, If you are hearing or speech impaired, you need to reach
            out through an IP relay service.
          </p>
          <br />
          <p>You may need your Subscription ID: {props.optionsData.ppi}</p>
          <p>
            Once again, we apologies for the inconvience and hope to handle this
            problem better in the future. Please contact us if further
            information is required so that we can provide it automatically for
            the next user.
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  optionsData: getOptionsData(state)
});

const mapDispatchToProps = (dispatch) => ({
  setOptionsData: (user) => dispatch(setOptionsData(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Unsubscribe);