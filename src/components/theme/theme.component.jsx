import React from "react";
import { connect } from "react-redux";
import { setOptionsData } from "../../redux/options/options.actions";
import { getOptionsData } from "../../redux/options/options.selectors";
import { Button, Form, InputGroup, Dropdown } from "react-bootstrap";
import Colors from "./colors.component";

const Theme = (props) => {
  // To set grid layout
  const setLayout = (val) => {
    var layoutData = JSON.parse(JSON.stringify(props.optionsData));
    layoutData.shc = val;
    props.setOptionsData(layoutData);
  };

  // To set grid background
  const setBackground = (val) => {
    var backgroundData = JSON.parse(JSON.stringify(props.optionsData));
    backgroundData.bkg = val;
    props.setOptionsData(backgroundData);
  };

  // To set modes
  const setGlobalMode = (val) => {
    var modeData = JSON.parse(JSON.stringify(props.optionsData));
    modeData.mod = val;
    props.setOptionsData(modeData);
  };

  // To set font size
  const setRootFontSize = (event) => {
    const { value } = event.target;
    var fontSizeData = JSON.parse(JSON.stringify(props.optionsData));
    fontSizeData.tpx = value + "px";
    props.setOptionsData(fontSizeData);
  };

  return (
    <React.Fragment>
      <div>
        <span>Layout:</span>
        <Dropdown className="mt-1">
          <Dropdown.Toggle
            variant="accent"
            id="layoutSelect"
            block
            style={{ width: "100%" }}
          >
            {props.optionsData.shc.charAt(0).toUpperCase() +
              props.optionsData.shc.slice(1)}
          </Dropdown.Toggle>

          <Dropdown.Menu variant={props.optionsData.mod}>
            <Dropdown.Item onClick={() => setLayout("touch")}>
              Touch
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setLayout("keyboard")}>
              Keyboard
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setLayout("numberpad")}>
              Numberpad
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="mt-3">
        <span>Background:</span>
        <Dropdown className="mt-1">
          <Dropdown.Toggle
            id="backgroundSelect"
            variant="accent"
            block
            style={{ width: "100%" }}
          >
            {props.optionsData.bkg.charAt(0).toUpperCase() +
              props.optionsData.bkg.slice(1)}
          </Dropdown.Toggle>

          <Dropdown.Menu variant={props.optionsData.mod}>
            <Dropdown.Item onClick={() => setBackground("solid")}>
              Solid
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setBackground("waves")}>
              Waves
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="mt-3">
        <span>Mode:</span>
        {props.optionsData.mod === "dark" ? (
          <div
            className="mt-1"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridGap: "1rem"
            }}
          >
            <div
              style={{
                display: "grid",
                placeContent: "center",
                background: "var(--modeSecondary)"
              }}
            >
              Dark
            </div>
            <Button
              type="button"
              variant="accent"
              onClick={() => setGlobalMode("light")}
            >
              Light
            </Button>
          </div>
        ) : (
          <div
            className="mt-1"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridGap: "1rem"
            }}
          >
            <Button
              variant="accent"
              type="button"
              onClick={() => setGlobalMode("dark")}
            >
              Dark
            </Button>
            <div
              style={{
                display: "grid",
                placeContent: "center",
                background: "var(--modeSecondary)"
              }}
            >
              Light
            </div>
          </div>
        )}
      </div>
      <Form.Group className="mt-3" controlId="fontSizeRange">
        <Form.Label className="mb-1">Font Size:</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            type="number"
            name="tsp"
            aria-label="Font Size in pixels"
            value={parseInt(props.optionsData.tpx, 10)}
            onChange={setRootFontSize}
            placeholder={props.optionsData.tpx}
            min={4}
            max={72}
          />
          <InputGroup.Text>px</InputGroup.Text>
        </InputGroup>
      </Form.Group>
      <Colors />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  optionsData: getOptionsData(state)
});

const mapDispatchToProps = (dispatch) => ({
  setOptionsData: (data) => dispatch(setOptionsData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Theme);
