import React, { forwardRef, useEffect, useState } from 'react';

import styles from './authform.module.css';

const AuthSubmit = forwardRef((props, ref) => {
  const [count, setCount] = useState(0);
  const [intervalId, setIntervalId] = useState(0);

  const start = (e) => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      return;
    }

    const newIntervalId = setInterval(() => {
      setCount((prevCount) => Math.min(100, prevCount + 1));
    }, 10);
    setIntervalId(newIntervalId);
  };

  const startKey = (e) => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      return;
    }

    const newIntervalId = setInterval(() => {
      setCount((prevCount) => Math.min(100, prevCount + 1));
    }, 5);
    setIntervalId(newIntervalId);
  };

  const end = (e) => {
    clearInterval(intervalId);
    setIntervalId(0);
    if (count < 100) {
      e.preventDefault();
      setCount(0);
    } else {
      setCount(0);
      ref.current.click();
    }
    return;
  };

  useEffect(() => {
    if (count === 100) {
      clearInterval(intervalId);
      setIntervalId(0);
      setCount(0);
      ref.current.click();
    }
  }, [count, intervalId, ref]);

  return (
    <button
      type="submit"
      className={styles.authSubmit}
      disabled={props.loading}
      onBlur={end}
      onKeyDown={startKey}
      onKeyUp={end}
      onMouseDown={start}
      onMouseLeave={end}
      onMouseUp={end}
      onTouchCancel={end}
      onTouchEnd={end}
      onTouchStart={start}>
      {count === 0
        ? props.loading
          ? 'Loading...'
          : 'Hold to Submit'
        : count > 0 && count < 100
        ? `${count}/100`
        : 'Release'}
    </button>
  );
});

AuthSubmit.displayName = 'AuthSubmit';
export default AuthSubmit;
