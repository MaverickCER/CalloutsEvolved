import React from "react";
import { connect } from "react-redux";
import { getSocialSess } from "../../redux/social/social.selectors";
import { auth, firestore } from "../../utils/firebase.util";
import Friend from "../social/friend.component";
import Block from "../social/block.component";
import STTInput from "./sttinput.component";

const STTOutput = (props) => {
  const [array, setArray] = React.useState([]);

  React.useEffect(() => {
    const getData = () => {
      if (auth.currentUser) {
        if (
          props.socialSess.toLowerCase() === "solo" ||
          props.socialSess === auth.currentUser.uid
        ) {
          return firestore
            .collection(`customers/${auth.currentUser.uid}/sttData`)
            .onSnapshot((docSnapshot) => {
              if (!docSnapshot.empty) {
                const arr = [];
                docSnapshot.forEach((doc) => {
                  arr.push({
                    key: `${doc.id}`,
                    cid: `${doc.data().cid}`,
                    msg: `${doc.data().msg}`,
                    ucc: `${doc.data().ucc}`,
                    uid: `${doc.data().uid}`
                  });
                });
                setArray(arr);
              }
            });
        } else {
          return firestore
            .collection(`sessions/${props.socialSess}/sttData`)
            .onSnapshot((docSnapshot) => {
              if (!docSnapshot.empty) {
                const arr1 = [];
                docSnapshot.forEach((doc) => {
                  arr1.push({
                    key: `${doc.id}`,
                    cid: `${doc.data().cid}`,
                    msg: `${doc.data().msg}`,
                    ucc: `${doc.data().ucc}`,
                    uid: `${doc.data().uid}`
                  });
                });
                setArray(arr1);
              }
            });
        }
      }
    };
    let unsubscribe = getData();
    return unsubscribe;
  }, [props.socialSess]);

  return (
    <div
      style={{
        height: "100%",
        overflowY: "auto"
      }}
    >
      {array.map((doc) =>
        doc.uid !== auth.currentUser.uid ? null : (
          <details
            open
            key={doc.key}
            className={`borderRight-${doc.ucc}`}
            style={{
              textAlign: "left",
              paddingRight: "3px",
              paddingBottom: 0,
              marginBottom: "1rem"
            }}
          >
            <summary
              style={{
                display: "grid",
                gridTemplateColumns: "1fr"
              }}
            >
              <b style={{ margin: "0" }}>{doc.cid}:</b>
              <p style={{ margin: "0" }}>{doc.msg}</p>
            </summary>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                marginTop: ".5rem"
              }}
            >
              <STTInput />
            </div>
          </details>
        )
      )}
      {array.map((doc) =>
        doc.uid ===
        auth.currentUser.uid ? null : doc?.cid
            .toLowerCase()
            .includes("anonymous") ? (
          <div
            key={doc.key}
            className={`borderLeft-${doc.ucc}`}
            style={{
              textAlign: "left",
              paddingLeft: "3px",
              paddingBottom: 0,
              marginBottom: "1rem"
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr"
              }}
            >
              <b style={{ margin: "0" }}>{doc.cid}:</b>
              <p style={{ margin: "0" }}>{doc.msg}</p>
            </div>
          </div>
        ) : (
          <details
            key={doc.key}
            className={`borderLeft-${doc.ucc}`}
            style={{
              textAlign: "left",
              paddingLeft: "3px",
              paddingBottom: 0,
              marginBottom: "1rem"
            }}
          >
            <summary
              style={{
                display: "grid",
                gridTemplateColumns: "1fr"
              }}
            >
              <b style={{ margin: "0" }}>{doc.cid}:</b>
              <p style={{ margin: "0" }}>{doc.msg}</p>
            </summary>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridGap: "1rem",
                marginTop: ".5rem"
              }}
            >
              <Friend playerID={doc.uid} />
              <Block playerID={doc.uid} />
            </div>
          </details>
        )
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  socialSess: getSocialSess(state)
});

export default connect(mapStateToProps, null)(STTOutput);
