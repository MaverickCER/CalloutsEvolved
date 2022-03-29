import GamersSVG from "../../assets/gamers.svg";

const Gamers = () => {
  return (
    <div id="gamers">
      <div className="row">
        <div>
          <GamersSVG />
        </div>
        <div>
          <h5>Success Ensured for</h5>
          <h2>All Gamers</h2>
          <p>
            Never again listen to an unruly fan, moms in the background, or
            teamsmates complain about being sniped for the umpteenth time.
          </p>
          <div>
            <ul>
              <li>
                <div>&#x2714;</div>
                <p>
                  16 custom callouts ensure communication is focused on the task
                  at hand.
                </p>
              </li>
              <li>
                <div>&#x2714;</div>
                <p>
                  Trigger any callout with speech commands, keyboard shortcuts,
                  or taps and clicks.
                </p>
              </li>
              <li>
                <div>&#x2714;</div>
                <p>
                  Each callout can provide speech synthesis and a visual
                  notification to everyone in the session.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamers;
