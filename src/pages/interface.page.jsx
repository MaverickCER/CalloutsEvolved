import React from "react";
import { connect } from "react-redux";
import useWindowDimensions from "../utils/window.util";
import Sidebar from "../components/sidebar/sidebar.component";
import { getOptionsData } from "../redux/options/options.selectors";
import { setOptionsData } from "../redux/options/options.actions";
import { getSocialSess } from "../redux/social/social.selectors";
import { setSocialSess, setSocialView } from "../redux/social/social.actions";
import Grid from "../components/callouts/grid.component";
import { auth, firestore } from "../utils/firebase.util";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ReactComponent as Waves } from "../assets/waves.svg";
import useKeydown from "../utils/usekeydown.util";

const Interface = (props) => {
  const { width } = useWindowDimensions();
  const [joined, setJoined] = React.useState(false);
  let params = useParams();
  const history = useHistory();

  const sendData = async (btn, target) => {
    switch (target) {
      case "checkbox":
        break;
      case "color":
        break;
      case "date":
        break;
      case "datetime-local":
        break;
      case "email":
        break;
      case "file":
        break;
      case "hidden":
        break;
      case "image":
        break;
      case "month":
        break;
      case "number":
        break;
      case "password":
        break;
      case "radio":
        break;
      case "range":
        break;
      case "reset":
        break;
      case "search":
        break;
      case "submit":
        break;
      case "tel":
        break;
      case "text":
        break;
      case "textarea":
        break;
      case "time":
        break;
      case "url":
        break;
      case "week":
        break;
      default:
        if (
          props.socialSess.toLowerCase() === "solo" ||
          props.socialSess === auth.currentUser.uid
        ) {
          firestore
            .doc(`customers/${auth.currentUser.uid}/btnData/btnData${btn}`)
            .get()
            .then((data) => {
              if (data.data().uid === "") {
                firestore
                  .doc(
                    `customers/${auth.currentUser.uid}/btnData/btnData${btn}`
                  )
                  .set(
                    {
                      udn: auth.currentUser.displayName,
                      uid: auth.currentUser.uid,
                      utc: Date.now()
                    },
                    { merge: true }
                  );
              } else if (auth.currentUser.uid === data.data().uid) {
                firestore
                  .doc(
                    `customers/${auth.currentUser.uid}/btnData/btnData${btn}`
                  )
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
            });
        } else {
          firestore
            .doc(`sessions/${props.socialSess}/btnData/btnData${btn}`)
            .get()
            .then((data) => {
              if (data.data().uid === "") {
                firestore
                  .doc(`sessions/${props.socialSess}/btnData/btnData${btn}`)
                  .set(
                    {
                      udn: auth.currentUser.displayName,
                      uid: auth.currentUser.uid,
                      utc: Date.now()
                    },
                    { merge: true }
                  );
              } else if (auth.currentUser.uid === data.data().uid) {
                firestore
                  .doc(`sessions/${props.socialSess}/btnData/btnData${btn}`)
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
            });
        }
        break;
    }
  };

  useKeydown(
    [
      "NumpadDivide",
      "Digit7",
      "NumpadMultiply",
      "Digit8",
      "NumpadSubtract",
      "Digit9",
      "Numpad7",
      "KeyY",
      "Numpad8",
      "KeyU",
      "Numpad9",
      "KeyI",
      "KeyO",
      "NumpadAdd",
      "KeyL",
      "Numpad4",
      "KeyH",
      "Numpad5",
      "KeyJ",
      "Numpad6",
      "KeyK",
      "Numpad1",
      "KeyN",
      "Numpad2",
      "KeyM",
      "Numpad3",
      "Comma",
      "NumpadEnter",
      "Period",
      "Numpad0",
      "Space",
      "AltRight",
      "NumpadDecimal"
    ],
    (event) => {
      switch (event.code) {
        case "NumpadDivide": // /
          sendData("A", event.target.type);
          break;
        case "Digit7": // 7
          sendData("A", event.target.type);
          break;
        case "NumpadMultiply": // *
          sendData("B", event.target.type);
          break;
        case "Digit8": // 8
          sendData("B", event.target.type);
          break;
        case "NumpadSubtract": // -
          sendData("C", event.target.type);
          break;
        case "Digit9": // 9
          sendData("C", event.target.type);
          break;
        case "KeyO": // O
          sendData("C", event.target.type);
          break;
        case "Numpad7": // 7
          sendData("D", event.target.type);
          break;
        case "KeyY": // Y
          sendData("D", event.target.type);
          break;
        case "Numpad8": // 8
          sendData("E", event.target.type);
          break;
        case "KeyU": // U
          sendData("E", event.target.type);
          break;
        case "Numpad9": // 9
          sendData("F", event.target.type);
          break;
        case "KeyI": // I
          sendData("F", event.target.type);
          break;
        case "NumpadAdd": // +
          sendData("G", event.target.type);
          break;
        case "KeyL": // L
          sendData("G", event.target.type);
          break;
        case "Numpad4": // 4
          sendData("H", event.target.type);
          break;
        case "KeyH": // H
          sendData("H", event.target.type);
          break;
        case "Numpad5": // 5
          sendData("I", event.target.type);
          break;
        case "KeyJ": // J
          sendData("I", event.target.type);
          break;
        case "Numpad6": // 6
          sendData("J", event.target.type);
          break;
        case "KeyK": // K
          sendData("J", event.target.type);
          break;
        case "Numpad1": // 1
          sendData("K", event.target.type);
          break;
        case "KeyN": // N
          sendData("K", event.target.type);
          break;
        case "Numpad2": // 2
          sendData("L", event.target.type);
          break;
        case "KeyM": // M
          sendData("L", event.target.type);
          break;
        case "Numpad3": // 3
          sendData("M", event.target.type);
          break;
        case "Comma": // ,<
          sendData("M", event.target.type);
          break;
        case "NumpadEnter":
          sendData("N", event.target.type);
          break;
        case "Period": // .>
          sendData("N", event.target.type);
          break;
        case "Numpad0": // 0
          sendData("O", event.target.type);
          break;
        case "Space": // spacebar
          sendData("O", event.target.type);
          break;
        case "AltRight": // right alt
          sendData("P", event.target.type);
          break;
        case "NumpadDecimal": // .
          sendData("P", event.target.type);
          break;
        default:
          break;
      }
    }
  );

  const joinSolo = () => {
    if (auth.currentUser.email === null) {
      return auth.currentUser.delete().then(() => {
        history.push("/unavailable");
      });
    }
    firestore.doc(`customers/${auth.currentUser.uid}`).set(
      {
        userData: {
          sid: "Solo"
        }
      },
      { merge: true }
    );
    props.setSocialSess("Solo");
    props.setSocialView("create");
    history.push("/session");
  };

  const join = () => {
    firestore
      .doc(`sessions/${params.id}`)
      .get()
      .then((res) => {
        if (res.empty) return joinSolo();
        if (res.data() === undefined) return joinSolo();
        console.error(res.data());
        let sp = res.data().sesData.arr;
        if (sp === undefined) return joinSolo();
        if (sp.length >= res.data().sesData.spc) return joinSolo();
        if (auth.currentUser.email !== null) {
          props.setSocialSess(params.id);
          props.setSocialView("current");
          firestore.doc(`customers/${auth.currentUser.uid}`).set(
            {
              userData: {
                cid: auth.currentUser.displayName,
                sid: params.id,
                ucc: props.optionsData.ucc,
                uid: auth.currentUser.uid
              }
            },
            { merge: true }
          );
          sp.push(`${auth.currentUser.uid}`);
          let unique = sp.filter((v, i, a) => a.indexOf(v) === i);
          firestore.doc(`sessions/${params.id}`).set(
            {
              sesData: {
                arr: unique
              }
            },
            { merge: true }
          );
          firestore.doc(`sessions/${params.id}/chaData/chat`).set(
            {
              cid: "[System Message]",
              msg: `${auth.currentUser.displayName} Joined Session ID ${params.id}`,
              ucc: "accent",
              uid: "0"
            },
            { merge: true }
          );
          firestore
            .doc(`sessions/${params.id}/sttData/${auth.currentUser.uid}`)
            .set(
              {
                cid: auth.currentUser.displayName,
                msg: "Muted...",
                ucc: props.optionsData.ucc,
                uid: auth.currentUser.uid
              },
              { merge: true }
            )
            .then(() => {
              setJoined(true);
            });
        } else {
          props.setSocialSess(params.id);
          sp.push(`${auth.currentUser.uid}`);
          let unique = sp.filter((v, i, a) => a.indexOf(v) === i);
          firestore.doc(`sessions/${params.id}`).set(
            {
              sesData: {
                arr: unique
              }
            },
            { merge: true }
          );
          firestore.doc(`sessions/${params.id}/chaData/chat`).set(
            {
              cid: "[System Message]",
              msg: `${auth.currentUser.displayName} Joined Session ID ${params.id}`,
              ucc: "accent",
              uid: "0"
            },
            { merge: true }
          );
          firestore
            .doc(`sessions/${params.id}/sttData/${auth.currentUser.uid}`)
            .set(
              {
                cid: auth.currentUser.displayName,
                msg: "Muted...",
                ucc: props.optionsData.ucc,
                uid: auth.currentUser.uid
              },
              { merge: true }
            )
            .then(() => {
              setJoined(true);
            });
        }
      });
  };

  const leave = async () => {
    if (auth.currentUser.email !== null) {
      firestore
        .doc(`customers/${auth.currentUser.uid}`)
        .get()
        .then((res) => {
          if (res.empty) return;
          if (res.data() === undefined) return;
          if (res.data().userData.sid.toLowerCase() === "solo") return;
          if (res.data().userData.sid === auth.currentUser.uid) return;
          firestore
            .doc(`sessions/${res.data().userData.sid}`)
            .get()
            .then((res) => {
              if (res.empty) return;
              if (res.data() === undefined) return;
              if (res.data().sesData.arr.length === 1) {
                firestore
                  .collection(`sessions/${res.data().sesData.sid}/btnData`)
                  .get()
                  .then((querySnapshot) => {
                    querySnapshot.forEach((res) => {
                      res.ref.delete();
                    });
                  });
                firestore
                  .doc(`sessions/${res.data().sesData.sid}/chaData/chat`)
                  .delete();
                firestore
                  .collection(`sessions/${res.data().sesData.sid}/sttData`)
                  .get()
                  .then((querySnapshot) => {
                    querySnapshot.forEach((res) => {
                      res.ref.delete();
                    });
                  });
                firestore
                  .doc(`sessions/${res.data().sesData.sid}/userData/lists`)
                  .delete();
                firestore.doc(`sessions/${res.data().sesData.sid}`).delete();
              } else {
                let array = res.data().sesData.arr;
                let filtered = array.filter(
                  (a) => a !== `${auth.currentUser.uid}`
                );
                firestore
                  .doc(`sessions/${res.data().sesData.sid}`)
                  .set({ sesData: { arr: filtered } }, { merge: true });
                firestore
                  .doc(
                    `sessions/${res.data().sesData.sid}/sttData/${
                      auth.currentUser.uid
                    }`
                  )
                  .delete();
              }
            });
        });
    } else {
      if (props.socialSess.toLowerCase() !== "solo") {
        firestore
          .doc(`sessions/${props.socialSess}`)
          .get()
          .then((res) => {
            if (res.empty) return;
            if (res.data() === undefined) return;
            let lastUser = [`${auth.currentUser.uid}`];
            if (res.data().sesData.arr === lastUser) {
              firestore
                .collection(`sessions/${res.data().sesData.sid}/btnData`)
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((res) => {
                    res.ref.delete();
                  });
                });
              firestore
                .doc(`sessions/${res.data().sesData.sid}/chaData/chat`)
                .delete();
              firestore
                .collection(`sessions/${res.data().sesData.sid}/sttData`)
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((res) => {
                    res.ref.delete();
                  });
                });
              firestore
                .doc(`sessions/${res.data().sesData.sid}/userData/lists`)
                .delete();
              firestore.doc(`sessions/${res.data().sesData.sid}`).delete();
            } else {
              let array = res.data().sesData.arr;
              let filtered = array.filter(
                (a) => a !== `${auth.currentUser.uid}`
              );
              firestore
                .doc(`sessions/${res.data().sesData.sid}`)
                .set({ sesData: { arr: filtered } }, { merge: true });
              firestore
                .doc(
                  `sessions/${res.data().sesData.sid}/sttData/${
                    auth.currentUser.uid
                  }`
                )
                .delete();
            }
          });
      }
    }
  };

  React.useEffect(() => {
    leave().then(() => {
      join()
    });
    if (props.optionsData.ppi) {
      let token =
        "AZzZJns5CjnuIgWxB6ExeKo73EzpDQgTtskAfUBJMgYq5e242WlxvloneLUvGOi6LBTbGzP1RBnvBBWgAZzZJns5CjnuIgWxB6ExeKo73EzpDQgTtskAfUBJMgYq5e242WlxvloneLUvGOi6LBTbGzP1RBnvBBWg:EIdbuDfcsQ9qa3ymRXqp-UPQBN4BFmsUu_UsUvl85kMz55kF6Yfqz6jpVo3n8xFYi-wKL1fOH4z3hq-4";
      let baseToken = btoa(token);
      if (props.optionsData.ppi !== "FREE") {
        fetch(
          "https://api-m.sandbox.paypal.com/v1/billing/subscriptions/I-BW452GLLEP1G",
          {
            headers: {
              Authorization: `Basic ${baseToken}`,
              "Content-Type": "application/json"
            }
          }
        ).then((response) => {
          console.log(response);
          if (response.status === 200) {
            // Successfully obtained the subscription!
            let data = response.json();
            let paid = Date.parse(data.billing_info.last_payment.time);
            let month = Date.now() - 2764800000;
            if (paid > month) {
              fetch(
                "https://api-m.sandbox.paypal.com/v1/billing/subscriptions/I-BW452GLLEP1G/cancel",
                {
                  body: { reason: "None" },
                  headers: {
                    Authorization:
                      "Basic QVp6WkpuczVDam51SWdXeEI2RXhlS283M0V6cERRZ1R0c2tBZlVCSk1nWXE1ZTI0MldseHZsb25lTFV2R09pNkxCVGJHelAxUkJudkJCV2c6RUlkYnVEZmNzUTlxYTN5bVJYcXAtVVBRQk40QkZtc1V1X1VzVXZsODVrTXo1NWtGNllmcXo2anBWbzNuOHhGWWktd0tMMWZPSDR6M2hxLTQ",
                    "Content-Type": "application/json"
                  },
                  method: "POST"
                }
              ).then((response) => {
                if (response.status === 204) {
                  firestore.doc(`customers/${auth.currentUser.uid}`).set(
                    {
                      userData: {
                        ppi: ""
                      }
                    },
                    { merge: true }
                  );
                  let data = JSON.parse(JSON.stringify(props.optionsData));
                  data.ppi = "";
                  props.setOptionsData(data);
                }
              });
            }
          } else {
            fetch(
              "https://api-m.sandbox.paypal.com/v1/billing/subscriptions/I-BW452GLLEP1G/cancel",
              {
                body: { reason: "None" },
                headers: {
                  Authorization: `Basic ${baseToken}`,
                  "Content-Type": "application/json"
                },
                method: "POST"
              }
            ).then((response) => {
              if (response.status === 204) {
                firestore.doc(`customers/${auth.currentUser.uid}`).set(
                  {
                    userData: {
                      ppi: ""
                    }
                  },
                  { merge: true }
                );
                let data = JSON.parse(JSON.stringify(props.optionsData));
                data.ppi = "";
                props.setOptionsData(data);
              }
            });
          }
        });
      }
    }
  }, [params.id, props.optionsData.ppi]);

  
  React.useEffect(() => {
    if (joined) {
      const getData = () => {
        if (
          auth.currentUser &&
          props.socialSess.toLowerCase() !== "solo" &&
          props.socialSess !== auth.currentUser.uid
        ) {
          return firestore
            .doc(`sessions/${props.socialSess}`)
            .onSnapshot((docSnapshot) => {
              if (!docSnapshot.empty) {
                if (docSnapshot.data() !== undefined) {
                  if (Array.isArray(docSnapshot.data().arr)) {
                    let index = docSnapshot.data().arr.indexOf(auth.currentUser.uid);
                    if (index === -1) {
                      leave();
                    }
                  }
                }
              }
            });
        }
      };
      let unsubscribe = getData();
      return unsubscribe;
    }
  }, [joined, props.socialSess]);

  return (
    <div className="gridwrapper">
      <div>
        <Sidebar />
      </div>
      {width > 600 ? (
        <div>
          {props.optionsData.bkg === "waves" ? <Waves /> : null}
          <Grid />
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  optionsData: getOptionsData(state),
  socialSess: getSocialSess(state)
});

const mapDispatchToProps = (dispatch) => ({
  setSocialSess: (data) => dispatch(setSocialSess(data)),
  setSocialView: (data) => dispatch(setSocialView(data)),
  setOptionsData: (data) => dispatch(setOptionsData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Interface);