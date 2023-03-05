import React from "react";
import { connect } from "react-redux";
import { Accordion } from "react-bootstrap";
import { ContextAwareToggle } from "../theme/colors.component";
import { auth } from "../../utils/firebase.util";
import Donate from "./donate.component";
import Subscribe from "./subscribe.component";
import Unsubscribe from "./unsubscribe.component";
import Present from "../interface/present.compontent";
import PrivacyPolicy from "../interface/privacypolicy.component";
import TermsOfService from "../interface/termsofservice.component";
import { getOptionsData } from "../../redux/options/options.selectors";

const More = (props) => {
  return (
    <div>
      {localStorage.getItem('ce') !== 'true' && (
        <>
          <h5 className="mb-1">Desktop App:</h5>
          <div
            className='mb-3'
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              alignItems: "center"
            }}
          >
            <a href="https://drive.google.com/uc?export=download&id=1koAIS7BI9TaG9bGxB1oz9p_6-U_pmb2P" target="_blank" rel="noreferrer" className="btn-accent">Download</a>
          </div>
        </>
      )}
      <h5 className="mb-1">Extensions:</h5>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          alignItems: "center"
        }}
      >
        <a href="https://www.example.com" className="btn-accent">
          Discord
        </a>
      </div>
      <h5 className="mb-1 mt-3">Community:</h5>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gridGap: "1rem"
        }}
      >
        <a
          href="https://www.reddit.com/r/calloutsevolved"
          className="btn-accent"
        >
          Reddit
        </a>
        <a
          href="https://www.discord.com/invite/xPDVfsAegn"
          className="btn-accent"
        >
          Discord
        </a>
        <a href="https://twitter.com/MaverickCER" className="btn-accent">
          Twitter
        </a>
        <a
          href="https://www.youtube.com/channel/UCP22j_0us5Hqsdast6qYHzg"
          className="btn-accent"
        >
          YouTube
        </a>
      </div>
      {auth.currentUser === null ? null : auth.currentUser.email === null ? (
        <Donate />
      ) : (
        <>
          <h5 className="mb-1 mt-3">MVP (Access Pass):</h5>
          <Accordion defaultActiveKey="0" className="inner">
            <div className="mb-3">
              <ContextAwareToggle variant="accent" eventKey="40">
                {props.optionsData.ppi === "FREE" ? (
                  <>Lifetime Account!</>
                ) : props.optionsData.ppi ? (
                  <>Cancel $2.99 / Month</>
                ) : (
                  <>$2.99 / Month</>
                )}
              </ContextAwareToggle>
            </div>
            <Accordion.Collapse eventKey="40">
              {props.optionsData.ppi === "FREE" ? (
                <p
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "center"
                  }}
                >
                  No Sub Required!
                </p>
              ) : props.optionsData.ppi ? (
                <Unsubscribe />
              ) : (
                <Subscribe />
              )}
            </Accordion.Collapse>
          </Accordion>
          <ul>
            <li>TTS Customization</li>
            <li>8 Extra Templates</li>
            <li>Quick Template Swap</li>
            <li>Soundbyte Callouts</li>
          </ul>
        </>
      )}
      <u className="mt-2">
        <Present label="Terms of Service" title="Terms of Service">
          <TermsOfService />
        </Present>
      </u>
      <br />
      <u className="mt-2">
        <Present label="Privacy Policy" title="Privacy Policy">
          <PrivacyPolicy />
        </Present>
      </u>
      <h6 className="text-center pt-5">© Copyright 2021 MaverickCER</h6>
    </div>
  );
};

const mapStateToProps = (state) => ({
  optionsData: getOptionsData(state)
});

export default connect(mapStateToProps, null)(More);
