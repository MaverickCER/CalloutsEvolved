import React from "react";
import { Link } from "react-router-dom";
import FadeSVG from "../../assets/fade.svg";
import GridSVG from "../../assets/grid.svg";
import SpeechSVG from "../../assets/speech.svg";
import KeySVG from "../../assets/key.svg";
import LFGSVG from "../../assets/lfg.svg";

const AAC = () => {
  return (
    <div id="aac">
      <h2 style={{ maxWidth: "24rem", margin: "0 auto 4rem" }}>
        Callouts Evolved is an AAC Built Specificially for You
      </h2>
      <div className="row">
        <div>
          <div>
            <GridSVG />
          </div>
          <h3>16 Callouts</h3>
          <p>Simplify communication for efficiency and clarity</p>
        </div>
        <div>
          <div>
            <SpeechSVG />
          </div>
          <h3>Speech Tech</h3>
          <p>Commands and Synthesis create a seemless experience</p>
        </div>
        <div>
          <div>
            <KeySVG />
          </div>
          <h3>Keyboard&nbsp;Shortcuts</h3>
          <p>Callout instantly without a mic or looking away</p>
        </div>
        <div>
          <div>
            <LFGSVG />
          </div>
          <h3>Looking&nbsp;for&nbsp;Group</h3>
          <p>Join like minded players from across the globe</p>
        </div>
      </div>
      <div style={{ margin: "auto", position: "relative", zIndex: "2" }}>
        <Link to="/getstarted" className="btn btn-accent mt-3">
          SIGN UP NOW
        </Link>
      </div>
      <FadeSVG className="fadesvg" />
    </div>
  );
};

export default AAC;
