import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";
import { auth, firestore } from "../../utils/firebase.util";
import { getSocialSess } from "../../redux/social/social.selectors";
import { getOptionsData } from "../../redux/options/options.selectors";
import useToggle from "../../utils/usetoggle.util";

const STTInput = (props) => {
  const [isMute, setIsMute] = useToggle(true);
  const [commands, setCommands] = React.useState([
    {
      command: `hello world`,
      callback: () => alert("hello!")
    }
  ]);
  const { transcript } = useSpeechRecognition({ commands });
  const sendData = (btn) => {
    if (
      props.socialSess.toLowerCase() === "solo" ||
      props.socialSess === auth.currentUser.uid
    ) {
      firestore.doc(`customers/${auth.currentUser.uid}/btnData/${btn}`).set(
        {
          udn: auth.currentUser.displayName,
          uid: auth.currentUser.uid,
          utc: Date.now()
        },
        { merge: true }
      );
    } else {
      firestore.doc(`sessions/${props.socialSess}/btnData/${btn}`).set(
        {
          udn: auth.currentUser.displayName,
          uid: auth.currentUser.uid,
          utc: Date.now()
        },
        { merge: true }
      );
    }
  };

  const handleClick = (event) => {
    if (isMute) {
      SpeechRecognition.startListening({
        continuous: true,
        language: props.optionsData.stl
      });
      setIsMute(false);
    } else {
      SpeechRecognition.stopListening();
      setIsMute(true);
    }
  };

  React.useEffect(() => {
    if (isMute) {
      if (
        props.socialSess.toLowerCase() === "solo" ||
        props.socialSess === auth.currentUser.uid
      ) {
        firestore
          .doc(
            `customers/${auth.currentUser.uid}/sttData/${auth.currentUser.uid}`
          )
          .set(
            {
              cid: auth.currentUser.displayName,
              msg: "Muted...",
              ucc: props.optionsData.ucc,
              uid: auth.currentUser.uid
            },
            { merge: true }
          );
      } else {
        firestore
          .doc(`sessions/${props.socialSess}/sttData/${auth.currentUser.uid}`)
          .set(
            {
              cid: auth.currentUser.displayName,
              msg: "Muted...",
              ucc: props.optionsData.ucc,
              uid: auth.currentUser.uid
            },
            { merge: true }
          );
      }
    } else {
      if (
        props.socialSess.toLowerCase() === "solo" ||
        props.socialSess === auth.currentUser.uid
      ) {
        firestore
          .doc(
            `customers/${auth.currentUser.uid}/sttData/${auth.currentUser.uid}`
          )
          .set(
            {
              cid: auth.currentUser.displayName,
              msg: transcript.slice(-53),
              ucc: props.optionsData.ucc,
              uid: auth.currentUser.uid
            },
            { merge: true }
          );
      } else {
        firestore
          .doc(`sessions/${props.socialSess}/sttData/${auth.currentUser.uid}`)
          .set(
            {
              cid: auth.currentUser.displayName,
              msg: transcript.slice(-53),
              ucc: props.optionsData.ucc,
              uid: auth.currentUser.uid
            },
            { merge: true }
          );
      }
    }
  }, [props.socialSess, transcript, isMute]);

  React.useEffect(() => {
    const getCommands = () => {
      if (
        props.socialSess.toLowerCase() === "solo" ||
        props.socialSess === auth.currentUser.uid
      ) {
        return firestore
          .collection(`customers/${auth.currentUser.uid}/btnData`)
          .onSnapshot((docSnapshot) => {
            const arr0 = [];
            docSnapshot.forEach((btn) => {
              var data = {
                command: `${btn.data().cal}`,
                callback: () => sendData(btn.data().bid)
              };
              arr0.push(data);
            });
            setCommands(arr0);
          });
      } else {
        return firestore
          .collection(`sessions/${props.socialSess}/btnData`)
          .onSnapshot((docSnapshot) => {
            const arr1 = [];
            docSnapshot.forEach((btn) => {
              var data = {
                command: `${btn.data().cal}`,
                callback: () => sendData(btn.data().bid)
              };
              arr1.push(data);
            });
            setCommands(arr1);
          });
      }
    };
    let unsubscribe = getCommands();
    return unsubscribe;
  }, [props.socialSess]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <Button onClick={handleClick} size="sm" variant={isMute ? "accent" : "danger"}>
      {isMute ? "Start Speech Recognition" : "Stop Speech Recognition"}
    </Button>
  );
};

const mapStateToProps = (state) => ({
  optionsData: getOptionsData(state),
  socialSess: getSocialSess(state)
});

export default connect(mapStateToProps, null)(STTInput);
