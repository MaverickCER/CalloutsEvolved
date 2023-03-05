import React from "react";
import useWindowDimensions from "../../utils/window.util";
import { Accordion, Button } from "react-bootstrap";
import { ContextAwareToggle } from "../theme/colors.component";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import STTOutput from "../audio/sttoutput.component";
import Chat from "../chat/chat.component";
import Callouts from "../callouts/callouts.component";
import Session from "../session/session.component";
import Theme from "../theme/theme.component";
import Audio from "../audio/audio.component";
import User from "../user/user.component";
import Social from "../social/social.component";
import More from "../more/more.component";
import Desktop from "../desktop/desktop.component";
import Grid from "../callouts/grid.component";
import History from "../callouts/history.component";
import Adsense from "../interface/adsense.component";
import { auth } from "../../utils/firebase.util";

export const CustomToggle = ({ variant, children, eventKey, callback }) => {
  const activeEventKey = React.useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Button
      className={isCurrentEventKey ? "btn btn-accent active" : "btn btn-link"}
      onClick={decoratedOnClick}
      variant={variant}
      style={{ width: "100%", textDecoration: "none", height: "2rem" }}
      size="sm"
      block
    >
      {children}
    </Button>
  );
};

const Sidebar = () => {
  const { width } = useWindowDimensions();
  return (
    <>
      <h2 className="text-center">Callouts Evolved</h2>
      <Accordion defaultActiveKey="0" className="inner">
        <div className="innerGrid">
          <CustomToggle variant="accent" eventKey="0">
            Chat
          </CustomToggle>
          <CustomToggle variant="accent" eventKey="1">
            Settings
          </CustomToggle>
          <CustomToggle variant="accent" eventKey="2">
            Callouts
          </CustomToggle>
        </div>
        <div>
          <Accordion.Collapse eventKey="0">
            <>
              <Accordion defaultActiveKey="3">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    marginBottom: "1rem"
                  }}
                >
                  <ContextAwareToggle variant="accent" eventKey="3" size="sm">
                    Speech to Text
                  </ContextAwareToggle>
                  <Accordion.Collapse className="p-3" eventKey="3">
                    <>
                      <STTOutput />
                    </>
                  </Accordion.Collapse>
                </div>
              </Accordion>
              <Accordion defaultActiveKey="4">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    marginBottom: "1rem"
                  }}
                >
                  <ContextAwareToggle variant="accent" eventKey="4" size="sm">
                    History
                  </ContextAwareToggle>
                  <Accordion.Collapse className="p-3 pb-0" eventKey="4">
                    <History />
                  </Accordion.Collapse>
                </div>
              </Accordion>
              <Accordion defaultActiveKey="5">
                <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                  <ContextAwareToggle variant="accent" eventKey="5" size="sm">
                    Messages
                  </ContextAwareToggle>
                  <Accordion.Collapse className="p-3 pb-0" eventKey="5">
                    <>
                      <Chat />
                    </>
                  </Accordion.Collapse>
                </div>
              </Accordion>
            </>
          </Accordion.Collapse>
          <Accordion.Collapse eventKey="1">
            <>
              <Accordion defaultActiveKey="7">
                <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                  {auth.currentUser === null ? null : auth.currentUser.email ===
                    null ? null : (
                    <div
                      style={{
                        marginBottom: "1rem",
                        display: "grid",
                        gridTemplateColumns: "1fr"
                      }}
                    >
                      <ContextAwareToggle variant="accent" eventKey="6">
                        Session
                      </ContextAwareToggle>
                      <Accordion.Collapse className="p-3" eventKey="6">
                        <>
                          <Session />
                        </>
                      </Accordion.Collapse>
                    </div>
                  )}
                  {auth.currentUser === null ? null : auth.currentUser.email ===
                    null ? null : (
                    <div
                      style={{
                        marginBottom: "1rem",
                        display: "grid",
                        gridTemplateColumns: "1fr"
                      }}
                    >
                      <ContextAwareToggle variant="accent" eventKey="7">
                        Callouts
                      </ContextAwareToggle>
                      <Accordion.Collapse className="p-3" eventKey="7">
                        <>
                          <Callouts />
                        </>
                      </Accordion.Collapse>
                    </div>
                  )}
                  <div
                    style={{
                      marginBottom: "1rem",
                      display: "grid",
                      gridTemplateColumns: "1fr"
                    }}
                  >
                    <ContextAwareToggle variant="accent" eventKey="8">
                      Appearance
                    </ContextAwareToggle>
                    <Accordion.Collapse className="p-3" eventKey="8">
                      <>
                        <Theme />
                      </>
                    </Accordion.Collapse>
                  </div>
                  <div
                    style={{
                      marginBottom: "1rem",
                      display: "grid",
                      gridTemplateColumns: "1fr"
                    }}
                  >
                    <ContextAwareToggle variant="accent" eventKey="9">
                      Audio
                    </ContextAwareToggle>
                    <Accordion.Collapse className="p-3" eventKey="9">
                      <>
                        <Audio />
                      </>
                    </Accordion.Collapse>
                  </div>
                  {auth.currentUser === null ? null : auth.currentUser.email ===
                    null ? null : (
                    <div
                      style={{
                        marginBottom: "1rem",
                        display: "grid",
                        gridTemplateColumns: "1fr"
                      }}
                    >
                      <ContextAwareToggle variant="accent" eventKey="10">
                        Account
                      </ContextAwareToggle>
                      <Accordion.Collapse className="p-3" eventKey="10">
                        <>
                          <User />
                        </>
                      </Accordion.Collapse>
                    </div>
                  )}
                  {auth.currentUser === null ? null : auth.currentUser.email ===
                    null ? null : (
                    <div
                      style={{
                        marginBottom: "1rem",
                        display: "grid",
                        gridTemplateColumns: "1fr"
                      }}
                    >
                      <ContextAwareToggle variant="accent" eventKey="11">
                        Social
                      </ContextAwareToggle>
                      <Accordion.Collapse className="p-3" eventKey="11">
                        <>
                          <Social />
                        </>
                      </Accordion.Collapse>
                    </div>
                  )}
                  {localStorage.getItem('ce') === 'true' && (
                    <div
                      style={{
                        marginBottom: "1rem",
                        display: "grid",
                        gridTemplateColumns: "1fr"
                      }}
                    >
                      <ContextAwareToggle variant="accent" eventKey="12">
                        Desktop
                      </ContextAwareToggle>
                      <Accordion.Collapse className="p-3" eventKey="12">
                        <>
                          <Desktop />
                        </>
                      </Accordion.Collapse>
                    </div>
                  )}
                  <div
                    style={{
                      marginBottom: "1rem",
                      display: "grid",
                      gridTemplateColumns: "1fr"
                    }}
                  >
                    <ContextAwareToggle variant="accent" eventKey="13">
                      More
                    </ContextAwareToggle>
                    <Accordion.Collapse className="p-3" eventKey="13">
                      <>
                        <More />
                      </>
                    </Accordion.Collapse>
                  </div>
                </div>
              </Accordion>
            </>
          </Accordion.Collapse>
          {width < 601 ? (
            <Accordion.Collapse eventKey="2">
              <>
                <Grid />
              </>
            </Accordion.Collapse>
          ) : null}
        </div>
        <Adsense />
      </Accordion>
    </>
  );
};

export default Sidebar;
