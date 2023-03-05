import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setOptionsData } from "../../redux/options/options.actions";
import { getOptionsData } from "../../redux/options/options.selectors";
import { Form, Dropdown } from "react-bootstrap";

const Desktop = (props) => {
  const handleClick = (val) => {
    let data = JSON.parse(JSON.stringify(props.optionsData));
    data.shc = val;
    props.setOptionsData(data);
  };

  const handleClick1 = (val) => {
    let data = JSON.parse(JSON.stringify(props.optionsData));
    data.dgc = val;
    props.setOptionsData(data);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let data = JSON.parse(JSON.stringify(props.optionsData));
    if (value === "None") {
      if(name === "dst") {
        data.dst = "";
      } else if(name === "dsm") {
        data.dsm = "touch";
      } else if(name === "doc") {
        data.doc = "";
      } else if(name === "dsc") {
        data.dsc = "";
      } else if(name === "dcc") {
        data.dcc = "";
      } else {
        data.ddc = 0;
      }
    } else {
      if(name === "dst") {
        data.dst = value;
      } else if(name === "dsm") {
        data.dsm = value;
      } else if(name === "doc") {
        data.doc = value;
      } else if(name === "dsc") {
        data.dsc = value;
      } else if(name === "dcc") {
        data.dcc = value;
      } else {
        data.ddc = value;
      }
    }
    props.setOptionsData(data);
  };

  return (
    <>
      <Form.Group controlId="dsmInput">
        <Form.Label className="mb-1">Send In-Game Messages:</Form.Label>
        <Dropdown>
          <Dropdown.Toggle
            variant="accent"
            block
            style={{ width: "100%" }}
          >
            {props.optionsData.dgc.charAt(0).toUpperCase() +
              props.optionsData.dgc.slice(1)}
          </Dropdown.Toggle>
          <Dropdown.Menu variant={props.optionsData.dgc}>
            <Dropdown.Item onClick={() => handleClick1("yes")}>
              Yes
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick1("no")}>
              No
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>
      <Form.Group controlId="dstInput">
        <Form.Label className="mt-3 mb-1">Shortcut Toggle: `</Form.Label>
        <Form.Control
          type="text"
          name="dst"
          value={props.optionsData.dst}
          onChange={handleChange}
          placeholder=""
        />
      </Form.Group>
      <Form.Group controlId="dsmInput">
        <Form.Label className="mt-3 mb-1">Shortcuts Mode:</Form.Label>
        <Dropdown>
          <Dropdown.Toggle
            variant="accent"
            block
            style={{ width: "100%" }}
          >
            {props.optionsData.shc.charAt(0).toUpperCase() +
              props.optionsData.shc.slice(1)}
          </Dropdown.Toggle>
          <Dropdown.Menu variant={props.optionsData.mod}>
            <Dropdown.Item onClick={() => handleClick("touch")}>
              Touch
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("keyboard")}>
              Keyboard
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("numberpad")}>
              Numberpad
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>
      <Form.Group controlId="docInput">
        <Form.Label className="mt-3 mb-1">Open Chat: T</Form.Label>
        <Form.Control
          type="text"
          name="doc"
          value={props.optionsData.doc}
          onChange={handleChange}
          placeholder=""
        />
      </Form.Group>
      <Form.Group controlId="dscInput">
        <Form.Label className="mt-3 mb-1">Send Chat: Enter</Form.Label>
        <Form.Control
          type="text"
          name="dsc"
          value={props.optionsData.dsc}
          onChange={handleChange}
          placeholder=""
        />
      </Form.Group>
      <Form.Group controlId="dccInput">
        <Form.Label className="mt-3 mb-1">Close Chat: Y</Form.Label>
        <Form.Control
          type="text"
          name="dcc"
          value={props.optionsData.dcc}
          onChange={handleChange}
          placeholder=""
        />
      </Form.Group>
      <Form.Group controlId="ddcInput">
        <Form.Label className="mt-3 mb-1">Chat Delay: 250</Form.Label>
        <Form.Control
          type="number"
          name="ddc"
          value={props.optionsData.ddc}
          onChange={handleChange}
          placeholder=""
          min={0}
          max={1000}
          step={1}
        />
      </Form.Group>
    </>
  );
};

const mapStateToProps = (state) => ({
  optionsData: getOptionsData(state)
});

const mapDispatchToProps = (dispatch) => ({
  setOptionsData: (data) => dispatch(setOptionsData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Desktop);
