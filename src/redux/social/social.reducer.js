import { SocialActionTypes } from "./social.types";

const INITIAL_STATE = {
  socialFind: "",
  socialHist: [],
  socialSess: "Solo",
  socialView: "create"
};

export const socialReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SocialActionTypes.SET_SOCIAL_FIND:
      return {
        ...state,
        socialFind: action.payload
      };
    case SocialActionTypes.SET_SOCIAL_HIST:
      return {
        ...state,
        socialHist: action.payload
      };
    case SocialActionTypes.SET_SOCIAL_SESS:
      return {
        ...state,
        socialSess: action.payload
      };
    case SocialActionTypes.SET_SOCIAL_VIEW:
      return {
        ...state,
        socialView: action.payload
      };
    default:
      return state;
  }
};
