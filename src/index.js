import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor, history } from "./redux/store";
import ThemeContext from "./assets/theme/theme.context";

import App from "./app/app.component";
import "bootstrap/dist/css/bootstrap.min.css";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <ThemeContext>
      <ConnectedRouter history={history}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </ConnectedRouter>
    </ThemeContext>
  </Provider>,
  rootElement
);
