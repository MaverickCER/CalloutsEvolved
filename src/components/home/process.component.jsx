import FadeSVG from "../../assets/fade.svg";
import Vidal from "../interface/vidal.component";
import gamerGrandma from "../../assets/gamergrandma.png";
import gamerBaby from "../../assets/gamerbaby.png";
import gamerGirl from "../../assets/gamergirl.png";
import gamerBoy from "../../assets/gamerboy.png";

const Process = () => {
  return (
    <div id="process">
      <FadeSVG className="fadesvg" />
      <h2 style={{ margin: "0 auto 4rem", position: "relative", zIndex: "2" }}>
        Quick & Easy Process
      </h2>
      <p style={{ maxWidth: "33.8rem", position: "relative", zIndex: "2" }}>
        These days, everyone from 3 years old to 70 years young is picking up a
        controller, so we made it easy for them!
      </p>
      <div className="row">
        <div className="col">
          <div className="subrow">
            <img
              src={gamerGrandma}
              alt="Gamer Grandma"
              title="Gamer Grandma"
            />
            <p>I can join you in 4 clicks</p>
          </div>
          <div className="subrow">
            <img
              src={gamerGirl}
              alt="Gamer Girl"
              title="Gamer Girl"
            />
            <p>I can focus on the game</p>
          </div>
        </div>
        <div className="col">
          <div className="subrow">
            <img
              src={gamerBaby}
              alt="Gamer Baby"
              title="Gamer Baby"
            />
            <p>I don’t need an account</p>
          </div>
          <div className="subrow">
            <img
              src={gamerBoy}
              alt="Gamer Boy"
              title="Gamer Boy"
            />
            <p>I can keep playing my way</p>
          </div>
        </div>
      </div>
      <div style={{ margin: "auto", position: "relative", zIndex: "2" }}>
        <Vidal
          src="https://www.youtube.com/embed/0gIMe90QHD8?autoplay=1"
          label="&#9658; See how easy it is"
          style={{
            display: "inline-block",
            color: "var(--modeAccent)",
            cursor: "pointer"
          }}
        />
      </div>
    </div>
  );
};

export default Process;
