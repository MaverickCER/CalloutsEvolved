import React from "react";
import { Anonymous, Recover, SignIn, SignUp } from "../auth/auth.collection";
import CoopSVG from "../../assets/coop.svg";
import { useParams } from "react-router-dom";

const GetStarted = ({ variant }) => {
  const { id } = useParams();
  const [view, setView] = React.useState(variant);
  const renderSwitch = (param) => {
    switch (param) {
      case "signin":
        return (
          <>
            <h2 className="mb-3">Sign In</h2>
            <SignIn />
            <p className="mt-4">
              Don't have an account?{" "}
              <u onClick={() => setView("signup")}>Sign Up</u>
            </p>
            <p>
              Forgot Password? <u onClick={() => setView("recover")}>Recover</u>
            </p>
          </>
        );
      case "signup":
        return (
          <>
            <h2 className="mb-3">Sign Up</h2>
            <SignUp />
            {id ? (
              <p className="mt-4">
                Don't want to sign up?{" "}
                <u onClick={() => setView("anonymous")}>Anonymous</u>
              </p>
            ) : (
              <div className="pt-3"></div>
            )}
            <p>
              Have an account? <u onClick={() => setView("signin")}>Sign In</u>
            </p>
          </>
        );
      case "recover":
        return (
          <>
            <h2 className="mb-3">Recover</h2>
            <Recover />
            <p className="mt-4">
              Don't have an account?{" "}
              <u onClick={() => setView("signup")}>Sign Up</u>
            </p>
            <p>
              Remember Password?{" "}
              <u onClick={() => setView("signin")}>Sign In</u>
            </p>
          </>
        );
      default:
        return (
          <>
            <h2 className="mb-3">Anonymous</h2>
            <Anonymous />
            <p className="mt-4">
              Want full access? <u onClick={() => setView("signup")}>Sign Up</u>
            </p>
            <p>
              Have an account? <u onClick={() => setView("signin")}>Sign In</u>
            </p>
          </>
        );
    }
  };

  return (
    <div id="getstarted">
      <div className="row reverse">
        <div
          style={{
            display: "grid",
            maxWidth: "32rem",
            justifyContent: "center"
          }}
        >
          <h3>Welcome!</h3>
          <p>
            Callouts Evolved is an AAC device that improves microphone based
            communication for gamers without altering the status quo.
          </p>
          <CoopSVG />
        </div>
        <div>{renderSwitch(view)}</div>
      </div>
    </div>
  );
};

export default GetStarted;
