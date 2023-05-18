import { useCallback, useEffect, useReducer, useRef } from "react";

const booleanReducer = (state, value) => {
  switch (value?.toString()) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return !state;
  }
};

const useBioRead = (text) => {
  const [isBio, dispatch] = useReducer(booleanReducer, false);
  const original = useRef('');
  const bioText = useRef('');

  const toggleIsBio = useCallback(() => dispatch(), []);

  useEffect(() => {
    original.current = text;
    bioText.current = text.split(' ').map((rootword) => {
      let rootwords = rootword.split('\n');
      let words = [];
      for (const word of rootwords) {
        if (word) {
          let start = Math.ceil(word.length / 2);
          let end = word.length > 1 ? -Math.floor(word.length / 2) : 1;
          words.push(`<strong>${word.slice(0, start)}</strong>${word.slice(end)}`);
        }
      }
      return words.join('\n\n');
    }).join(' ');
  }, [text]);

  const getText = async (isBio) => {
    if (isBio) {
      return bioText.current;
    }
    return original.current;
  };

  return {
    getText, isBio, toggleIsBio
  };
};

export default useBioRead;