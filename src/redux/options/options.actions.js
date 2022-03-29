import { OptionsActionTypes } from "./options.types";

export const setOptionsData = (options) => ({
  type: OptionsActionTypes.SET_OPTIONS_DATA,
  payload: options
});
