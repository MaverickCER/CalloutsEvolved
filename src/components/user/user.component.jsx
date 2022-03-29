import React from "react";
import { connect } from "react-redux";
import { getSocialSess } from "../../redux/social/social.selectors";
import { getOptionsData } from "../../redux/options/options.selectors";
import { setOptionsData } from "../../redux/options/options.actions";
import { Button } from "react-bootstrap";
import { auth, firestore } from "../../utils/firebase.util";
import {
  ChangeEmail,
  ChangeName,
  ChangePass,
  Delete,
  SignOut
} from "../auth/auth.collection";
import useTimeout from "../../utils/usetimeout.util";

const User = (props) => {
  const [userView, setUserView] = React.useState("close");
  const [status, setStatus] = React.useState("Save");
  const { reset } = useTimeout((e) => setStatus("Save"), 1000);

  // To set user chat color
  const setUserColor = (val) => {
    var userChatColorData = JSON.parse(JSON.stringify(props.optionsData));
    userChatColorData.ucc = val;
    props.setOptionsData(userChatColorData);
  };

  const saveUser = () => {
    firestore
      .doc(`customers/${auth.currentUser.uid}/userData/options`)
      .set(props.optionsData, { merge: true });
    setStatus("Saved!");
    reset();
  };

  const renderSwitch = (param) => {
    switch (param) {
      case "name":
        return <ChangeName />;
      case "email":
        return <ChangeEmail />;
      case "pass":
        return <ChangePass />;
      case "delete":
        return <Delete />;
      default:
        return null;
    }
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "center"
        }}
      >
        <p
          style={{
            padding: "0",
            margin: "0",
            whiteSpace: "nowrap",
            overflow: "hidden"
          }}
        >
          Name: {auth.currentUser.displayName}
        </p>
        {userView === "name" ? (
          <Button variant="accent" onClick={() => setUserView("close")}>
            Close
          </Button>
        ) : (
          <Button
            variant="accent"
            onClick={() => setUserView("name")}
            className={
              props.socialSess.toLowerCase() === "solo" ? "" : "disabled"
            }
          >
            Edit
          </Button>
        )}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "center",
          marginTop: "1rem"
        }}
      >
        <p
          style={{
            padding: "0",
            margin: "0",
            whiteSpace: "nowrap",
            overflow: "hidden"
          }}
        >
          Email: {auth.currentUser.email}
        </p>
        {userView === "email" ? (
          <Button variant="accent" onClick={() => setUserView("close")}>
            Close
          </Button>
        ) : (
          <Button
            variant="accent"
            onClick={() => setUserView("email")}
            className={
              props.socialSess.toLowerCase() === "solo" ? "" : "disabled"
            }
          >
            Edit
          </Button>
        )}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "center",
          marginTop: "1rem"
        }}
      >
        <p
          style={{
            padding: "0",
            margin: "0",
            whiteSpace: "nowrap",
            overflow: "hidden"
          }}
        >
          Password: ********
        </p>
        {userView === "pass" ? (
          <Button variant="accent" onClick={() => setUserView("close")}>
            Close
          </Button>
        ) : (
          <Button
            variant="accent"
            onClick={() => setUserView("pass")}
            className={
              props.socialSess.toLowerCase() === "solo" ? "" : "disabled"
            }
          >
            Edit
          </Button>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          alignItems: "center",
          gridGap: "1rem",
          marginTop: "1rem"
        }}
      >
        {props.optionsData.ucc === "danger" ? (
          <Button variant="danger" className="active">
            R
          </Button>
        ) : (
          <Button variant="danger" onClick={() => setUserColor("danger")}>
            R
          </Button>
        )}
        {props.optionsData.ucc === "warning" ? (
          <Button variant="warning" className="active">
            O
          </Button>
        ) : (
          <Button variant="warning" onClick={() => setUserColor("warning")}>
            O
          </Button>
        )}
        {props.optionsData.ucc === "info" ? (
          <Button variant="info" className="active">
            Y
          </Button>
        ) : (
          <Button variant="info" onClick={() => setUserColor("info")}>
            Y
          </Button>
        )}
        {props.optionsData.ucc === "success" ? (
          <Button variant="success" className="active">
            G
          </Button>
        ) : (
          <Button variant="success" onClick={() => setUserColor("success")}>
            G
          </Button>
        )}
        {props.optionsData.ucc === "primary" ? (
          <Button variant="primary" className="active">
            B
          </Button>
        ) : (
          <Button variant="primary" onClick={() => setUserColor("primary")}>
            B
          </Button>
        )}
        {props.optionsData.ucc === "secondary" ? (
          <Button variant="secondary" className="active">
            I
          </Button>
        ) : (
          <Button variant="secondary" onClick={() => setUserColor("secondary")}>
            I
          </Button>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          alignItems: "center",
          margin: "1rem 0"
        }}
      >
        <Button variant="accent" onClick={() => saveUser()}>
          {status}
        </Button>
      </div>

      {renderSwitch(userView)}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gridGap: "1rem",
          marginTop: "1rem"
        }}
      >
        <SignOut optionsData={props.optionsData} />
        {userView === "delete" ? (
          <Button variant="accent" onClick={() => setUserView("close")}>
            Delete
          </Button>
        ) : (
          <Button variant="danger" onClick={() => setUserView("delete")}>
            Delete
          </Button>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  optionsData: getOptionsData(state),
  socialSess: getSocialSess(state)
});

const mapDispatchToProps = (dispatch) => ({
  setOptionsData: (data) => dispatch(setOptionsData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
