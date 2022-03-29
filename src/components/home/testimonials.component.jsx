import gold from "../../assets/gold.png";
import gamerSantos from "../../assets/gamersantos.png";
import glimmer from "../../assets/glimmer.png";
import gamerWorthers from "../../assets/gamerworthers.png";
import platinum from "../../assets/platinum.png";
import gamerPVTLife from "../../assets/gamerpvtlife.png";

const Testimonials = () => {
  return (
    <div id="testimonials">
      <h2>What Gamers Say</h2>
      <h5>Testimonials from gamers in various genres</h5>
      <div className="row">
        <div>
          <img
            src={platinum}
            alt="4.75 stars styled as Battleborn currency"
            title="4.75 stars styled as Battleborn currency"
          />
          <p>
            My team uses Callouts Evolved in Battleborn to coordinate pinch
            attacks when everyone is ready.
          </p>
          <div>
            <img
              src={gamerPVTLife}
              alt="Battleborn Gamer"
              title="Battleborn Gamer"
            />
            <h5>
              <span>PVT Life</span>
              <br />
              Mute Hero Gamer
            </h5>
          </div>
        </div>
        <div>
          <img
            src={gold}
            alt="4.25 stars styled as World of Warcraft currency"
            title="4.25 stars styled as World of Warcraft currency"
          />
          <p>
            I was able to complete a 5 man Karazhan dungeon in World of
            Warcraft! Highly recommend!
          </p>
          <div>
            <img
              src={gamerSantos}
              alt="World of Warcraft Gamer"
              title="World of Warcraft Gamer (WOW)"
            />
            <h5>
              <span>Santos</span>
              <br />
              Deaf MMO Gamer
            </h5>
          </div>
        </div>
        <div>
          <img
            src={glimmer}
            alt="4.5 stars styled as Destiny currency"
            title="4.5 stars styled as Destiny currency"
          />
          <p>
            I ran into a player using the Speech Synthesis in Destiny. It was a
            game changer for 16 bombs.
          </p>
          <div>
            <img
              src={gamerWorthers}
              alt="Destiny Gamer"
              title="Destiny Gamer"
            />
            <h5>
              <span>Worthers</span>
              <br />
              Looter Shooter
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
