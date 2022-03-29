import React from "react";
import { Button } from "react-bootstrap";
import useForm from "../../utils/useform.util";
import { auth, firestore } from "../../utils/firebase.util";
import { useHistory } from "react-router-dom";

const SignOut = (props) => {
  let history = useHistory();
  const { errors, handleError } = useForm();

  const handleSubmit = async (event) => {
    if (auth.currentUser) {
      firestore
        .doc(`customers/${auth.currentUser.uid}/userData/options`)
        .set(props.optionsData, { merge: true });
    }
    auth
      .signOut()
      .then(() => {
        history.push("/");
      })
      .catch((e) => {
        handleError(e.message);
      });
  };

  return (
    <form className="sign-out-form" onSubmit={handleSubmit} noValidate>
      {errors.auth && <p className="form-error">{errors.auth}</p>}
      <Button
        onClick={handleSubmit}
        variant="accent"
        block
        style={{ width: "100%" }}
      >
        Sign Out
      </Button>
    </form>
  );
};

export default SignOut;
