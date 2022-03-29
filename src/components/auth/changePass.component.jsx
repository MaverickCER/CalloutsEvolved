import React from "react";
import { Form, Button } from "react-bootstrap";
import { auth, eap } from "../../utils/firebase.util";
import useForm from "../../utils/useform.util";

const ChangePass = () => {
  const required = ["password", "passwordNew"];
  const [show, setShow] = React.useState(false);
  const [show1, setShow1] = React.useState(false);

  const authChangePSWRD = () => {
    const credential = eap.credential(auth.currentUser.email, values.password);
    auth.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        auth.currentUser
          .updatePassword(values.passwordNew)
          .then(() => {
            handleError("Password Changed!");
          })
          .catch((e) => {
            handleError(e.message);
          });
      })
      .catch((e) => {
        handleError(e.message);
      });
  };

  const { values, errors, handleChange, handleError, handleSubmit } = useForm(
    authChangePSWRD,
    required
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      {errors.auth && <p className="form-error">{errors.auth}</p>}
      {errors.password && <p className="form-error">{errors.password}</p>}
      {errors.passwordNew && <p className="form-error">{errors.passwordNew}</p>}
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
      <Form.Group controlId="passwordNew">
        <Form.Label className="mt-2 mb-1 pswrd">
          New Password:
          <span onClick={() => setShow1(!show1)}>
            {show1 ? "Hide" : "Show"}
          </span>
        </Form.Label>
        <Form.Control
          type={!show1 ? "password" : "text"}
          name="passwordNew"
          value={values.passwordNew || ""}
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
        Change Password
      </Button>
    </form>
  );
};

export default ChangePass;
