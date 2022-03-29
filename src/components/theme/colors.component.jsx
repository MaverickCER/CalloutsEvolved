import React, { useState, useContext } from "react";
import { connect } from "react-redux";
import { setOptionsData } from "../../redux/options/options.actions";
import { getOptionsData } from "../../redux/options/options.selectors";
import { Button, Accordion } from "react-bootstrap";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import { HexColorPicker } from "react-colorful";

export function ContextAwareToggle({ variant, children, eventKey, callback, size }) {
  const activeEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Button
      className={isCurrentEventKey ? "active" : ""}
      onClick={decoratedOnClick}
      variant={variant}
      style={{ width: "100%" }}
      size={size ? size : "md"}
      block
    >
      {children}
    </Button>
  );
}

function hexToRgb(hex) {
  if (hex.length > 7) return hex;
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex),
    r = parseInt(result[1], 16),
    g = parseInt(result[2], 16),
    b = parseInt(result[3], 16);
  return `${r}, ${g}, ${b}`;
}

function rgbToHex(color) {
  if (color.length < 7) return color;
  var nums = color.split(", "),
    r = parseInt(nums[0], 10).toString(16),
    g = parseInt(nums[1], 10).toString(16),
    b = parseInt(nums[2], 10).toString(16);
  return (
    "#" +
    ((r.length === 1 ? "0" + r : r) +
      (g.length === 1 ? "0" + g : g) +
      (b.length === 1 ? "0" + b : b))
  );
}

function lumens(color) {
  var nums = hexToRgb(color).split(", "),
    r = parseInt(nums[0], 10),
    g = parseInt(nums[1], 10),
    b = parseInt(nums[2], 10),
    lum = (r * 299 + g * 587 + b * 114) / 1000;
  if (lum >= 128) {
    return true;
  } else {
    return false;
  }
}

const Colors = (props) => {
  const [color1, setColor1] = useState(rgbToHex(props.optionsData.col.danger));
  const [color2, setColor2] = useState(rgbToHex(props.optionsData.col.warning));
  const [color3, setColor3] = useState(rgbToHex(props.optionsData.col.info));
  const [color4, setColor4] = useState(rgbToHex(props.optionsData.col.success));
  const [color5, setColor5] = useState(rgbToHex(props.optionsData.col.primary));
  const [color6, setColor6] = useState(
    rgbToHex(props.optionsData.col.secondary)
  );

  // To set color profile
  const setColor = (hue, color) => {
    var themeData = JSON.parse(JSON.stringify(props.optionsData));
    lumens(hue)
      ? (themeData.col[color + "T"] = "0, 0, 0")
      : (themeData.col[color + "T"] = "255, 255, 255");
    themeData.col[color] = hexToRgb(hue);
    props.setOptionsData(themeData);
  };

  return (
    <>
      <div className="mt-3">
        <span>Theme:</span>
        <Accordion className="pt-1 mb-2 pb-1">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridGap: "1rem",
              margin: "0"
            }}
          >
            <ContextAwareToggle variant="danger" eventKey="0">
              R
            </ContextAwareToggle>
            <ContextAwareToggle variant="warning" eventKey="1">
              O
            </ContextAwareToggle>
            <ContextAwareToggle variant="info" eventKey="2">
              Y
            </ContextAwareToggle>
            <ContextAwareToggle variant="success" eventKey="3">
              G
            </ContextAwareToggle>
            <ContextAwareToggle variant="primary" eventKey="4">
              B
            </ContextAwareToggle>
            <ContextAwareToggle variant="secondary" eventKey="5">
              I
            </ContextAwareToggle>
          </div>
          <div>
            <Accordion.Collapse className="hcpWrapper mt-3" eventKey="0">
              <>
                <HexColorPicker color={color1} onChange={setColor1} />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridGap: "1rem",
                    marginTop: "1rem"
                  }}
                >
                  <Button
                    type="button"
                    variant="accent"
                    onClick={() => setColor(color1, "danger")}
                  >
                    Apply
                  </Button>
                  <Button
                    type="button"
                    variant="accent"
                    onClick={() => {
                      setColor1("#e90044");
                      setColor("#e90044", "danger");
                    }}
                  >
                    Default
                  </Button>
                </div>
              </>
            </Accordion.Collapse>
            <Accordion.Collapse className="hcpWrapper mt-3" eventKey="1">
              <>
                <HexColorPicker color={color2} onChange={setColor2} />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridGap: "1rem",
                    marginTop: "1rem"
                  }}
                >
                  <Button
                    type="button"
                    variant="accent"
                    onClick={() => setColor(color2, "warning")}
                  >
                    Apply
                  </Button>
                  <Button
                    type="button"
                    variant="accent"
                    onClick={() => {
                      setColor2("#cd4a00");
                      setColor("#cd4a00", "warning");
                    }}
                  >
                    Default
                  </Button>
                </div>
              </>
            </Accordion.Collapse>
            <Accordion.Collapse className="hcpWrapper mt-3" eventKey="2">
              <>
                <HexColorPicker color={color3} onChange={setColor3} />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridGap: "1rem",
                    marginTop: "1rem"
                  }}
                >
                  <Button
                    type="button"
                    variant="accent"
                    onClick={() => setColor(color3, "info")}
                  >
                    Apply
                  </Button>
                  <Button
                    type="button"
                    variant="accent"
                    onClick={() => {
                      setColor3("#897600");
                      setColor("#897600", "info");
                    }}
                  >
                    Default
                  </Button>
                </div>
              </>
            </Accordion.Collapse>
            <Accordion.Collapse className="hcpWrapper mt-3" eventKey="3">
              <>
                <HexColorPicker color={color4} onChange={setColor4} />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridGap: "1rem",
                    marginTop: "1rem"
                  }}
                >
                  <Button
                    type="button"
                    variant="accent"
                    onClick={() => setColor(color4, "success")}
                  >
                    Apply
                  </Button>
                  <Button
                    type="button"
                    variant="accent"
                    onClick={() => {
                      setColor4("#008a25");
                      setColor("#008a25", "success");
                    }}
                  >
                    Default
                  </Button>
                </div>
              </>
            </Accordion.Collapse>
            <Accordion.Collapse className="hcpWrapper mt-3" eventKey="4">
              <>
                <HexColorPicker color={color5} onChange={setColor5} />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridGap: "1rem",
                    marginTop: "1rem"
                  }}
                >
                  <Button
                    type="button"
                    variant="accent"
                    onClick={() => setColor(color5, "primary")}
                  >
                    Apply
                  </Button>
                  <Button
                    type="button"
                    variant="accent"
                    onClick={() => {
                      setColor5("#0071f1");
                      setColor("#0071f1", "primary");
                    }}
                  >
                    Default
                  </Button>
                </div>
              </>
            </Accordion.Collapse>
            <Accordion.Collapse className="hcpWrapper mt-3" eventKey="5">
              <>
                <HexColorPicker color={color6} onChange={setColor6} />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridGap: "1rem",
                    marginTop: "1rem"
                  }}
                >
                  <Button
                    type="button"
                    variant="accent"
                    onClick={() => setColor(color6, "secondary")}
                  >
                    Apply
                  </Button>
                  <Button
                    type="button"
                    variant="accent"
                    onClick={() => {
                      setColor6("#9d46ec");
                      setColor("#9d46ec", "secondary");
                    }}
                  >
                    Default
                  </Button>
                </div>
              </>
            </Accordion.Collapse>
          </div>
        </Accordion>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  optionsData: getOptionsData(state)
});

const mapDispatchToProps = (dispatch) => ({
  setOptionsData: (data) => dispatch(setOptionsData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Colors);
