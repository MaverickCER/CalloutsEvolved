import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const Present = (props) => {
  const [show, setShow] = useState(false);

  return (
    <>
      {props.label === "" ? (
        <>
          <Modal show={!show} onHide={() => setShow(!show)} size="lg" centered>
            <Modal.Header>
              <Modal.Title>{props.title}</Modal.Title>
              <div onClick={() => setShow(!show)}>Close X</div>
            </Modal.Header>
            <Modal.Body
              style={{ maxHeight: "calc(100vh - 8rem)", overflow: "scroll" }}
            >
              {props.children}
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <>
          <span
            style={props.style || { cursor: "pointer" }}
            variant="accent"
            onClick={() => setShow(!show)}
          >
            {props.label}
          </span>

          <Modal show={show} onHide={() => setShow(!show)} size="lg" centered>
            <Modal.Header>
              <Modal.Title>{props.title}</Modal.Title>
              <div onClick={() => setShow(!show)}>Close X</div>
            </Modal.Header>
            <Modal.Body
              style={{ maxHeight: "calc(100vh - 8rem)", overflow: "scroll" }}
            >
              {props.children}
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};

export default Present;
