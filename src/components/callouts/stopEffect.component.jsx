import React from "react";
import { connect } from "react-redux";
import { getSocialSess } from "../../redux/social/social.selectors";
import { getOptionsData } from "../../redux/options/options.selectors";
import { Button } from "react-bootstrap";
import Effect from "../audio/effect.component";
import { auth, firestore } from "../../utils/firebase.util";

const run = true;

const StopEffect = (props) => {
  const [isValid, setIsValid] = React.useState(true);

  React.useEffect(() => {
    if (/^(ht|f)tp(s?)\:\/\/[0-9A-Za-z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)\.(mp3)$/.test(props.btn.cal)) {
      try {
        new URL(props.btn.cal);
      } catch (e) {
        setIsValid(false);
      }
    } else {
      setIsValid(false);
    }
    var delta = props.btn.dur * 1000 + props.btn.utc - Date.now() + 1;
    setTimeout(() => stopEffect(props.btn), delta);
  }, [run]);

  const stopEffect = async (btn) => {
    if (
      props.socialSess.toLowerCase() === "solo" ||
      props.socialSess === auth.currentUser.uid
    ) {
      var owner0 = await firestore
        .doc(`customers/${auth.currentUser.uid}/btnData/${btn.bid}`)
        .get();
      if (auth.currentUser.uid === owner0.data().uid) {
        firestore
          .doc(`customers/${auth.currentUser.uid}/btnData/${btn.bid}`)
          .set(
            {
              udn: "",
              uid: "",
              utc: 0
            },
            { merge: true }
          );
      }
    } else {
      var owner1 = await firestore
        .doc(`sessions/${props.socialSess}/btnData/${btn.bid}`)
        .get();
      if (auth.currentUser.uid === owner1.data().uid) {
        firestore.doc(`sessions/${props.socialSess}/btnData/${btn.bid}`).set(
          {
            udn: "",
            uid: "",
            utc: 0
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
        stopEffect(props.btn);
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
      {isValid ? (
        <>
          <span className={props.btn.bid}
      data-cdt={`stop${props.btn.cdt}`}>Playing {props.btn.cal.replace(/\/$/, "").split('/').pop()}</span>
          <Effect source={props.btn.cal} volume={props.optionsData.tsv * 100} />
        </>
      ) : (
        <span>Invalid URL... https://.../sound.mp3</span>
      )}
    </Button>
  );
};

const mapStateToProps = (state) => ({
  optionsData: getOptionsData(state),
  socialSess: getSocialSess(state)
});

export default connect(mapStateToProps, null)(StopEffect);
