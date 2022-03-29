import React from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { getSocialFind } from "../../redux/social/social.selectors";
import { setSocialFind } from "../../redux/social/social.actions";

const Look = (props) => {
  const handleChange = (event) => {
    const { value } = event.target;
    props.setSocialFind(value);
  };

  return (
    <Form.Control
      id="lookup"
      type="text"
      name="lookup"
      value={props.socialFind}
      onChange={handleChange}
      placeholder={"View user data"}
      autoComplete="off"
    />
  );
};

const mapStateToProps = (state) => ({
  socialFind: getSocialFind(state)
});

const mapDispatchToProps = (dispatch) => ({
  setSocialFind: (data) => dispatch(setSocialFind(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Look);
