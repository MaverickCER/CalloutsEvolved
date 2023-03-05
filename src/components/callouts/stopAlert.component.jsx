import React from "react";
import { connect } from "react-redux";
import { getSocialSess } from "../../redux/social/social.selectors";
import { getOptionsData } from "../../redux/options/options.selectors";
import { Button } from "react-bootstrap";
import { auth, firestore } from "../../utils/firebase.util";
import { useSpeechSynthesis } from "../audio/audio.component";

const run = true;

const StopAlert = (props) => {
  const [, speak] = useSpeechSynthesis();

  React.useEffect(() => {
    if (props.optionsData.tsg && props.optionsData.tsl !== "Disabled") {
      speak(props.optionsData, props.btn.cal, props.optionsData.tsr);
    }
    var delta = props.btn.dur * 1000 + props.btn.utc - Date.now();
    setTimeout(() => stopAlert(props.btn), delta);
  }, [run]);

  const stopAlert = async (btn) => {
    if (
      props.socialSess.toLowerCase() === "solo" ||
      props.socialSess === auth.currentUser.uid
    ) {
      let owner = await firestore
        .doc(`customers/${auth.currentUser.uid}/btnData/${btn.bid}`)
        .get();
      if (!owner.empty) {
        if (auth.currentUser.uid === owner.data().uid) {
          firestore
            .doc(`customers/${auth.currentUser.uid}/btnData/${btn.bid}`)
            .set(
              {
                udn: "",
                uid: "",
                utc: 0,
              },
              { merge: true }
            );
        }
      }
    } else {
      let owner = await firestore
        .doc(`sessions/${props.socialSess}/btnData/${btn.bid}`)
        .get();
      if (auth.currentUser.uid === owner.data().uid) {
        firestore.doc(`sessions/${props.socialSess}/btnData/${btn.bid}`).set(
          {
            udn: "",
            uid: "",
            utc: 0,
          },
          { merge: true }
        );
      }
    }
  };

  return (
    <Button
      key={props.btn.bid}
      variant={props.btn.col}
      onClick={() => {
        stopAlert(props.btn);
      }}
      className="active"
      type="button"
      data-cdt={`stop${props.btn.cdt}`}
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
      <span className={props.btn.bid} data-cdt={`stop${props.btn.cdt}`}>
        {props.btn.cal}
      </span>
    </Button>
  );
};

const mapStateToProps = (state) => ({
  optionsData: getOptionsData(state),
  socialSess: getSocialSess(state),
});

export default connect(mapStateToProps, null)(StopAlert);
