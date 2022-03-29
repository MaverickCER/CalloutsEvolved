import React from "react";
import { connect } from "react-redux";
import { setOptionsData } from "../redux/options/options.actions";
import { getOptionsData } from "../redux/options/options.selectors";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Desklist from "../components/desktop/desklist.components";
import Home from "../pages/home.page";
import GetStarted from "../pages/getstarted.page";
import { useHistory } from "react-router-dom";

import { auth, firestore } from "../utils/firebase.util";

const Interface = React.lazy(() => import("../pages/interface.page"));

const App = (props) => {
  const history = useHistory();
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    const unsubscribeFromAuth = () => {
      auth.onAuthStateChanged((userAuth) => {
        setUser(userAuth);
        if (userAuth) {
          if (userAuth.email !== null) {
            firestore
              .doc(`customers/${userAuth.uid}/userData/options`)
              .get()
              .then((doc) => {
                if (!doc.empty) {
                  props.setOptionsData(doc.data());
                }
              });
          }
        }
      });
    };
    let unsubscribe = unsubscribeFromAuth();
    return unsubscribe;
  }, []);

  return (
    <>
      <Desklist/>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home variant="null" />
          </Route>
          <Route exact path="/404">
            <Home variant="404" />
          </Route>
          <Route exact path="/tos">
            <Home variant="tos" />
          </Route>
          <Route exact path="/privacy">
            <Home variant="privacy" />
          </Route>
          <Route exact path="/unavailable">
            <Home variant="unavailable" />
          </Route>
          <Route exact path="/unsubscribed">
            <Home variant="unsubscribed" />
          </Route>
          <Route exact path="/getstarted">
            {user ? (
              user.email === null ? (
                <GetStarted variant="signup" />
              ) : (
                <Redirect to="/session" />
              )
            ) : (
              <GetStarted variant="signup" />
            )}
          </Route>
          <Route exact path="/session">
            {user ? (
              user.email === null ? (
                <Redirect to="/unavailable" />
              ) : (
                <React.Suspense fallback={<div></div>}>
                  <Interface />
                </React.Suspense>
              )
            ) : (
              <Redirect to="/getstarted" />
            )}
          </Route>
          <Route exact path="/session/:id">
            {user ? (
              <React.Suspense fallback={<div></div>}>
                <Interface />
              </React.Suspense>
            ) : (
              <GetStarted variant="null" />
            )}
          </Route>
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

const mapStateToProps = (state) => ({
  optionsData: getOptionsData(state)
});

const mapDispatchToProps = (dispatch) => ({
  setOptionsData: (user) => dispatch(setOptionsData(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
