import React, { useState } from "react";
import { connect } from "react-redux";
import {
  getSocialHist,
  getSocialSess
} from "../../redux/social/social.selectors";
import { setSocialHist } from "../../redux/social/social.actions";
import { getOptionsData } from "../../redux/options/options.selectors";
import { Button } from "react-bootstrap";
import SendBTN from "./sendBTN.component";
import { auth, firestore } from "../../utils/firebase.util";
import { useSpeechSynthesis } from "../audio/audio.component";

const StopTimer = (props) => {
  const [loops, setLoops] = useState(1);
  const [, speak] = useSpeechSynthesis();

  var first = Date.now() - props.btn.utc;
  React.useEffect(() => {
    let number = Math.floor(
      (props.btn.dur * 1000 + props.btn.utc - Date.now()) / 1000
    );
    if (first < 500) {
      setLoops(number);
      if (props.optionsData.tsg && props.optionsData.tsl !== "Disabled") {
        speak(props.optionsData, props.btn.cal, 1.8);
      }
    } else {
      setLoops(number);
      if (number < 11) {
        if (props.optionsData.tsg && props.optionsData.tsl !== "Disabled") {
          speak(props.optionsData, number, 1.8);
        }
      }
    }
    setTimeout(() => loopTimer(props.btn), 900);
    let socHist = JSON.parse(JSON.stringify(props.socialHist));
    var obj = JSON.parse(
      `{"col":"${props.btn.col}","cal":"${props.btn.cal}","udn":"${props.btn.udn}"}`
    );
    socHist.push(obj);
    if (socHist.length > 12) {
      let socHist2 = socHist.slice(socHist.length - 5);
      props.setSocialHist(socHist2);
    } else {
      props.setSocialHist(socHist);
    }
  }, [props.btn.col]);

  const loopTimer = async (btn) => {
    let owner;
    if (
      props.socialSess.toLowerCase() === "solo" ||
      props.socialSess === auth.currentUser.uid
    ) {
      owner = await firestore
        .doc(`customers/${auth.currentUser.uid}/btnData/${btn.bid}`)
        .get();
    } else {
      owner = await firestore
        .doc(`sessions/${props.socialSess}/btnData/${btn.bid}`)
        .get();
    }
    if (auth.currentUser.uid === owner.data().uid) {
      if (
        props.socialSess.toLowerCase() === "solo" ||
        props.socialSess === auth.currentUser.uid
      ) {
        if (Math.round((btn.dur * 1000 + btn.utc - Date.now()) / 1000) >= 1) {
          firestore
            .doc(`customers/${auth.currentUser.uid}/btnData/${btn.bid}`)
            .set(
              {
                col: Date.now(),
                udn: auth.currentUser.displayName,
                uid: auth.currentUser.uid
              },
              { merge: true }
            );
        } else {
          firestore
            .doc(`customers/${auth.currentUser.uid}/btnData/${btn.bid}`)
            .set(
              {
                col: "primary",
                udn: "",
                uid: "",
                utc: 0
              },
              { merge: true }
            );
        }
      } else {
        if (Math.round((btn.dur * 1000 + btn.utc - Date.now()) / 1000) >= 0) {
          firestore.doc(`sessions/${props.socialSess}/btnData/${btn.bid}`).set(
            {
              col: Date.now(),
              udn: auth.currentUser.displayName,
              uid: auth.currentUser.uid
            },
            { merge: true }
          );
        } else {
          firestore.doc(`sessions/${props.socialSess}/btnData/${btn.bid}`).set(
            {
              col: "primary",
              udn: "",
              uid: "",
              utc: 0
            },
            { merge: true }
          );
        }
      }
    }
  };

  const resetTimer = async (btn) => {
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
              col: "primary",
              udn: "",
              uid: "",
              utc: 0
            },
            { merge: true }
          );
      } else {
        firestore.doc(`sessions/${props.socialSess}/btnData/${btn.bid}`).set(
          {
            col: "primary",
            udn: "",
            uid: "",
            utc: 0
          },
          { merge: true }
        );
      }
    }
  };

  if (first < 1000) {
    return (
      <Button
        key={props.btn.bid}
        variant="secondary"
        onClick={() => resetTimer(props.btn)}
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
        <span className={props.btn.bid}
      data-cdt={`stop${props.btn.cdt}`}
      data-dur={props.btn.dur}>{props.btn.cal}</span>
      </Button>
    );
  } else if (loops > 9) {
    return (
      <Button
        key={props.btn.bid}
        variant="primary"
        onClick={() => resetTimer(props.btn)}
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
      data-cdt={`stop${props.btn.cdt}`}
      data-dur={props.btn.dur}>{loops}</span>
      </Button>
    );
  } else if (loops > 6) {
    return (
      <Button
        key={props.btn.bid}
        variant="success"
        onClick={() => resetTimer(props.btn)}
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
      data-cdt={`stop${props.btn.cdt}`}
      data-dur={props.btn.dur}>{loops}</span>
      </Button>
    );
  } else if (loops > 3) {
    return (
      <Button
        key={props.btn.bid}
        variant="warning"
        onClick={() => resetTimer(props.btn)}
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
      data-cdt={`stop${props.btn.cdt}`}
      data-dur={props.btn.dur}>{loops}</span>
      </Button>
    );
  } else if (loops >= 0) {
    return (
      <Button
        key={props.btn.bid}
        variant="danger"
        onClick={() => resetTimer(props.btn)}
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
      data-cdt={`stop${props.btn.cdt}`}
      data-dur={props.btn.dur}>{loops}</span>
      </Button>
    );
  } else {
    return <SendBTN btn={props.btn} key={props.btn.bid} />;
  }
};

const mapStateToProps = (state) => ({
  optionsData: getOptionsData(state),
  socialHist: getSocialHist(state),
  socialSess: getSocialSess(state)
});

const mapDispatchToProps = (dispatch) => ({
  setSocialHist: (data) => dispatch(setSocialHist(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(StopTimer);
