import React from "react";
import { Button } from "react-bootstrap";
import { auth, firestore } from "../../utils/firebase.util";

const Block = (props) => {
  const [status, setStatus] = React.useState("Foe");
  const [blacklist, setBlacklist] = React.useState([]);

  const handleClick = async (event) => {
    switch (status) {
      case "Block":
        return firestore
          .doc(`customers/${auth.currentUser.uid}/userData/lists`)
          .get()
          .then((docSnapshot) => {
            if (docSnapshot.empty) return;
            if (docSnapshot.data() === undefined) return;
            var docWhitelist = docSnapshot.data().whitelist;
            if (docWhitelist.includes(props.playerID)) {
              let arr0 = docWhitelist.filter((x) => {
                return x !== props.playerID;
              });
              let arr1 = blacklist;
              arr1.push(props.playerID);
              let unique = arr1.filter((v, i, a) => a.indexOf(v) === i);
              firestore
                .doc(`customers/${auth.currentUser.uid}/userData/lists`)
                .set({ blacklist: unique, whitelist: arr0 }, { merge: true });
            } else {
              let arr1 = blacklist;
              arr1.push(props.playerID);
              let unique = arr1.filter((v, i, a) => a.indexOf(v) === i);
              firestore
                .doc(`customers/${auth.currentUser.uid}/userData/lists`)
                .set({ blacklist: unique }, { merge: true });
            }
            setStatus("Blocked");
          });
      case "Unblock":
        let arr1 = blacklist;
        arr1 = arr1.filter((item) => item !== props.playerID);
        firestore
          .doc(`customers/${auth.currentUser.uid}/userData/lists`)
          .set({ blacklist: arr1 }, { merge: true });
        setStatus("Unblocked");
        break;
      default:
        break;
    }
  };

  const secondCheck = () => {
    return firestore
      .doc(`customers/${auth.currentUser.uid}/userData/lists`)
      .onSnapshot(
        (docSnapshot) => {
          if (docSnapshot.empty) return;
          if (docSnapshot.data() === undefined) return;
          if (docSnapshot.data().blacklist.includes(props.playerID)) {
            setStatus("Unblock");
            setBlacklist(docSnapshot.data().blacklist);
          } else {
            setStatus("Block");
            setBlacklist(docSnapshot.data().blacklist);
          }
        },
        (error) => {
          console.log("Error #1 in block component: " + error);
        }
      );
  };

  React.useEffect(() => {
    const checkStatus = () => {
      if (/\s/.test(props.playerID) || props.playerID === "") {
        setStatus("Foe");
      } else {
        return firestore
          .doc(`customers/${props.playerID}/userData/lists`)
          .onSnapshot(
            (docSnapshot) => {
              if (docSnapshot.empty) return;
              if (docSnapshot.data() === undefined)
                return secondCheck(props.playerID);
              if (!docSnapshot.data().blacklist.includes(auth.currentUser.uid))
                return secondCheck(props.playerID);
              firestore
                .doc(`customers/${auth.currentUser.uid}/userData/lists`)
                .get()
                .then(
                  (docSnapshot) => {
                    if (docSnapshot.empty) return;
                    if (docSnapshot.data() === undefined) return;
                    if (docSnapshot.data().blacklist.includes(props.playerID)) {
                      setStatus("Unblock");
                      setBlacklist(docSnapshot.data().blacklist);
                    } else {
                      setStatus("Blocked");
                    }
                  },
                  (error) => {
                    console.log("Error #2 in friend component: " + error);
                  }
                );
            },
            (error) => {
              console.log("Error #3 in friend component: " + error);
            }
          );
      }
    };
    let unsubscribe = checkStatus();
    return unsubscribe;
  }, [props.playerID]);

  return (
    <Button
      variant="accent"
      onClick={handleClick}
      className={
        status === "Blocked" || status === "Foe" || status === "Unblocked"
          ? "disabled"
          : ""
      }
    >
      {status}
    </Button>
  );
};

export default Block;
