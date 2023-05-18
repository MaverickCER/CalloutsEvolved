import { useEffect, useRef } from 'react';

const useKeypress = (keys, handler) => {
  const eventListenerRef = useRef();

  useEffect(() => {
    eventListenerRef.current = (event) => {
      if (Array.isArray(keys) ? keys.includes(event.code) : keys === event.code) {
        handler(event);
      }
    };
  }, [keys, handler]);

  useEffect(() => {
    const eventListener = (event) => {
      eventListenerRef.current(event);
    };
    window.addEventListener('keydown', eventListener);
    return () => {
      window.removeEventListener('keydown', eventListener);
    };
  }, []);
};

export default useKeypress;
