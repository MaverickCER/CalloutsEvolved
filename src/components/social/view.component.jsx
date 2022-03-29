import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { getSocialFind } from "../../redux/social/social.selectors";
import { setSocialFind } from "../../redux/social/social.actions";

const View = (props) => {
  const [status, setStatus] = useState(false);

  const handleClick = () => {
    if (!status) {
      props.setSocialFind(props.playerID);
      setStatus(!status);
    } else {
      props.setSocialFind("");
      setStatus(!status);
    }
  };

  useEffect(() => {
    if (props.socialFind === props.playerID) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [props.socialFind, props.playerID]);

  return (
    <Button variant="accent" onClick={handleClick}>
      {status ? "Clear" : "View"}
    </Button>
  );
};

const mapStateToProps = (state) => ({
  socialFind: getSocialFind(state)
});

const mapDispatchToProps = (dispatch) => ({
  setSocialFind: (data) => dispatch(setSocialFind(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
