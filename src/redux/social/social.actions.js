import { SocialActionTypes } from "./social.types";

export const setSocialFind = (option) => ({
  type: SocialActionTypes.SET_SOCIAL_FIND,
  payload: option
});

export const setSocialSess = (option) => ({
  type: SocialActionTypes.SET_SOCIAL_SESS,
  payload: option
});

export const setSocialView = (option) => ({
  type: SocialActionTypes.SET_SOCIAL_VIEW,
  payload: option
});
