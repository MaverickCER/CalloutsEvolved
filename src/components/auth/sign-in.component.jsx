import React from "react";
import useForm from "../../utils/useform.util";
import { Button, Form } from "react-bootstrap";
import { auth } from "../../utils/firebase.util";

const SignIn = () => {
  const required = ["email", "password"];
  const authSignIn = () => {
    auth
      .signInWithEmailAndPassword(
        values.email.trim().toLowerCase(),
        values.password
      )
      .catch((e) => {
        handleError(e.message);
      });
  };

  const { values, errors, handleChange, handleError, handleSubmit } = useForm(
    authSignIn,
    required
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      {errors.auth && <p className="form-error">{errors.auth}</p>}
      {errors.email && <p className="form-error">{errors.email}</p>}
      {errors.password && <p className="form-error">{errors.password}</p>}
      <Form.Group controlId="formBasicEmail">
        <Form.Label className="mb-1">Email:</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
          placeholder="Enter your email"
          autoComplete="off"
          required
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label className="mt-2 mb-1">Password:</Form.Label>
        <Form.Control
          type="password"
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
        Submit
      </Button>
    </form>
  );
};

export default SignIn;
