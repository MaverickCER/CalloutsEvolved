import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { connectRouter } from "connected-react-router";

import { optionsReducer } from "./options/options.reducer";
import { socialReducer } from "./social/social.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: []
};

export default (history) =>
  persistReducer(
    persistConfig,
    combineReducers({
      router: connectRouter(history),
      options: optionsReducer,
      social: socialReducer
    })
  );
