import React from "react";
import { connect } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { getSocialSess } from "../../redux/social/social.selectors";
import { getOptionsData } from "../../redux/options/options.selectors";
import { auth, firestore } from "../../utils/firebase.util";
import { useHistory } from "react-router-dom";

const CreateView = (props) => {
  let history = useHistory();
  const [ses, setSes] = React.useState("");
  const [des, setDes] = React.useState("");
  const [spc, setSPC] = React.useState("");
  const [status, setStatus] = React.useState("");

  const handleClick = () => {
    if (ses !== props.socialSess) {
      if (ses.toLowerCase() === "solo" || ses === auth.currentUser.uid) {
        setStatus("You are already in a solo session.");
        setSes("");
        setDes("");
        setSPC("");
      } else {
        firestore
          .doc(`sessions/${ses}`)
          .get()
          .then((doc) => {
            if (!doc.exists) {
              firestore.doc(`sessions/${ses}`).set(
                {
                  sesData: {
                    des: des,
                    sid: ses,
                    spc: parseInt(spc, 10),
                    arr: [`${auth.currentUser.uid}`]
                  }
                },
                { merge: true }
              );
              const nkb = [
                "Key",
                "7",
                "8",
                "O",
                "Y",
                "U",
                "I",
                "L",
                "H",
                "J",
                "K",
                "N",
                "M",
                "<",
                ">",
                "___",
                "ALT"
              ];
              const nnp = [
                "Key",
                "/",
                "*",
                "-",
                "7",
                "8",
                "9",
                "+",
                "4",
                "5",
                "6",
                "1",
                "2",
                "3",
                "E",
                "0",
                "•"
              ];
              for (var i = 0; i < 17; i++) {
                var alpha = (i + 10).toString(36).toUpperCase();
                var beta = {
                  bid: `btnData${alpha}`,
                  cal: `Callout ${i}`,
                  cdt: "alert",
                  col: "primary",
                  dur: 2,
                  nkb: `${nkb[i]}`,
                  nnp: `${nnp[i]}`,
                  ntp: i,
                  udn: "",
                  uid: "",
                  utc: 0
                };
                firestore
                  .doc(`sessions/${ses}/btnData/btnData${alpha}`)
                  .set(beta, { merge: true });
                if (i === 16) {
                  setTimeout(history.push(`/session/${ses}`), 10000);
                }
              }
            }
          });
      }
    } else {
      setStatus("You are already in this session");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "ses") {
      let isValid = /[\W]/g.test(value);
      if (isValid) {
        setSes(value.replace(/[\W]/g, ""));
      } else {
        setSes(value.replace(/[\W]/g, ""));
        setStatus("");
      }
    } else if (name === "spc") {
      let isValid = /[+-.,]\W/g.test(value);
      if (isValid) {
        setSPC(value.replace(/[+-.,]\W/g, ""));
      } else if (value === "") {
        setSPC("");
      } else if (value >= 12) {
        setSPC(12);
      } else if (value <= 2) {
        setSPC(2);
      } else {
        setSPC(value);
        setStatus("");
      }
    } else if (name === "des") {
      setDes(value);
    } else if (name === "status") {
      setStatus(value);
    }
  };

  return (
    <>
      <p className="mb-1">
        Session ID:&nbsp;
        {status === "" ? "" : <p className="form-error">{status}</p>}
      </p>
      <Form.Control
        type="text"
        name="ses"
        value={ses}
        onChange={handleChange}
        placeholder="Chat Room Name?"
      />
      <p className="mt-2 mb-0">Player Count:</p>
      <Form.Control
        type="number"
        name="spc"
        min={2}
        max={12}
        step={1}
        value={spc}
        onChange={handleChange}
        placeholder="Max Players?"
      />
      <p className="mt-2 mb-0">Description:</p>
      <Form.Control
        type="textarea"
        name="des"
        value={des}
        onChange={handleChange}
        placeholder="Game, Activity, Reqs?"
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gridGap: "1rem",
          margin: "1rem 0 -3.4rem 0"
        }}
      >
        <div></div>
        <Button
          variant="accent"
          onClick={handleClick}
          type="submit"
          className={
            props.socialSess === ses ||
            status !== "" ||
            ses === "" ||
            des === "" ||
            spc === ""
              ? "disabled"
              : ""
          }
        >
          Create
        </Button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  optionsData: getOptionsData(state),
  socialSess: getSocialSess(state)
});

export default connect(mapStateToProps, null)(CreateView);
