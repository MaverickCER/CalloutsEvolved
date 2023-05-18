import { useReducer, useCallback } from 'react';

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

const useBoolean = (initial) => {
  const [isTrue, dispatch] = useReducer(booleanReducer, initial);

  const setTrue = useCallback(() => dispatch(true), []);
  const setFalse = useCallback(() => dispatch(false), []);
  const toggleIsTrue = useCallback(() => dispatch(), []);

  return { isTrue, setTrue, setFalse, toggleIsTrue };
};

export default useBoolean;
