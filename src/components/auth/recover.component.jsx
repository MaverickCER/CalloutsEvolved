import React from "react";
import { Form, Button } from "react-bootstrap";
import { auth } from "../../utils/firebase.util";
import useForm from "../../utils/useform.util";

const Recover = (props) => {
  const required = ["email"];
  const authRecover = () => {
    auth
      .sendPasswordResetEmail(values.email)
      .then(() => {})
      .catch((e) => {
        handleError(e.message);
      });
  };

  const { values, errors, handleChange, handleError, handleSubmit } = useForm(
    authRecover,
    required
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      {errors.auth && <p className="form-error">{errors.auth}</p>}
      {errors.email && <p className="form-error">{errors.email}</p>}
      <Form.Group controlId="email">
        <Form.Label className="mt-2 mb-1">Email:</Form.Label>
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

export default Recover;
