import React from "react";
import { Button } from "react-bootstrap";
import { auth, firestore } from "../../utils/firebase.util";

const Friend = (props) => {
  const [status, setStatus] = React.useState("Add");
  const [whitelist, setWhitelist] = React.useState([]);

  const handleClick = async (event) => {
    switch (status) {
      case "Add":
        return firestore
          .doc(`customers/${auth.currentUser.uid}/userData/lists`)
          .get()
          .then((docSnapshot) => {
            if (docSnapshot.empty) return;
            if (docSnapshot.data() === undefined) return;
            var docBlacklist = docSnapshot.data().blacklist;
            if (docBlacklist.includes(props.playerID)) {
              let arr0 = docBlacklist.filter((x) => {
                return x !== props.playerID;
              });
              let arr1 = whitelist;
              arr1.push(props.playerID);
              let unique = arr1.filter((v, i, a) => a.indexOf(v) === i);
              firestore
                .doc(`customers/${auth.currentUser.uid}/userData/lists`)
                .set({ blacklist: arr0, whitelist: unique }, { merge: true });
            } else {
              let arr1 = whitelist;
              arr1.push(props.playerID);
              let unique = arr1.filter((v, i, a) => a.indexOf(v) === i);
              firestore
                .doc(`customers/${auth.currentUser.uid}/userData/lists`)
                .set({ whitelist: unique }, { merge: true });
            }
            setStatus("Added");
          });
      case "Remove":
        let arr1 = whitelist;
        arr1.push(props.playerID);
        let unique = arr1.filter((v, i, a) => a.indexOf(v) === i);
        firestore
          .doc(`customers/${auth.currentUser.uid}/userData/lists`)
          .set({ whitelist: unique }, { merge: true });
        setStatus("Removed");
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
            setStatus("Add");
          } else {
            if (docSnapshot.data().whitelist.includes(props.playerID)) {
              setStatus("Remove");
              setWhitelist(docSnapshot.data().blacklist);
            } else {
              setStatus("Add");
              setWhitelist(docSnapshot.data().blacklist);
            }
          }
        },
        (error) => {
          console.log("Error #1 in friend component: " + error);
        }
      );
  };

  React.useEffect(() => {
    const checkStatus = () => {
      if (/\s/.test(props.playerID) || props.playerID === "") {
        setStatus("Friend");
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
                    if (docSnapshot.data().whitelist.includes(props.playerID)) {
                      setStatus("Remove");
                      setWhitelist(docSnapshot.data().whitelist);
                    } else {
                      setStatus("Blocked");
                      setWhitelist(docSnapshot.data().whitelist);
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
        status === "Blocked" ||
        status === "Friend" ||
        status === "Removed" ||
        status === "Added"
          ? "disabled"
          : ""
      }
    >
      {status}
    </Button>
  );
};

export default Friend;
