import { useState, useEffect } from "react";
import validate from "./validate.form";
const useForm = (callback, required) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values, true, required));
    setIsSubmitting(true);
  };

  const handleChange = (event) => {
    if (event.target.name === "checkbox" || event.target.name === "tos") {
      event.persist();
      setValues((values) => ({
        ...values,
        [event.target.name]: event.target.checked
      }));
      setErrors(
        validate(
          { ...values, [event.target.name]: event.target.checked },
          false,
          required
        )
      );
      setIsSubmitting(false);
    } else {
      event.persist();
      setValues((values) => ({
        ...values,
        [event.target.name]: event.target.value
      }));
      setErrors(
        validate(
          { ...values, [event.target.name]: event.target.value },
          false,
          required
        )
      );
      setIsSubmitting(false);
    }
  };

  const handleError = (value) => {
    let errors = {};
    errors.auth = `${value}`;
    setErrors(errors);
  };

  return {
    handleChange,
    handleError,
    handleSubmit,
    values,
    errors
  };
};

export default useForm;
