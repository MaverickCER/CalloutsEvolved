import React from "react";
import { connect } from "react-redux";
import { getSocialSess } from "../../redux/social/social.selectors";
import { getOptionsData } from "../../redux/options/options.selectors";
import { Button } from "react-bootstrap";
import { auth, firestore } from "../../utils/firebase.util";

const SendBTN = (props) => {
  const sendData = (btn) => {
    if (
      props.socialSess.toLowerCase() === "solo" ||
      props.socialSess === auth.currentUser.uid
    ) {
      firestore.doc(`customers/${auth.currentUser.uid}/btnData/${btn.bid}`).set(
        {
          udn: auth.currentUser.displayName,
          uid: auth.currentUser.uid,
          utc: Date.now()
        },
        { merge: true }
      );
    } else {
      firestore.doc(`sessions/${props.socialSess}/btnData/${btn.bid}`).set(
        {
          udn: auth.currentUser.displayName,
          uid: auth.currentUser.uid,
          utc: Date.now()
        },
        { merge: true }
      );
    }
  };

  return (
    <Button
      key={props.btn.bid}
      variant={props.btn.col}
      onClick={() => {
        sendData(props.btn);
      }}
      className={props.btn.bid === "btnDataA" ? "disabled" : null}
      type="button"
    >
      <span>
        {props.optionsData.shc === "touch"
          ? props.btn.ntp
          : props.optionsData.shc === "numberpad"
          ? props.btn.nnp
          : props.btn.nkb}
        : {props.btn.udn}
        <hr />
      </span>
      <span className={props.btn.bid}
      data-cdt={props.btn.cdt}
      data-dur={props.btn.dur}>{props.btn.cdt === "effect" ? props.btn.cal.replace(/\/$/, "").split('/').pop() : props.btn.cal}</span>
    </Button>
  );
};

const mapStateToProps = (state) => ({
  optionsData: getOptionsData(state),
  socialSess: getSocialSess(state)
});

export default connect(mapStateToProps, null)(SendBTN);
