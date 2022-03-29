import React from "react";
import { Link } from "react-router-dom";
import Vidal from "../interface/vidal.component";
import HeroSVG from "../../assets/hero.svg";

const Hero = () => {
  return (
    <div id="hero">
      <div className="row reverse">
        <div>
          <HeroSVG />
        </div>
        <div>
          <h1>Better callouts for multiplayer games</h1>
          <p>
            A video game companion app that provides assistive and augmentative communication for disabled gamers and an audio focused experience for everyone else.
          </p>
          <div>
            <Link
              to="/getstarted"
              className="btn btn-accent"
              style={{ marginRight: "2rem" }}
            >
              Get Started
            </Link>
            <Vidal
              src="https://www.youtube.com/embed/0gIMe90QHD8?autoplay=1"
              label="&#9658; Check it out"
              style={{
                display: "inline-block",
                color: "var(--modeAccent)",
                cursor: "pointer",
                maxHeight: "100vh"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
