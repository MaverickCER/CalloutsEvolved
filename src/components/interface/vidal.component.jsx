import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const Vidal = (props) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div
        style={props.style}
        className={props.className}
        variant="accent"
        onClick={() => setShow(true)}
      >
        {props.label}
      </div>

      {show === false ? null : (
        <Modal show onHide={() => setShow(false)} size="lg" centered>
          <Modal.Body
            style={{
              position: "relative",
              height: "0",
              paddingBottom: "56.25%"
            }}
          >
            <iframe
              title="Dynamic video content related to above title"
              src={props.src}
              loading="lazy"
              allow="autoplay"
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%"
              }}
              allowfullscreen
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default Vidal;
