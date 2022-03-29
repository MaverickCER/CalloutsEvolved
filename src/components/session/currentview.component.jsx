import React from "react";
import { connect } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { getSocialSess } from "../../redux/social/social.selectors";
import {
  setSocialSess,
  setSocialView
} from "../../redux/social/social.actions";
import { firestore } from "../../utils/firebase.util";
import useTimeout from "../../utils/usetimeout.util";
import { useHistory } from "react-router-dom";

const CurrentView = (props) => {
  let history = useHistory();
  const [arr, setArr] = React.useState(0);
  const [ses, setSes] = React.useState("");
  const [des, setDes] = React.useState(0);
  const [spc, setSPC] = React.useState("");
  const [status, setStatus] = React.useState("Copy");
  const { reset } = useTimeout((e) => setStatus("Copy"), 1000);

  const fallbackCopyLink = () => {
    var textArea = document.createElement("textarea");
    textArea.value = `https://www.calloutsevolved.com/session/${ses}`;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.display = "none";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy").then(() => {
        setStatus("Copied!");
        reset();
      });
    } catch (err) {
      setStatus("Can't Copy URL :(");
      reset();
    }

    document.body.removeChild(textArea);
  };

  const copyLink = () => {
    if (!navigator.clipboard) {
      fallbackCopyLink();
    } else {
      navigator.clipboard
        .writeText(`https://www.calloutsevolved.com/session/${ses}`)
        .then(
          () => {
            setStatus("Copied!");
            reset();
          },
          () => {
            fallbackCopyLink();
          }
        )
        .catch(() => {
          fallbackCopyLink();
        });
    }
  };

  const leave = async () => {
    history.push("/session");
  };

  React.useEffect(() => {
    const checkStatus = () => {
      return firestore.doc(`sessions/${props.socialSess}`).onSnapshot((res) => {
        if (!res.empty) {
          if (res.data()) {
            if (res.data().sesData) {
              setArr(res.data().sesData.arr);
              setSes(res.data().sesData.sid);
              setDes(res.data().sesData.des);
              setSPC(res.data().sesData.spc);
            }
          }
        }
      });
    };
    let unsubscribe = checkStatus();
    return unsubscribe;
  }, [props.socialSess]);

  return (
    <>
      <p className="mb-1">Session ID:</p>
      <Form.Control type="text" placeholder={ses} disabled />
      <p className="mt-2 mb-0">
        Player Count: {arr.length}/{spc}
      </p>
      <Form.Control type="number" placeholder={spc} disabled />
      <p className="mt-2 mb-0">Description</p>
      <Form.Control type="textarea" placeholder={des} disabled />
      <div
        style={{
          display: "none",
          gridTemplateColumns: "1fr",
          alignItems: "center",
          margin: "1rem 0"
        }}
      >
        <Button variant="accent" onClick={() => copyLink()}>
          {status}
        </Button>
      </div>
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
        <Button variant="accent" onClick={leave}>
          Leave
        </Button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  socialSess: getSocialSess(state)
});

const mapDispatchToProps = (dispatch) => ({
  setSocialSess: (data) => dispatch(setSocialSess(data)),
  setSocialView: (data) => dispatch(setSocialView(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentView);
