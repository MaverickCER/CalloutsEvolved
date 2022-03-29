import { useState } from "react";

const useArray = ({ defaultValue }) => {
  const [array, setArray] = useState(defaultValue);

  function push(element) {
    setArray((a) => {
      if (element !== null) {
        if (a && a.length > 0) {
          return [...a, element];
        } else {
          return [element];
        }
      } else {
        if (a && a.length > 0) {
          return [...a];
        } else {
          return [];
        }
      }
    });
  }

  function filter(callback) {
    setArray((a) => a.filter(callback));
  }

  function update(index, newElement) {
    setArray((a) => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length - 1)
    ]);
  }

  function remove(index) {
    setArray((a) => [
      ...a.slice(0, index),
      ...a.slice(index + 1, a.length - 1)
    ]);
  }

  function clear() {
    setArray([]);
  }

  return { array, set: setArray, push, filter, update, remove, clear };
};

export default useArray;
