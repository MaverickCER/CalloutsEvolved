import React from "react";
import { Form } from "react-bootstrap";
import NoCaptcha from "./no-captcha.component";
import { firestore, auth, eap } from "../../utils/firebase.util";
import useForm from "../../utils/useform.util";
import { useHistory } from "react-router-dom";

const Delete = () => {
  const required = ["password"];
  const [show, setShow] = React.useState(false);
  const [events, setEvents] = React.useState("Hold to Delete");
  let history = useHistory();

  const destroy = async (uid) => {
    firestore
      .collection(`customers/${uid}/btnData`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });
    firestore
      .collection(`customers/${uid}/saveData`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });
    firestore.doc(`customers/${uid}/userData/lists`).delete();
    firestore.doc(`customers/${uid}/sttData/${uid}`).delete();
    firestore.doc(`customers/${uid}/chaData/chat`).delete();
    firestore.doc(`customers/${uid}`).delete();
  };

  const authDelete = () => {
    const oldEmail = auth.currentUser.email;
    const credential = eap.credential(oldEmail, values.password);
    destroy(auth.currentUser.uid).then(() => {
      auth.currentUser
        .reauthenticateWithCredential(credential)
        .then(() => {
          auth.currentUser.delete();
          history.push("/");
        })
        .catch((e) => {
          handleError(e.message);
        });
    });
  };

  const { values, errors, handleChange, handleError, handleSubmit } = useForm(
    authDelete,
    required
  );

  return (
    <form noValidate>
      {errors.auth && <p className="form-error">{errors.auth}</p>}
      {errors.password && <p className="form-error">{errors.password}</p>}
      <Form.Group controlId="password">
        <Form.Label className="mt-2 mb-1 pswrd">
          Password:
          <span onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</span>
        </Form.Label>
        <Form.Control
          type={!show ? "password" : "text"}
          name="password"
          value={values.password || ""}
          onChange={handleChange}
          placeholder="Enter your password"
          autoComplete="off"
          required
        />
      </Form.Group>
      <NoCaptcha
        className="mt-3"
        style={{ width: "100%" }}
        variant="danger"
        time={2}
        onStart={() => setEvents("KEEP HOLDING")}
        onHold={() => setEvents("RELEASE!")}
        onEnd={(e, enough) => {
          if (enough === true) {
            handleSubmit();
            if (Object.keys(errors).length === 0) {
              setEvents("Success...");
            } else {
              setEvents("Incomplete Form");
            }
          } else {
            setEvents("No Captcha - Hold to Submit");
          }
        }}
      >
        {events}
      </NoCaptcha>
    </form>
  );
};

export default Delete;
