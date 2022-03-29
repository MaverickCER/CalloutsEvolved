import React from "react";
import useTimeout from "../../utils/usetimeout.util";
import { Button } from "react-bootstrap";

const NoCaptcha = (props) => {
  const [started, setStarted] = React.useState(0);
  const [ended, setEnded] = React.useState("begin");
  const [time, setTime] = React.useState(2);
  const isMountedRef = React.useRef(null);
  const { clear, reset } = useTimeout(() => timeout(started), time * 1000 + 1);

  React.useEffect(() => {
    isMountedRef.current = true;

    return () => {
      clear();
      isMountedRef.current = false;
    };
  }, []);

  const start = (e) => {
    setStarted(Date.now());
    setEnded(false);
    let rightNumber = props.time && props.time > 0;
    let seconds = rightNumber ? props.time : 2;
    setTime(seconds);
    if (ended) {
      reset();
    }
    if (props.onStart) {
      props.onStart(e);
    }
  };

  const end = (e) => {
    if (ended || !isMountedRef) {
      console.log("end");
      return false;
    }
    let isEnough = Date.now() - started >= time * 1000;
    setEnded(true);

    if (props.onEnd) {
      props.onEnd(e, isEnough);
    }
  };

  const timeout = (e) => {
    if (!ended && e === started) {
      if (props.onHold) {
        props.onHold(e);
      }
    }
  };

  return (
    <Button
      variant={props.variant}
      style={props.style}
      className={props.className}
      onMouseDown={start}
      onTouchStart={start}
      onKeyDown={start}
      onMouseUp={end}
      onTouchCancel={end}
      onTouchEnd={end}
      onKeyUp={end}
      onBlur={end}
    >
      {props.children}
    </Button>
  );
};
export default NoCaptcha;
