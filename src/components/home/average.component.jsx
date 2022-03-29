import ControllerSVG from "../../assets/controller.svg";

const Average = () => {
  return (
    <div id="average">
      <div className="row reverse">
        <div>
          <ControllerSVG />
        </div>
        <div>
          <h5>Effortless Communication for</h5>
          <h2>Average Gamers</h2>
          <p>
            Mic required has become an unwritten requirement in multiplayer
            gaming communities. No-mics, squeakers, and gamers with disabilities
            are often excluded as a result.
          </p>
          <h5>Let's Change That</h5>
          <p>
            Speech synthesis allows you to make callouts free from judgement,
            age descrimination, and harrasment.
          </p>
          <h5>And Go Beyond</h5>
          <p>
            Speech commands trigger visual communication aids to ensure that
            everyone recieves the appropriate callout.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Average;
