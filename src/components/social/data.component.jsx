import React from "react";
import { connect } from "react-redux";
import { getSocialFind } from "../../redux/social/social.selectors";
import { setSocialFind } from "../../redux/social/social.actions";
import { firestore } from "../../utils/firebase.util";

class Data extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pid: "",
      pdn: "",
      psi: "",
      psc: "",
      psd: ""
    };
  }

  async getfirestore() {
    const userSnapshot = await firestore
      .doc(`customers/${this.props.socialFind}`)
      .get();
    if (!userSnapshot.empty && userSnapshot.data() !== undefined) {
      this.setState({
        pid: userSnapshot.data().userData.uid,
        pdn: userSnapshot.data().userData.cid,
        psi: userSnapshot.data().userData.sid
      });
      const sessionSnapshot = await firestore
        .doc(`sessions/${this.state.psi}`)
        .get();
      if (!sessionSnapshot.empty && sessionSnapshot.data() !== undefined) {
        this.setState({
          psc: `${sessionSnapshot.data().sesData.arr.length} / ${
            sessionSnapshot.data().sesData.spc
          }`,
          psd: `${sessionSnapshot.data().sesData.des}`
        });
      } else {
        this.setState({
          pid: "afk",
          pdn: "",
          psi: "",
          psc: "",
          psd: ""
        });
      }
    } else {
      this.setState({
        pid: "No User Info",
        pdn: "",
        psi: "",
        psc: "",
        psd: ""
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.socialFind !== prevProps.socialFind) {
      if (
        /\s/.test(this.props.socialFind) ||
        this.props.socialFind === "" ||
        this.props.socialFind === undefined
      ) {
        this.setState({
          pid: "",
          pdn: "",
          psi: "",
          psc: "",
          psd: ""
        });
      } else {
        this.getfirestore();
      }
    }
  }

  componentDidMount() {
    if (
      /\s/.test(this.props.socialFind) ||
      this.props.socialFind === "" ||
      this.props.socialFind === undefined
    ) {
      this.setState({
        pid: "",
        pdn: "",
        psi: "",
        psc: "",
        psd: ""
      });
    } else {
      this.getfirestore();
    }
  }

  render() {
    return this.state.pid ? (
      <p className="mt-1" style={{ wordBreak: "break-all" }}>
        Player ID: {this.state.pid}
        <br />
        Player name: {this.state.pdn}
        <br />
        Session ID: {this.state.psi}
        <br />
        Player Count: {this.state.psc}
        <br />
        Description: {this.state.psd}
      </p>
    ) : (
      <p className="mt-1" style={{ wordBreak: "break-all" }}>
        Player ID: {this.state.pid}
        <br />
        <br />
        Player name: {this.state.pdn}
        <br />
        Session ID: {this.state.psi}
        <br />
        Player Count: {this.state.psc}
        <br />
        Description: {this.state.psd}
      </p>
    );
  }
}

const mapStateToProps = (state) => ({
  socialFind: getSocialFind(state)
});

const mapDispatchToProps = (dispatch) => ({
  setSocialFind: (data) => dispatch(setSocialFind(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Data);
