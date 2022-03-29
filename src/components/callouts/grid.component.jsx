import React from "react";
import { connect } from "react-redux";
import { getSocialSess } from "../../redux/social/social.selectors";
import { getOptionsData } from "../../redux/options/options.selectors";
import { auth, firestore } from "../../utils/firebase.util";
import SendBTN from "./sendBTN.component";
import StopAlert from "./stopAlert.component";
import StopTimer from "./stopTimer.component";
import StopEffect from "./stopEffect.component";
import StopTemplate from "./stopTemplate.component";

const Grid = (props) => {
  const [gridData, setGridData] = React.useState([]);

  React.useEffect(() => {
    const getBTNData = () => {
      if (auth.currentUser) {
        if (
          props.socialSess.toLowerCase() === "solo" ||
          props.socialSess === auth.currentUser.uid
        ) {
          return firestore
            .collection(`customers/${auth.currentUser.uid}/btnData`)
            .onSnapshot((docSnapshot) => {
              const arr0 = [];
              docSnapshot.forEach((btn) => {
                arr0.push(btn.data());
              });
              setGridData(arr0);
            });
        } else {
          return firestore
            .collection(`sessions/${props.socialSess}/btnData`)
            .onSnapshot((docSnapshot) => {
              const arr1 = [];
              docSnapshot.forEach((btn) => {
                arr1.push(btn.data());
              });
              setGridData(arr1);
            });
        }
      }
    };
    let unsubscribe = getBTNData();
    return unsubscribe;
  }, [props.socialSess]);

  const finalComponent = gridData.map((btn) => {
    var delta = btn.dur * 1000 + btn.utc - Date.now();
    if (delta > -900) {
      switch (btn.cdt) {
        case "timer":
          return <StopTimer btn={btn} key={btn.bid} />;
        case "effect":
          return <StopEffect btn={btn} key={btn.bid} />;
        case "template":
          return <StopTemplate btn={btn} key={btn.bid} />;
        default:
          return <StopAlert btn={btn} key={btn.bid} />;
      }
    } else {
      return <SendBTN btn={btn} key={btn.bid} />;
    }
  });

  return (
    <div className="gridDataWrapper">
      <div className={props.optionsData.shc} style={{ position: "absolute" }}>
        {finalComponent}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  optionsData: getOptionsData(state),
  socialSess: getSocialSess(state)
});

export default connect(mapStateToProps, null)(Grid);
