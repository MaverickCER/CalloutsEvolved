import React from "react";
import { Form } from "react-bootstrap";
import { auth, firestore } from "../../utils/firebase.util";
import Join from "../social/join.component";

class JoinView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seek: "",
      data: []
    };
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ seek: value });
  };

  componentDidMount() {
    firestore
      .collection("sessions")
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          const arr = [];
          snapshot.forEach((doc) => {
            arr.push({
              key: `${doc.id}`,
              des: `${doc.data().sesData.des}`,
              arr: `${doc.data().sesData.arr}`,
              sid: `${doc.data().sesData.sid}`,
              spc: `${doc.data().sesData.spc}`
            });
          });
          this.setState({ data: arr });
        }
      });
  }

  secondCheck = (user) => {
    firestore
      .doc(`customers/${auth.currentUser.uid}/userData/lists`)
      .get()
      .then(
        (docSnapshot) => {
          if (!docSnapshot.empty) {
            if (docSnapshot.data() !== undefined) {
              if (docSnapshot.data().blacklist.includes(user)) {
                return true;
              } else {
                return false;
              }
            }
          }
        },
        (error) => {
          console.log("Error in search component 1: " + error);
        }
      );
  };

  checkStatus = (user) => {
    firestore
      .doc(`customers/${user}/userData/lists`)
      .get()
      .then(
        (docSnapshot) => {
          if (!docSnapshot.empty) {
            if (docSnapshot.data() !== undefined) {
              if (docSnapshot.data().blacklist.includes(auth.currentUser.uid)) {
                firestore
                  .doc(`customers/${auth.currentUser.uid}/userData/lists`)
                  .onSnapshot(
                    (docSnapshot) => {
                      if (!docSnapshot.empty) {
                        if (docSnapshot.data() !== undefined) {
                          if (docSnapshot.data().blacklist.includes(user)) {
                            return true;
                          } else {
                            return false;
                          }
                        }
                      }
                    },
                    (error) => {
                      console.log("Error in search component 2: " + error);
                    }
                  );
              } else {
                this.secondCheck(user);
              }
            } else {
              this.secondCheck(user);
            }
          }
        },
        (error) => {
          console.log("Error in search component 3: " + error);
        }
      );
  };

  getAccess = (session) => {
    firestore
      .doc(`sessions/${session}`)
      .get()
      .then((docSnapshot) => {
        if (!docSnapshot.empty) {
          if (docSnapshot.data() !== undefined) {
            if (
              docSnapshot.data().sesData.arr.some((user) => {
                var check = this.checkStatus(user);
                return check;
              })
            ) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        } else {
          return true;
        }
      });
  };

  render() {
    return (
      <>
        <p className="mb-1">Search:</p>
        <Form.Control
          type="text"
          name="seek"
          value={this.state.seek}
          onChange={this.handleChange}
          placeholder="Game or activity"
        />
        <div style={{ height: "calc(100vh - 20.8rem)", overflow: "auto" }}>
          {this.state.data.map((doc) =>
            this.getAccess(doc.sid) !== "true" ? (
              this.state.seek !== "" ? (
                doc.des.indexOf(this.state.seek) !== -1 &&
                doc.arr.length < doc.spc ? (
                  <div
                    key={doc.key}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      alignItems: "center",
                      gridGap: "1rem",
                      margin: "1rem 0 -.9rem 0"
                    }}
                  >
                    <p>
                    {doc.sid} ({doc.arr.length - 4}/{doc.spc})<br />
                      {doc.des}
                    </p>
                    <Join newsession={doc.sid} />
                  </div>
                ) : null
              ) : doc.arr.length < doc.spc ? (
                <div
                  key={doc.key}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    alignItems: "center",
                    gridGap: "1rem",
                    margin: "1rem 0 -.9rem 0"
                  }}
                >
                  <p>
                    {doc.sid} ({doc.arr.length - 4}/{doc.spc})<br />
                    {doc.des}
                  </p>
                  <Join newsession={doc.sid} />
                </div>
              ) : null
            ) : null
          )}
        </div>
      </>
    );
  }
}

export default JoinView;
