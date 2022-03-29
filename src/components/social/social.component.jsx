import React from "react";
import { connect } from "react-redux";
import { getSocialFind } from "../../redux/social/social.selectors";
import { firestore } from "../../utils/firebase.util";
import Look from "./look.component";
import Data from "./data.component";
import Join from "./join.component";
import Friend from "./friend.component";
import Block from "./block.component";
import List from "./list.component";

const Social = (props) => {
  const [ses, setSes] = React.useState("");

  React.useEffect(() => {
    const getSession = () => {
      if (/\s/.test(props.socialFind) || props.socialFind === "") {
        setSes("");
      } else {
        firestore
          .doc(`customers/${props.socialFind}`)
          .get()
          .then((playerSnapshot) => {
            if (!playerSnapshot.empty) {
              if (playerSnapshot.data() !== undefined) {
                setSes(playerSnapshot.data().userData.sid);
              } else {
                setSes("");
              }
            } else {
              setSes("");
            }
          });
      }
    };
    let unsubscribe = getSession();
    return unsubscribe;
  }, [props.socialFind]);

  return (
    <>
      <p className="mb-1">Search User ID:</p>
      <Look />
      <Data />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          margin: "1rem 0",
          gridGap: "1rem"
        }}
      >
        <Friend playerID={props.socialFind} />
        <Block playerID={props.socialFind} />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          alignItems: "center",
          margin: "1rem 0 0",
          gridGap: "1rem"
        }}
      >
        <Join newsession={ses} />
      </div>
      <List />
    </>
  );
};

const mapStateToProps = (state) => ({
  socialFind: getSocialFind(state)
});

export default connect(mapStateToProps, null)(Social);
