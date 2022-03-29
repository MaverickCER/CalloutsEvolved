const validate = (values, isSubmit, required) => {
  let errors = {};
  if (required.includes("displayName")) {
    if (values.displayName === undefined) {
      if (isSubmit) {
        errors.displayName = "Diplay Name: Too short";
      } else {
        errors.displayName = "";
      }
    } else if (values.displayName.toLowerCase().includes("anonymous")) {
      errors.displayName = `Diplay Name: Can't contain "anonymous"`;
    } else if (values.displayName.toLowerCase().includes("system")) {
      errors.displayName = `Diplay Name: Can't contain "system"`;
    } else if (values.displayName.toLowerCase().includes("admin")) {
      errors.displayName = `Diplay Name: Can't contain "admin"`;
    } else if (values.displayName.toLowerCase().includes("mod")) {
      errors.displayName = `Diplay Name: Can't contain "mod"`;
    }
  }

  if (required.includes("email")) {
    if (values.email === undefined) {
      if (isSubmit) {
        errors.email = "Email: Too short";
      } else {
        errors.email = "";
      }
    } else if (values.email.length === 0) {
      errors.email = "";
    } else if (
      !/^([a-zA-Z0-9])+@+([a-zA-Z0-9])+\.+(com|org|edu)+([\s\S]*)$/.test(
        values.email
      )
    ) {
      errors.email = "Email: Incomplete";
    }
  }

  if (required.includes("password")) {
    if (values.password === undefined) {
      if (isSubmit) {
        errors.password = "Password: Too short";
      } else {
        errors.password = "";
      }
    } else if (values.password.length === 0) {
      errors.password = "";
    } else if (values.password.length < 8) {
      errors.password = "Password: Too short";
    } else if (!/([a-z])/.test(values.password)) {
      errors.password = "Password: Lowercase letters";
    } else if (!/([A-Z])/.test(values.password)) {
      errors.password = "Password: Uppercase letters";
    } else if (!/([0-9])/.test(values.password)) {
      errors.password = "Password: Numbers";
    }
  }

  if (required.includes("passwordNew")) {
    if (values.passwordNew === undefined) {
      if (isSubmit) {
        errors.passwordNew = "Password: Too short";
      } else {
        errors.passwordNew = "";
      }
    } else if (values.passwordNew.length === 0) {
      errors.passwordNew = "";
    } else if (values.passwordNew.length < 8) {
      errors.passwordNew = "New Password: Too short";
    } else if (!/([a-z])/.test(values.passwordNew)) {
      errors.passwordNew = "New Password: Lowercase letters";
    } else if (!/([A-Z])/.test(values.passwordNew)) {
      errors.passwordNew = "New Password: Uppercase letters";
    } else if (!/([0-9])/.test(values.passwordNew)) {
      errors.passwordNew = "New Password: Numbers";
    }
  }

  if (required.includes("confirmpassword")) {
    if (values.confirmpassword === undefined) {
      if (isSubmit) {
        errors.confirmpassword = "Confirm Password: Too short";
      } else {
        errors.confirmpassword = "";
      }
    } else if (!values.password) {
      if (isSubmit) {
        errors.password = "Password: Too short";
      } else {
        errors.password = "";
      }
    } else if (values.confirmpassword !== values.password) {
      errors.confirmpassword = "Confirm Password: Doesn't Match Password";
    }
  }

  if (required.includes("checkbox")) {
    if (
      !values.checkbox ||
      values.checkbox === undefined ||
      values.checkbox === false
    ) {
      errors.checkbox = "Checkbox: Must be Selected";
    }
  }

  if (required.includes("tos")) {
    if (!values.tos || values.tos === undefined || values.tos === false) {
      errors.tos = "You must agree to the Terms of Service and Privacy Policy.";
    }
  }
  return errors;
};

export default validate;
