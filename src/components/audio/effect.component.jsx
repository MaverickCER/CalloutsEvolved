import React from "react";
import Sound from "react-sound";

const Effect = (props) => {
  return (
    <Sound
      url={props.source}
      playStatus="PLAYING"
      volume={props.volume}
      autoLoad
    />
  );
};

export default Effect;
