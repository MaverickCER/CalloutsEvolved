import GameSVG from "../../assets/game.svg";

const Game = () => {
  return (
    <div id="game">
      <div className="row reverse">
        <div>
          <GameSVG />
        </div>
        <div>
          <h5>Optimized for</h5>
          <h2>Your Favorite Game</h2>
          <p>
            All aspects of callouts evolved are endlessly customizable to ensure
            that the right gamer recieves the right callout and the right time.
          </p>
          <h5>Visual Customization</h5>
          <p>
            Color code visual callouts to intuitively indicate location or
            importance. Customize colors to account for color blindness.
          </p>
          <h5>Audio Customization</h5>
          <p>
            Choose whether chat, callouts, or both should be senthysized per
            user and change voice for hearing range.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Game;
