import React from "react";
import { Form, Button } from "react-bootstrap";
import { auth, eap } from "../../utils/firebase.util";
import useForm from "../../utils/useform.util";

const ChangeEmail = () => {
  const required = ["email", "password"];
  const [show, setShow] = React.useState(false);

  const authChangeEmail = () => {
    const credential = eap.credential(auth.currentUser.email, values.password);
    auth.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        auth.currentUser
          .updateEmail(values.email.trim().toLowerCase())
          .then(() => {
            handleError("Email Changed!");
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
    authChangeEmail,
    required
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      {errors.auth && <p className="form-error">{errors.auth}</p>}
      {errors.email && <p className="form-error">{errors.email}</p>}
      {errors.password && <p className="form-error">{errors.password}</p>}
      <Form.Group controlId="email">
        <Form.Label className="mb-1">Email Address:</Form.Label>
        <Form.Control
          type="name"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
          placeholder="Enter your email address"
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
        Change Email
      </Button>
    </form>
  );
};

export default ChangeEmail;
