import { Link } from "react-router-dom";
import LogoSVG from "../../assets/logo.svg";

const CallToAction = () => {
  return (
    <div id="calltoaction">
      <div className="row">
        <div>
          <h3>
            Join 1000s of gamers to augment mic based coms and make gaming more
            accessible
          </h3>
          <div>
            <Link to="/getstarted" className="btn btn-accent">
              Get This
            </Link>
          </div>
        </div>
        <div>
          <LogoSVG />
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
