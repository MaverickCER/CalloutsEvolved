import React from "react";
import { connect } from "react-redux";
import { Form, Button, InputGroup } from "react-bootstrap";
import { getSocialSess } from "../../redux/social/social.selectors";
import { getOptionsData } from "../../redux/options/options.selectors";
import { auth, firestore } from "../../utils/firebase.util";
import useArray from "../../utils/usearray.util";
import Messages from "./messages.component";
import { useSpeechSynthesis } from "../audio/audio.component";

const Chat = (props) => {
  const [, speak] = useSpeechSynthesis();
  const [msg, setMSG] = React.useState("");
  const { array, push } = useArray([]);

  const handleChange = (event) => {
    const { value } = event.target;
    setMSG(value);
    if (event.which === 13) {
      event.preventDefault();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      props.socialSess.toLowerCase() === "solo" ||
      props.socialSess === auth.currentUser.uid
    ) {
      firestore.doc(`customers/${auth.currentUser.uid}/chaData/chat`).set(
        {
          cid: auth.currentUser.displayName,
          msg: msg,
          src: 'chat',
          ucc: props.optionsData.ucc,
          uid: auth.currentUser.uid,
        },
        { merge: true }
      );
    } else {
      firestore.doc(`sessions/${props.socialSess}/chaData/chat`).set(
        {
          cid: auth.currentUser.displayName,
          msg: msg,
          src: 'chat',
          ucc: props.optionsData.ucc,
          uid: auth.currentUser.uid
        },
        { merge: true }
      );
    }
    setMSG("");
    document.getElementById("msgInput").focus();
  };

  React.useEffect(() => {
    const msgScrape = () => {
      if (auth.currentUser) {
        if (
          props.socialSess.toLowerCase() === "solo" ||
          props.socialSess === auth.currentUser.uid
        ) {
          return firestore
            .doc(`customers/${auth.currentUser.uid}/chaData/chat`)
            .onSnapshot(
              (docSnapshot) => {
                if (!docSnapshot.empty) {
                  if (docSnapshot.data() !== undefined) {
                    let uidMatch = false;
                    if (docSnapshot.data().uid === auth.currentUser.uid) {
                      uidMatch = true;
                    }
                    var docSnap = JSON.parse(
                      `{"cid":"${docSnapshot.data().cid}","msg":"${
                        docSnapshot.data().msg
                      }","ucc":"${docSnapshot.data().ucc}","uid":${uidMatch}}`
                    );
                    push(docSnap);
                    if (
                      props.optionsData.tsg &&
                      props.optionsData.tsl !== "Disabled" &&
                      docSnapshot.data().src === 'chat'
                    ) {
                      speak(
                        props.optionsData,
                        docSnapshot.data().msg,
                        props.optionsData.tsr
                      );
                    }
                  }
                }
              },
              (error) => {
                firestore.doc(`sessions/${props.socialSess}/chaData/chat`).set(
                  {
                    cid: "[System Message]",
                    msg: `${auth.currentUser.displayName} encountered an error: ${error}`,
                    ucc: "accent",
                    uid: "0"
                  },
                  { merge: true }
                );
              }
            );
        } else {
          return firestore
            .doc(`sessions/${props.socialSess}/chaData/chat`)
            .onSnapshot(
              (docSnapshot) => {
                if (!docSnapshot.empty) {
                  if (docSnapshot.data() !== undefined) {
                    let uidMatch = false;
                    if (docSnapshot.data().uid === auth.currentUser.uid) {
                      uidMatch = true;
                    }
                    var docSnap = JSON.parse(
                      `{"cid":"${docSnapshot.data().cid}","msg":"${
                        docSnapshot.data().msg
                      }","ucc":"${docSnapshot.data().ucc}","uid":${uidMatch}}`
                    );
                    push(docSnap);
                    if (
                      props.optionsData.tsg &&
                      props.optionsData.tsl !== "Disabled"
                    ) {
                      speak(
                        props.optionsData,
                        docSnapshot.data().msg,
                        props.optionsData.tsr
                      );
                    }
                  }
                }
              },
              (error) => {
                firestore.doc(`sessions/${props.socialSess}/chaData/chat`).set(
                  {
                    cid: "[System Message]",
                    msg: `${auth.currentUser.displayName} encountered an error: ${error}`,
                    ucc: "accent",
                    uid: "0"
                  },
                  { merge: true }
                );
              }
            );
        }
      }
    };
    let unsubscribe = msgScrape();
    return unsubscribe;
  }, [props.socialSess]);

  return (
    <form onSubmit={handleSubmit}>
      <Form.Group style={{ height: "100%", minHeight: "5rem" }}>
        <Messages messages={array} />
        <InputGroup style={{ height: "2rem" }}>
          <Form.Control
            id="msgInput"
            type="textarea"
            name="msg"
            value={msg}
            maxLength={100}
            onChange={handleChange}
            placeholder={"Session ID: " + props.socialSess}
            autoComplete="off"
          />
          <Button variant="accent" type="submit">
            SEND
          </Button>
        </InputGroup>
      </Form.Group>
    </form>
  );
};

const mapStateToProps = (state) => ({
  optionsData: getOptionsData(state),
  socialSess: getSocialSess(state)
});

export default connect(mapStateToProps, null)(Chat);
