import React from "react";
import { Link } from "react-router-dom";
import LogoSVG from "../../assets/logo.svg";

const Header = (props) => {
  return (
    <header>
      <div>
        <div>
          <LogoSVG />
          <Link to="/">Callouts&nbsp;Evolved</Link>
        </div>
        <nav>
          <ul>{props.children}</ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
