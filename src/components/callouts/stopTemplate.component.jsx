import React from "react";
import { connect } from "react-redux";
import { getSocialSess } from "../../redux/social/social.selectors";
import { getOptionsData } from "../../redux/options/options.selectors";
import { Button } from "react-bootstrap";
import { auth, firestore } from "../../utils/firebase.util";

const run = true;

const StopTemplate = (props) => {
  React.useEffect(() => {
    firestore
      .collection(
        `customers/${props.btn.uid}/saveData/saveData${props.btn.dur}/btnData`
      )
      .get()
      .then((tempBTNData) => {
        if (!tempBTNData.empty) {
          if (
            props.socialSess.toLowerCase() === "solo" ||
            props.socialSess === auth.currentUser.uid
          ) {
            tempBTNData.forEach((btn) => {
              firestore
                .doc(
                  `customers/${auth.currentUser.uid}/btnData/${btn.data().bid}`
                )
                .set(btn.data(), { merge: true });
            });
          } else {
            tempBTNData.forEach((btn) => {
              firestore
                .doc(`sessions/${props.socialSess}/btnData/${btn.data().bid}`)
                .set(btn.data(), { merge: true });
            });
          }
        } else {
          setTimeout(() => stopTemplate(props.btn), 3000);
        }
      });
  }, [run]);

  const stopTemplate = async (btn) => {
    var owner = await firestore
      .doc(`customers/${auth.currentUser.uid}/btnData/${btn.bid}`)
      .get();
    if (auth.currentUser.uid === owner.data().uid) {
      if (
        props.socialSess.toLowerCase() === "solo" ||
        props.socialSess === auth.currentUser.uid
      ) {
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
      } else {
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
        stopTemplate(props.btn);
      }}
      className="active"
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
      data-cdt={`stop${props.btn.cdt}`}>
        Processing saveData{props.btn.dur} from {props.btn.udn}
      </span>
    </Button>
  );
};

const mapStateToProps = (state) => ({
  optionsData: getOptionsData(state),
  socialSess: getSocialSess(state)
});

export default connect(mapStateToProps, null)(StopTemplate);
