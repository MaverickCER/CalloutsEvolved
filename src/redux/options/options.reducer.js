import { OptionsActionTypes } from "./options.types";

const INITIAL_STATE = {
  optionsData: {
    bkg: "waves",
    col: {
      danger: "233, 0, 68", // Red
      warning: "205, 74, 0", // Orange
      info: "137, 118, 0", // Yellow
      success: "0, 138, 37", // Green
      primary: "0, 113, 241", // Blue
      secondary: "159, 70, 236", // Purple
      dangerT: "255, 255, 255", // Red
      warningT: "255, 255, 255", // Orange
      infoT: "255, 255, 255", // Yellow
      successT: "255, 255, 255", // Green
      primaryT: "255, 255, 255", // Blue
      secondaryT: "255, 255, 255" // Purple
    },
    dst: "`",
    dgc: "false",
    doc: "",
    dsc: "",
    dcc: "",
    ddc: 0,
    mod: "light",
    ppi: "",
    shc: "touch",
    stl: "English (United States) en-US",
    tpx: "16px",
    tsc: true,
    tsg: true,
    tsl: "Google US English",
    tsp: 1,
    tsr: 1,
    tsv: 0.8,
    ucc: "primary"
  }
};

export const optionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OptionsActionTypes.SET_OPTIONS_DATA:
      return {
        ...state,
        optionsData: action.payload
      };
    default:
      return state;
  }
};
