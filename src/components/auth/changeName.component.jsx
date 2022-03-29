import React from "react";
import { Form, Button } from "react-bootstrap";
import { firestore, auth, eap } from "../../utils/firebase.util";
import useForm from "../../utils/useform.util";

const ChangeName = () => {
  const required = ["displayName", "password"];
  const [show, setShow] = React.useState(false);

  const authChangeName = () => {
    const credential = eap.credential(auth.currentUser.email, values.password);
    auth.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        firestore
          .doc(`customers/${auth.currentUser.uid}`)
          .get()
          .then((doc) => {
            if (doc.exists) {
              if (doc.data()) {
                if (doc.data().userData) {
                  if (doc.data().userData.ses) {
                    if (doc.data().userData.ses.toLowerCase() !== "solo") {
                      firestore
                        .doc(
                          `sessions/${doc.data().userData.ses}/sttData/${
                            auth.currentUser.uid
                          }`
                        )
                        .set(
                          { userData: { cid: `${values.displayName}` } },
                          { merge: true }
                        );
                    }
                  }
                }
              }
            }
          });
        firestore.doc(`customers/${auth.currentUser.uid}`).set(
          {
            userData: {
              cid: `${values.displayName}`
            }
          },
          { merge: true }
        );
        firestore
          .doc(
            `customers/${auth.currentUser.uid}/sttData/${auth.currentUser.uid}`
          )
          .set(
            {
              cid: `${values.displayName}`
            },
            { merge: true }
          );
        return auth.currentUser
          .updateProfile({
            displayName: values.displayName
          })
          .then(() => {
            handleError("Name Changed!");
          });
      })
      .catch((e) => {
        handleError(e.message);
      });
  };

  const { values, errors, handleChange, handleError, handleSubmit } = useForm(
    authChangeName,
    required
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      {errors.auth && <p className="form-error">{errors.auth}</p>}
      {errors.displayName && <p className="form-error">{errors.displayName}</p>}
      {errors.password && <p className="form-error">{errors.password}</p>}
      <Form.Group controlId="displayName">
        <Form.Label className="mb-1">Display Name:</Form.Label>
        <Form.Control
          type="name"
          name="displayName"
          value={values.displayName || ""}
          onChange={handleChange}
          placeholder="Enter your display name"
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label className="mt-2 mb-1 pswrd">
          Current Password:
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
      <Button
        className="mt-3"
        variant="accent"
        type="submit"
        block
        style={{ width: "100%" }}
      >
        Change Display Name
      </Button>
    </form>
  );
};

export default ChangeName;
