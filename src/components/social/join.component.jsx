import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { getSocialSess } from "../../redux/social/social.selectors";
import { auth, firestore } from "../../utils/firebase.util";
import { useHistory } from "react-router-dom";

const Join = (props) => {
  let history = useHistory();
  const [status, setStatus] = React.useState("Join");

  const leave = async () => {
    history.push(`/session`);
  };

  const join = async () => {
    history.push(`/session/${props.newsession}`);
  };

  const handleClick = async (event) => {
    switch (status) {
      case "Join":
        join();
        setStatus("Joined");
        break;
      case "Leave":
        leave();
        setTimeout(join(), 0);
        setStatus("Session");
        break;
      default:
        break;
    }
  };

  const secondCheck = (user) => {
    firestore
      .doc(`customers/${auth.currentUser.uid}/userData/lists`)
      .get()
      .then(
        (docSnapshot) => {
          if (!docSnapshot.empty) {
            if (docSnapshot.data() !== undefined) {
              if (docSnapshot.data().blacklist.includes(user)) {
                setStatus("Blocked");
              } else {
                setStatus("Join");
              }
            }
          }
        },
        (error) => {
          console.log("Error #1 in join component: " + error);
        }
      );
  };

  const checkStatus = (user) => {
    firestore
      .doc(`customers/${user}/userData/lists`)
      .get()
      .then(
        (docSnapshot) => {
          if (!docSnapshot.empty) {
            if (docSnapshot.data() !== undefined) {
              if (docSnapshot.data().blacklist.includes(auth.currentUser.uid)) {
                firestore
                  .doc(`customers/${auth.currentUser.uid}/userData/lists`)
                  .onSnapshot(
                    (docSnapshot) => {
                      if (!docSnapshot.empty) {
                        if (docSnapshot.data() !== undefined) {
                          if (docSnapshot.data().blacklist.includes(user)) {
                            setStatus("Blocked");
                          } else {
                            setStatus("Join");
                          }
                        }
                      }
                    },
                    (error) => {
                      console.log("Error #2 in join component: " + error);
                    }
                  );
              } else {
                secondCheck(user);
              }
            } else {
              secondCheck(user);
            }
          }
        },
        (error) => {
          console.log("Error #3 in join component: " + error);
        }
      );
  };

  const getAccess = (newsession) => {
    firestore
      .doc(`sessions/${newsession}`)
      .get()
      .then((docSnapshot) => {
        if (!docSnapshot.empty) {
          if (docSnapshot.data() !== undefined) {
            if (
              docSnapshot.data().sesData.arr.some((user) => {
                var check = checkStatus(user);
                return check;
              })
            ) {
              setStatus("Blocked");
            } else {
              setStatus("Join");
            }
          } else {
            setStatus("Inactive");
          }
        } else {
          setStatus("Create");
        }
      });
  };

  useEffect(() => {
    if (props.newsession === "" || props.newsession === undefined) {
      setStatus("Session");
    } else if (
      props.newsession.toLowerCase() === "solo" ||
      props.newsession === auth.currentUser.uid
    ) {
      if (props.socialSess.toLowerCase() === "solo") {
        setStatus("Session");
      } else {
        setStatus("Leave");
      }
    } else if (props.newsession === props.socialSess) {
      setStatus("Joined");
    } else {
      getAccess(props.newsession);
    }
  }, [props.newsession]);

  return (
    <Button
      variant="accent"
      onClick={handleClick}
      className={
        status === "Joined" || status === "Blocked" || status === "Session"
          ? "disabled"
          : ""
      }
    >
      {status}
    </Button>
  );
};

const mapStateToProps = (state) => ({
  socialSess: getSocialSess(state)
});

export default connect(mapStateToProps, null)(Join);
