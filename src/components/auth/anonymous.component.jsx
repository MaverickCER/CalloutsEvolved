import React from "react";
import useForm from "../../utils/useform.util";
import { Form } from "react-bootstrap";
import NoCaptcha from "./no-captcha.component";
import { auth } from "../../utils/firebase.util";
import Present from "../interface/present.compontent";
import PrivacyPolicy from "../interface/privacypolicy.component";
import TermsOfService from "../interface/termsofservice.component";

const Anonymous = () => {
  const [events, setEvents] = React.useState("No Captcha - Hold to Submit!");
  const required = ["displayName", "tos"];

  const anonymousLogin = () => {
    var anonymousname = `anonymous ${values.displayName}`;
    if (auth.currentUser) {
      if (auth.currentUser.displayName) {
        if (auth.currentUser.displayName.startsWith("anonymous")) {
          auth.currentUser.delete().then(() => {
            setTimeout(() => {
              auth
                .signInAnonymously()
                .then((userAuth) => {
                  userAuth.user.updateProfile({ displayName: anonymousname });
                })
                .catch((e) => {
                  handleError(e.message);
                });
            }, 0);
          });
        }
      }
    } else {
      setTimeout(() => {
        auth
          .signInAnonymously()
          .then((userAuth) => {
            userAuth.user.updateProfile({ displayName: anonymousname });
          })
          .catch((e) => {
            handleError(e.message);
          });
      }, 0);
    }
  };

  const getLocalStream = () => {
    if (window?.chrome) {
      navigator.permissions
        .query({ name: "microphone" })
        .then(function (permissionStatus) {
          if (permissionStatus.state === "granted") {
            anonymousLogin();
          } else {
            navigator.mediaDevices
              .getUserMedia({ audio: true })
              .then(() => {
                anonymousLogin();
              })
              .catch((err) => {
                anonymousLogin();
              });
          }
        });
    } else {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => {
          anonymousLogin();
        })
        .catch((err) => {
          anonymousLogin();
        });
    }
  };

  const { values, errors, handleChange, handleError, handleSubmit } = useForm(
    getLocalStream,
    required
  );

  return (
    <>
      <p className="mb-0">
        Note: When you submit the form below, we will ask for microphone
        permission. Please allow access so we can provide the best experience.
      </p>
      <details>
        <summary className="mt-0">Why?</summary>
        <div>
          <p className="mt-0">
            One of the primary features of Callouts Evolved incorperates speech
            commands and speech recognition.
          </p>
          <p>
            Speech commands will trigger callouts when you say the text on any
            button. This ensures that our hearing impaired users never miss a
            callout.
          </p>
          <p>
            Speech recognition displays the last 100 characters of your speech.
            This allows our users to participate in conversations and enjoy the
            more social aspects of gaming.
          </p>
          <p className="mb-0">
            Privacy is our primary concern though. Only the last 100 characters
            are saved. The speech recognition service is powered by the Web
            Speech API and your voice is never recorded or sent to our servers.
            Your mic will be muted when you join, and you can mute yourself
            again at any time.
          </p>
        </div>
      </details>
      <form noValidate className="mt-3">
        {errors.auth && <p className="form-error">{errors.auth}</p>}
        {errors.displayName && (
          <p className="form-error">{errors.displayName}</p>
        )}
        {errors.tos && <p className="form-error">{errors.tos}</p>}
        <Form.Group controlId="displayName">
          <Form.Label className="mb-1">Display Name:</Form.Label>
          <Form.Control
            type="name"
            name="displayName"
            value={values.displayName || ""}
            onChange={handleChange}
            placeholder="Enter your display name"
          />
        </Form.Group>
        <Form.Group
          controlId="checkbox"
          style={{ marginTop: "0", marginBottom: "0" }}
        >
          <Form.Check
            type="checkbox"
            name="tos"
            value={values.tos || ""}
            onChange={handleChange}
            className="pt-1"
            required
            label={
              <div className="pb-3 mb-0">
                <span>Agree to </span>
                <Present
                  label="TOS"
                  title="Terms of Service"
                  style={{
                    textDecoration: "underline",
                    color: "var(--modeAccent)"
                  }}
                >
                  <TermsOfService />
                </Present>
                <span> and </span>
                <Present
                  label="Privacy Policy"
                  title="Privacy Policy"
                  style={{
                    textDecoration: "underline",
                    color: "var(--modeAccent)"
                  }}
                >
                  <PrivacyPolicy />
                </Present>
              </div>
            }
          />
        </Form.Group>
        <NoCaptcha
          className="mt-0"
          style={{ width: "100%" }}
          variant="accent"
          time={2}
          onStart={() => setEvents("KEEP HOLDING")}
          onHold={() => setEvents("RELEASE!")}
          onEnd={(e, enough) => {
            if (enough === true) {
              handleSubmit();
              if (Object.keys(errors).length === 0) {
                setEvents("Success...");
              } else {
                setEvents("Incomplete Form");
              }
            } else {
              setEvents("No Captcha - Hold to Submit");
            }
          }}
        >
          {events}
        </NoCaptcha>
      </form>
    </>
  );
};

export default Anonymous;
