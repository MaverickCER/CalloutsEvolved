import React from "react";
import { connect } from "react-redux";
import useForm from "../../utils/useform.util";
import { Form } from "react-bootstrap";
import NoCaptcha from "./no-captcha.component";
import { auth, firestore } from "../../utils/firebase.util";
import { getOptionsData } from "../../redux/options/options.selectors";
import Present from "../interface/present.compontent";
import PrivacyPolicy from "../interface/privacypolicy.component";
import TermsOfService from "../interface/termsofservice.component";

const SignUp = (props) => {
  const [events, setEvents] = React.useState("No Captcha - Hold to Submit");
  const [show, setShow] = React.useState(false);
  const required = ["displayName", "email", "password", "tos"];
  const authSignUp = () => {
    auth
      .createUserWithEmailAndPassword(
        values.email.trim().toLowerCase(),
        values.password
      )
      .then((userCredential) => {
        var user = JSON.parse(JSON.stringify(userCredential.user));
        user.displayName = values.displayName;
        userCredential.user
          .updateProfile({ displayName: values.displayName })
          .then(() => {
            firestore.doc(`customers/${user.uid}`).set(
              {
                userData: {
                  cid: `${userCredential.user.displayName}`,
                  sid: "Solo",
                  ucc: "primary",
                  uid: `${user.uid}`
                }
              },
              { merge: true }
            );
            firestore.doc(`customers/${user.uid}/chaData/chat`).set(
              {
                cid: "[System]",
                msg: `Welcome to Callouts Evolved! The grid to the right has an introduction tutorial that should be read left to right, top to bottom. You can disabled Text to Speech by clicking Settings, Audio, Text to Speech Language, and then Disabled. `,
                ucc: "accent",
                uid: "0"
              },
              { merge: true }
            );
            firestore.doc(`customers/${user.uid}/sttData/${user.uid}`).set(
              {
                cid: `${userCredential.user.displayName}`,
                msg: "Muted...",
                ucc: "primary",
                uid: `${user.uid}`
              },
              { merge: true }
            );
            firestore.doc(`customers/${user.uid}/userData/lists`).set(
              {
                blacklist: [],
                whitelist: []
              },
              { merge: true }
            );
            firestore
              .doc(`customers/${userCredential.user.uid}/userData/options`)
              .set(props.optionsData, { merge: true });
            const nkb = [
              "Key",
              "7",
              "8",
              "O",
              "Y",
              "U",
              "I",
              "L",
              "H",
              "J",
              "K",
              "N",
              "M",
              "<",
              ">",
              "___",
              "ALT"
            ];
            const nnp = [
              "Key",
              "/",
              "*",
              "-",
              "7",
              "8",
              "9",
              "+",
              "4",
              "5",
              "6",
              "1",
              "2",
              "3",
              "E",
              "0",
              "•"
            ];
            const cal = [
              "Key",
              "Welcome to Callouts Evolved!",
              "There's a lot of features so let's get going.",
              "I am the third clickable button in this grid.",
              "Trigger buttons via click, tap, speech, or type.",
              "To the left you have the chat, which has 3 parts.",
              "Speech to Text allows you to speak to trigger callouts.",
              "History shows the most recent callouts.",
              "Messages is the basic text.",
              "Click on the Settings button to show more panes.",
              "The default pane is Callouts.",
              "In this pane you can customize these buttons.",
              "You can change callouts individually or all at once.",
              "Click on the Tutorial dropdown and then Terminology.",
              "Clicking Load now will change all callouts at once.",
              "You can either follow more guides like this, or...",
              "Poke around yourself before joining another session."
            ];
            for (var i = 0; i < 17; i++) {
              var alpha = (i + 10).toString(36).toUpperCase();
              var beta = {
                bid: `btnData${alpha}`,
                cal: `${cal[i]}`,
                cdt: "alert",
                col: "primary",
                dur: 2,
                nkb: `${nkb[i]}`,
                nnp: `${nnp[i]}`,
                ntp: i,
                udn: "",
                uid: "",
                utc: 0
              };
              var gamma = {
                bid: `btnData${alpha}`,
                cal: `Callout ${i}`,
                cdt: "alert",
                col: "primary",
                dur: 2,
                nkb: `${nkb[i]}`,
                nnp: `${nnp[i]}`,
                ntp: i,
                udn: "",
                uid: "",
                utc: 0
              };
              firestore
                .doc(
                  `customers/${userCredential.user.uid}/btnData/btnData${alpha}`
                )
                .set(beta, { merge: true });
              firestore
                .doc(
                  `customers/${user.uid}/saveData/saveData0/btnData/btnData${alpha}`
                )
                .set(gamma, { merge: true });
              firestore
                .doc(
                  `customers/${user.uid}/saveData/saveData1/btnData/btnData${alpha}`
                )
                .set(gamma, { merge: true });
            }
            auth.signInWithEmailAndPassword(values.email, values.password);
          });
      })
      .catch((e) => {
        handleError(e.message);
      });
  };

  const { values, errors, handleChange, handleError, handleSubmit } = useForm(
    authSignUp,
    required
  );

  return (
    <form noValidate>
      {errors.auth && <p className="form-error">{errors.auth}</p>}
      {errors.displayName && <p className="form-error">{errors.displayName}</p>}
      {errors.email && <p className="form-error">{errors.email}</p>}
      {errors.password && <p className="form-error">{errors.password}</p>}
      {/* {errors.confirmpassword && <p className="form-error">{errors.confirmpassword}</p>} */}
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
      <Form.Group controlId="email">
        <Form.Label className="mt-2 mb-1">Email:</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
          placeholder="Enter your email"
          autoComplete="off"
          required
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label className="mt-2 mb-1 pswrd">
          Password:
          <span onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</span>
        </Form.Label>
        <Form.Control
          type={!show ? "password" : "text"}
          name="password"
          value={values.password || ""}
          onChange={handleChange}
          placeholder="Enter your password"
          autoComplete="off"
          required
          style={{ marginBottom: 0 }}
        />
      </Form.Group>
      {/* <Form.Group controlId="confirmpassword">
        <Form.Label className="mt-2 mb-1">Password:</Form.Label>
        <Form.Control
          type="password"
          name="confirmpassword"
          value={values.confirmpassword || ""}
          onChange={handleChange}
          placeholder="Re-enter your password"
          autoComplete="off"
          required
        />
      </Form.Group> */}
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
  );
};

const mapStateToProps = (state) => ({
  optionsData: getOptionsData(state)
});

export default connect(mapStateToProps, null)(SignUp);
