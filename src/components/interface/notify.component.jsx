import React from "react";
import { Alert } from "react-bootstrap";

const Notify = (props) => {
  const [isHidden, setIsHidden] = React.useState(false);

  return (
    <>
      {isHidden ? null : (
        <Alert variant={props.variant}>
          <div>
            <Alert.Heading>{props.heading}</Alert.Heading>
            <p>{props.children}</p>
            <span onClick={() => setIsHidden(true)}>Close X</span>
          </div>
        </Alert>
      )}
    </>
  );
};

export default Notify;
