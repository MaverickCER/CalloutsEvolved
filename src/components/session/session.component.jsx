import React from "react";
import { connect } from "react-redux";
import {
  getSocialSess,
  getSocialView
} from "../../redux/social/social.selectors";
import {
  setSocialSess,
  setSocialView
} from "../../redux/social/social.actions";
import { getOptionsData } from "../../redux/options/options.selectors";
import { Button } from "react-bootstrap";
import CreateView from "./createview.component";
import CurrentView from "./currentview.component";
import JoinView from "./joinview.component";
import { auth, firestore } from "../../utils/firebase.util";

class Session extends React.Component {
  renderSwitch(param) {
    switch (param) {
      case "create":
        return <CreateView />;
      case "current":
        return <CurrentView />;
      case "search":
        return <JoinView />;
      default:
        return null;
    }
  }

  handleClick = (val) => {
    this.props.setSocialView(val);
  };

  componentDidMount() {
    if (
      this.props.socialSess.toLowerCase() === "solo" ||
      this.props.socialSess === auth.currentUser.uid
    ) {
      firestore
        .doc(`customers/${auth.currentUser.uid}`)
        .get()
        .then((data) => {
          if (data.data().userData.sid !== "solo") {
            firestore.doc(`customers/${auth.currentUser.uid}`).set(
              {
                userData: {
                  cid: auth.currentUser.displayName,
                  sid: "Solo",
                  ucc: this.props.optionsData.ucc,
                  uid: auth.currentUser.uid
                }
              },
              { merge: true }
            );
          }
        });
    }
  }

  render() {
    return (
      <>
        {this.renderSwitch(this.props.socialView)}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            gridGap: "1rem",
            margin: "1rem 0 0 0"
          }}
        >
          {this.props.socialView === "current" ? (
            <Button
              variant="accent"
              onClick={() => {
                this.handleClick("search");
              }}
            >
              Search
            </Button>
          ) : this.props.socialView === "search" ? (
            this.props.socialSess.toLowerCase() === "solo" ||
            this.props.socialSess === auth.currentUser.uid ? (
              <Button
                variant="accent"
                onClick={() => this.handleClick("create")}
              >
                Back
              </Button>
            ) : (
              <Button
                variant="accent"
                onClick={() => this.handleClick("current")}
              >
                Back
              </Button>
            )
          ) : (
            <Button variant="accent" onClick={() => this.handleClick("search")}>
              Search
            </Button>
          )}
          {this.props.socialView === "current" ? null : this.props
              .socialView === "search" ? (
            <Button variant="accent" onClick={() => this.handleClick("create")}>
              Create
            </Button>
          ) : null}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  optionsData: getOptionsData(state),
  socialSess: getSocialSess(state),
  socialView: getSocialView(state)
});

const mapDispatchToProps = (dispatch) => ({
  setSocialSess: (data) => dispatch(setSocialSess(data)),
  setSocialView: (data) => dispatch(setSocialView(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Session);
