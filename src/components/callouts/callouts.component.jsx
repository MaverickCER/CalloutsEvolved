import React from "react";
import { connect } from "react-redux";
import { getSocialSess } from "../../redux/social/social.selectors";
import { getOptionsData } from "../../redux/options/options.selectors";
import { Button, Form, Dropdown } from "react-bootstrap";
import { auth, firestore } from "../../utils/firebase.util";

const Callouts = (props) => {
  const [key, setKey] = React.useState(1);
  const [template, setTemplate] = React.useState("Select");
  const [tutorial, setTutorial] = React.useState("Select");
  const [btnData, setBTNData] = React.useState([
    {
      bid: "btnDataA",
      cal: "Callout 0",
      cdt: "alert",
      col: "primary",
      dur: 2,
      nkb: "Key",
      nnp: "Key",
      ntp: 0,
      udn: "",
      uid: "",
      utc: 0
    },
    {
      bid: "btnDataB",
      cal: "Callout 1",
      cdt: "alert",
      col: "primary",
      dur: 2,
      nkb: "7",
      nnp: "/",
      ntp: 1,
      udn: "",
      uid: "",
      utc: 0
    },
    {
      bid: "btnDataC",
      cal: "Callout 2",
      cdt: "alert",
      col: "primary",
      dur: 2,
      nkb: "8",
      nnp: "*",
      ntp: 2,
      udn: "",
      uid: "",
      utc: 0
    },
    {
      bid: "btnDataC",
      cal: "Callout 3",
      cdt: "alert",
      col: "primary",
      dur: 2,
      nkb: "O",
      nnp: "-",
      ntp: 3,
      udn: "",
      uid: "",
      utc: 0
    },
    {
      bid: "btnDataD",
      cal: "Callout 4",
      cdt: "alert",
      col: "primary",
      dur: 2,
      nkb: "Y",
      nnp: "7",
      ntp: 4,
      udn: "",
      uid: "",
      utc: 0
    },
    {
      bid: "btnDataE",
      cal: "Callout 5",
      cdt: "alert",
      col: "primary",
      dur: 2,
      nkb: "U",
      nnp: "8",
      ntp: 5,
      udn: "",
      uid: "",
      utc: 0
    },
    {
      bid: "btnDataF",
      cal: "Callout 6",
      cdt: "alert",
      col: "primary",
      dur: 2,
      nkb: "I",
      nnp: "9",
      ntp: 6,
      udn: "",
      uid: "",
      utc: 0
    },
    {
      bid: "btnDataG",
      cal: "Callout 7",
      cdt: "alert",
      col: "primary",
      dur: 2,
      nkb: "L",
      nnp: "+",
      ntp: 7,
      udn: "",
      uid: "",
      utc: 0
    },
    {
      bid: "btnDataH",
      cal: "Callout 8",
      cdt: "alert",
      col: "primary",
      dur: 2,
      nkb: "H",
      nnp: "4",
      ntp: 8,
      udn: "",
      uid: "",
      utc: 0
    },
    {
      bid: "btnDataI",
      cal: "Callout 9",
      cdt: "alert",
      col: "primary",
      dur: 2,
      nkb: "J",
      nnp: "5",
      ntp: 9,
      udn: "",
      uid: "",
      utc: 0
    },
    {
      bid: "btnDataJ",
      cal: "Callout 10",
      cdt: "alert",
      col: "primary",
      dur: 2,
      nkb: "K",
      nnp: "6",
      ntp: 10,
      udn: "",
      uid: "",
      utc: 0
    },
    {
      bid: "btnDataK",
      cal: "Callout 11",
      cdt: "alert",
      col: "primary",
      dur: 2,
      nkb: "N",
      nnp: "1",
      ntp: 11,
      udn: "",
      uid: "",
      utc: 0
    },
    {
      bid: "btnDataL",
      cal: "Callout 12",
      cdt: "alert",
      col: "primary",
      dur: 2,
      nkb: "M",
      nnp: "2",
      ntp: 12,
      udn: "",
      uid: "",
      utc: 0
    },
    {
      bid: "btnDataM",
      cal: "Callout 13",
      cdt: "alert",
      col: "primary",
      dur: 2,
      nkb: "<",
      nnp: "3",
      ntp: 13,
      udn: "",
      uid: "",
      utc: 0
    },
    {
      bid: "btnDataN",
      cal: "Callout 14",
      cdt: "alert",
      col: "primary",
      dur: 2,
      nkb: ">",
      nnp: "E",
      ntp: 14,
      udn: "",
      uid: "",
      utc: 0
    },
    {
      bid: "btnDataO",
      cal: "Callout 15",
      cdt: "alert",
      col: "primary",
      dur: 2,
      nkb: "___",
      nnp: "0",
      ntp: 15,
      udn: "",
      uid: "",
      utc: 0
    },
    {
      bid: "btnDataP",
      cal: "Callout 16",
      cdt: "alert",
      col: "primary",
      dur: 2,
      nkb: "ALT",
      nnp: "•",
      ntp: 16,
      udn: "",
      uid: "",
      utc: 0
    }
  ]);

  React.useEffect(() => {
    const checkStatus = () => {
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
            setBTNData(arr0);
          });
      } else {
        return firestore
          .collection(`sessions/${props.socialSess}/btnData`)
          .onSnapshot((docSnapshot) => {
            const arr1 = [];
            docSnapshot.forEach((btn) => {
              arr1.push(btn.data());
            });
            setBTNData(arr1);
          });
      }
    };
    let unsubscribe = checkStatus();
    return unsubscribe;
  }, [props.socialSess]);

  const saveTemplate = async () => {
    if (template !== "Select") {
      if (
        props.socialSess.toLowerCase() === "solo" ||
        props.socialSess === auth.currentUser.uid
      ) {
        var userBTNData = await firestore
          .collection(`customers/${auth.currentUser.uid}/btnData`)
          .get();
        userBTNData.forEach((btn) => {
          firestore
            .doc(
              `customers/${
                auth.currentUser.uid
              }/saveData/saveData${template}/btnData/${btn.data().bid}`
            )
            .set(btn.data(), { merge: true });
        });
      } else {
        var sesBTNData = await firestore
          .collection(`sessions/${props.socialSess}/btnData`)
          .get();
        sesBTNData.forEach((btn) => {
          firestore
            .doc(
              `customers/${
                auth.currentUser.uid
              }/saveData/saveData${template}/btnData/${btn.data().bid}`
            )
            .set(btn.data(), { merge: true });
        });
      }
      setTemplate("Select");
    }
  };

  const loadTemplate = async () => {
    if (template !== "Select") {
      var tempBTNData = await firestore
        .collection(
          `customers/${auth.currentUser.uid}/saveData/saveData${template}/btnData`
        )
        .get();
      if (
        props.socialSess.toLowerCase() === "solo" ||
        props.socialSess === auth.currentUser.uid
      ) {
        tempBTNData.forEach((btn) => {
          firestore
            .doc(`customers/${auth.currentUser.uid}/btnData/${btn.data().bid}`)
            .set(btn.data(), { merge: true });
        });
      } else {
        tempBTNData.forEach((btn) => {
          firestore
            .doc(`sessions/${props.socialSess}/btnData/${btn.data().bid}`)
            .set(btn.data(), { merge: true });
        });
      }
      setTemplate("Select");
    }
  };

  const exportTemplate = async () => {
    if (template !== "Select") {
      var arr = [];
      var templateBTNData = await firestore
        .collection(`customers/${auth.currentUser.uid}/saveData/saveData${template}/btnData`)
        .get();
      templateBTNData.forEach((btn) => {
        arr.push(btn.data());
      });

      let link = document.createElement('a');
      link.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(arr)));
      link.setAttribute('download', `calloutsevolved-template-${template}.json`);
      document.body.appendChild(link); // required for firefox
      link.click();
      document.body.removeChild(link);
    }
  }

  const importTemplate = (event) => {
    if (template !== "Select") {
      event.preventDefault();
      let reader = new FileReader();
      reader.onload = (e) => {
        let arr;
        try {
          arr = JSON.parse(e.target.result);
        } catch (error) {
          console.error(error, str)
        }
        if (Array.isArray(arr) && arr.length === 17) {
          setBTNData([arr]);
          for (let i = 1; i < arr.length; i++) {
            var alpha = (i + 10).toString(36).toUpperCase();
            firestore
              .doc(`customers/${auth.currentUser.uid}/btnData/btnData${alpha}`)
              .set(arr[i], { merge: true });
            firestore
              .doc(`sessions/${props.socialSess}/btnData/btnData${alpha}`)
              .set(arr[i], { merge: true });
          }
        }
      };
      reader.readAsText(event.target.files[0]);
    }
  }

  const saveTutorial = async () => {
    if (tutorial !== "Select") {
      if (
        props.socialSess.toLowerCase() === "solo" ||
        props.socialSess === auth.currentUser.uid
      ) {
        var userBTNData = await firestore
          .collection(`customers/${auth.currentUser.uid}/btnData`)
          .get();
        userBTNData.forEach((btn) => {
          firestore
            .doc(`tutorials/${tutorial}/btnData/${btn.data().bid}`)
            .set(btn.data(), { merge: true });
        });
      } else {
        var sesBTNData = await firestore
          .collection(`sessions/${props.socialSess}/btnData`)
          .get();
        sesBTNData.forEach((btn) => {
          firestore
            .doc(`tutorials/${tutorial}/btnData/${btn.data().bid}`)
            .set(btn.data(), { merge: true });
        });
      }
      setTemplate("Select");
      setTutorial("Select");
    }
  };

  const loadTutorial = async () => {
    if (tutorial !== "Select") {
      var tempBTNData = await firestore
        .collection(`tutorials/${tutorial}/btnData`)
        .get();
      if (
        props.socialSess.toLowerCase() === "solo" ||
        props.socialSess === auth.currentUser.uid
      ) {
        tempBTNData.forEach((btn) => {
          firestore
            .doc(`customers/${auth.currentUser.uid}/btnData/${btn.data().bid}`)
            .set(btn.data(), { merge: true });
        });
      } else {
        tempBTNData.forEach((btn) => {
          firestore
            .doc(`sessions/${props.socialSess}/btnData/${btn.data().bid}`)
            .set(btn.data(), { merge: true });
        });
      }
      setTemplate("Select");
      setTutorial("Select");
    }
  };

  const exportTutorial = async () => {
    var arr = [];
    if (tutorial !== "Select") {
      var tutorialBTNData = await firestore
        .collection(`tutorials/${tutorial}/btnData`)
        .get();
      tutorialBTNData.forEach((btn) => {
        arr.push(btn.data());
      });
    } else {
      arr = btnData
    }

    let link = document.createElement('a');
    link.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(arr)));
    link.setAttribute('download', `calloutsevolved-tutorial-${tutorial}.json`);
    document.body.appendChild(link); // required for firefox
    link.click();
    document.body.removeChild(link);
  }

  const importTutorial = (event) => {
    if (tutorial !== "Select") {
      event.preventDefault();
      let reader = new FileReader();
      reader.onload = (e) => {
        let arr;
        try {
          arr = JSON.parse(e.target.result);
        } catch (error) {
          console.error(error, str)
        }
        if (Array.isArray(arr) && arr.length === 17) {
          setBTNData([arr]);
          for (let i = 1; i < arr.length; i++) {
            var alpha = (i + 10).toString(36).toUpperCase();
            firestore
              .doc(`tutorials/${tutorial}/btnData/btnData${alpha}`)
              .set(arr[i], { merge: true });
            firestore
              .doc(`sessions/${props.socialSess}/btnData/btnData${alpha}`)
              .set(arr[i], { merge: true });
          }
        }
      };
      reader.readAsText(event.target.files[0]);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    let btnData1 = [...btnData];
    let btn = { ...btnData1[key] };
    btn[name] = value;
    btnData1[key] = btn;
    setBTNData(btnData1);
  };

  const setType = (val) => {
    let btnData1 = [...btnData];
    let btn = { ...btnData1[key] };
    btn.cdt = val;
    btnData1[key] = btn;
    setBTNData(btnData1);
  };

  const setCalloutColor = (val) => {
    let btnData1 = [...btnData];
    let btn = { ...btnData1[key] };
    btn.col = val;
    btnData1[key] = btn;
    setBTNData(btnData1);
  };

  const applyChange = () => {
    var alpha = (key + 10).toString(36).toUpperCase();
    if (
      props.socialSess.toLowerCase() === "solo" ||
      props.socialSess === auth.currentUser.uid
    ) {
      firestore
        .doc(`customers/${auth.currentUser.uid}/btnData/btnData${alpha}`)
        .set(btnData[key], { merge: true });
    } else {
      firestore
        .doc(`sessions/${props.socialSess}/btnData/btnData${alpha}`)
        .set(btnData[key], { merge: true });
    }
  };

  const revertChange = async () => {
    var alpha = (key + 10).toString(36).toUpperCase();
    if (
      props.socialSess.toLowerCase() === "solo" ||
      props.socialSess === auth.currentUser.uid
    ) {
      var userRevertData = await firestore
        .doc(`customers/${auth.currentUser.uid}/btnData/btnData${alpha}`)
        .get();
      let btnData1 = [...btnData];
      let btn = { ...btnData1[key] };
      btn = userRevertData.data();
      btnData1[key] = btn;
      setBTNData(btnData1);
    } else {
      var sesRevertData = await firestore
        .doc(`sessions/${props.socialSess}/btnData/btnData${alpha}`)
        .get();
      let btnData1 = [...btnData];
      let btn = { ...btnData1[key] };
      btn = sesRevertData.data();
      btnData1[key] = btn;
      setBTNData(btnData1);
    }
  };

  return (
    <>
      <div>
        <span>Templates:</span>
        <Dropdown className="mt-1 mb-3">
          <Dropdown.Toggle
            variant="accent"
            type="submit"
            id="tsgSelect"
            block
            style={{ width: "100%" }}
          >
            {template === "Select"
              ? "Select"
              : `Template ${template.toString()}`}
          </Dropdown.Toggle>
          <Dropdown.Menu variant={props.optionsData.mod}>
            <Dropdown.Item onClick={() => setTemplate("Select")}>
              Select
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setTemplate(0)}>
              Template 0
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setTemplate(1)}>
              Template 1
            </Dropdown.Item>
            {props.optionsData.ppi || auth.currentUser.uid === "WX0BLAgBQCWYgFp57CktQNxdPrR2" && (
              <>
                <Dropdown.Item onClick={() => setTemplate(2)}>
                  Template 2
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(3)}>
                  Template 3
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(4)}>
                  Template 4
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(5)}>
                  Template 5
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(6)}>
                  Template 6
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(7)}>
                  Template 7
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(8)}>
                  Template 8
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(9)}>
                  Template 9
                </Dropdown.Item>
              </>
            )}
            {auth.currentUser.uid === "WX0BLAgBQCWYgFp57CktQNxdPrR2" && (
              <>
                <Dropdown.Item onClick={() => setTemplate(10)}>
                  Template 10
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(11)}>
                  Template 11
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(12)}>
                  Template 12
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(13)}>
                  Template 13
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(14)}>
                  Template 14
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(15)}>
                  Template 15
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(16)}>
                  Template 16
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(17)}>
                  Template 17
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(18)}>
                  Template 18
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(19)}>
                  Template 19
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(20)}>
                  Template 20
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(21)}>
                  Template 21
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(22)}>
                  Template 22
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(23)}>
                  Template 23
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(24)}>
                  Template 24
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(25)}>
                  Template 25
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(26)}>
                  Template 26
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(27)}>
                  Template 27
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(28)}>
                  Template 28
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(29)}>
                  Template 29
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTemplate(30)}>
                  Template 30
                </Dropdown.Item>
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gridGap: "1rem",
          margin: "1rem 0"
        }}
      >
        <Button variant="accent" onClick={saveTemplate}>
          Save
        </Button>
        <Button variant="accent" onClick={loadTemplate}>
          Load
        </Button>
        {auth.currentUser.uid === "WX0BLAgBQCWYgFp57CktQNxdPrR2" && (
          <>
            <Button variant="accent" onClick={exportTemplate}>
              Export
            </Button>
            <Button variant="accent" style={{width: '100%', height: '100%', padding: 0}}>
              <label style={{width: '100%', height: '100%', alignItems: 'center', paddingTop: '5px', cursor: 'pointer'}}>
                <input type="file" style={{display: 'none'}} accept="application/json" onChange={(e) => importTemplate(e)} />
                Import
              </label>
            </Button>
          </>
        )}
      </div>
      <div>
        <span>Tutorials and Foundations:</span>
        <Dropdown className="mt-1 mb-3">
          <Dropdown.Toggle
            variant="accent"
            type="submit"
            id="tsgSelect"
            block
            style={{ width: "100%" }}
          >
            {tutorial === "Select" ? "Select" : `${tutorial} Tutorial`}
          </Dropdown.Toggle>
          <Dropdown.Menu variant={props.optionsData.mod}>
            <Dropdown.Item onClick={() => setTutorial("Select")}>
              Select
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setTutorial("Introduction")}>
              Introduction
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setTutorial("Terminology")}>
              Terminology
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setTutorial("Communication")}>
              Communication
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setTutorial("PvP")}>
              PvP
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setTutorial("Generic")}>
              Generic
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div>
        {auth.currentUser.uid === "WX0BLAgBQCWYgFp57CktQNxdPrR2" ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              alignItems: "center",
              gridGap: "1rem",
              margin: "1rem 0"
            }}
          >
            <Button variant="accent" onClick={() => saveTutorial()}>
              Save
            </Button>
            <Button variant="accent" onClick={() => loadTutorial()}>
              Load
            </Button>
            <Button variant="accent" onClick={exportTutorial}>
              Export
            </Button>
            <Button variant="accent" style={{width: '100%', height: '100%', padding: 0}}>
              <label style={{width: '100%', height: '100%', alignItems: 'center', paddingTop: '5px', cursor: 'pointer'}}>
                <input type="file" style={{display: 'none'}} accept="application/json" onChange={(e) => importTutorial(e)} />
                Import
              </label>
            </Button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              alignItems: "center",
              margin: "1rem 0"
            }}
          >
            <Button variant="accent" onClick={() => loadTutorial()}>
              Load
            </Button>
          </div>
        )}
      </div>
      <span className="mb-1">Key:</span>
      <div
        style={{
          position: "relative",
          height: "0",
          width: "100%",
          paddingBottom: "100%"
        }}
      >
        <div
          className={`${props.optionsData.shc}`}
          style={{ position: "absolute" }}
        >
          <Button variant="accent" disabled></Button>
          {key === 1 ? (
            <Button variant="accent" className="active"></Button>
          ) : (
            <Button
              variant="accent"
              type="submit"
              onClick={() => setKey(1)}
            ></Button>
          )}
          {key === 2 ? (
            <Button variant="accent" className="active"></Button>
          ) : (
            <Button
              variant="accent"
              type="submit"
              onClick={() => setKey(2)}
            ></Button>
          )}
          {key === 3 ? (
            <Button variant="accent" className="active"></Button>
          ) : (
            <Button
              variant="accent"
              type="submit"
              onClick={() => setKey(3)}
            ></Button>
          )}
          {key === 4 ? (
            <Button variant="accent" className="active"></Button>
          ) : (
            <Button
              variant="accent"
              type="submit"
              onClick={() => setKey(4)}
            ></Button>
          )}
          {key === 5 ? (
            <Button variant="accent" className="active"></Button>
          ) : (
            <Button
              variant="accent"
              type="submit"
              onClick={() => setKey(5)}
            ></Button>
          )}
          {key === 6 ? (
            <Button variant="accent" className="active"></Button>
          ) : (
            <Button
              variant="accent"
              type="submit"
              onClick={() => setKey(6)}
            ></Button>
          )}
          {key === 7 ? (
            <Button variant="accent" className="active"></Button>
          ) : (
            <Button
              variant="accent"
              type="submit"
              onClick={() => setKey(7)}
            ></Button>
          )}
          {key === 8 ? (
            <Button variant="accent" className="active"></Button>
          ) : (
            <Button
              variant="accent"
              type="submit"
              onClick={() => setKey(8)}
            ></Button>
          )}
          {key === 9 ? (
            <Button variant="accent" className="active"></Button>
          ) : (
            <Button
              variant="accent"
              type="submit"
              onClick={() => setKey(9)}
            ></Button>
          )}
          {key === 10 ? (
            <Button variant="accent" className="active"></Button>
          ) : (
            <Button
              variant="accent"
              type="submit"
              onClick={() => setKey(10)}
            ></Button>
          )}
          {key === 11 ? (
            <Button variant="accent" className="active"></Button>
          ) : (
            <Button
              variant="accent"
              type="submit"
              onClick={() => setKey(11)}
            ></Button>
          )}
          {key === 12 ? (
            <Button variant="accent" className="active"></Button>
          ) : (
            <Button
              variant="accent"
              type="submit"
              onClick={() => setKey(12)}
            ></Button>
          )}
          {key === 13 ? (
            <Button variant="accent" className="active"></Button>
          ) : (
            <Button
              variant="accent"
              type="submit"
              onClick={() => setKey(13)}
            ></Button>
          )}
          {key === 14 ? (
            <Button variant="accent" className="active"></Button>
          ) : (
            <Button
              variant="accent"
              type="submit"
              onClick={() => setKey(14)}
            ></Button>
          )}
          {key === 15 ? (
            <Button variant="accent" className="active"></Button>
          ) : (
            <Button
              variant="accent"
              type="submit"
              onClick={() => setKey(15)}
            ></Button>
          )}
          {key === 16 ? (
            <Button variant="accent" className="active"></Button>
          ) : (
            <Button
              variant="accent"
              type="submit"
              onClick={() => setKey(16)}
            ></Button>
          )}
        </div>
      </div>
      <Form.Group controlId="keySelectCallout">
        <Form.Label className="mb-1 mt-2">Callout:</Form.Label>
        <Form.Control
          type="text"
          name="cal"
          value={btnData[key]?.cdt === 'effect' ? `https://.../${btnData[key]?.cal.replace(/\/$/, "").split('/').pop()}` : btnData[key]?.cal}
          onChange={handleChange}
          placeholder="Who What Where"
        />
      </Form.Group>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gridGap: "1rem",
          margin: "1rem 0"
        }}
      >
        <div>
          <Form.Group controlId="eInputCE">
            <Form.Label className="m-0">Duration:</Form.Label>
            <Form.Control
              type="number"
              name="dur"
              value={btnData[key]?.dur}
              onChange={handleChange}
              placeholder="Callout length"
            />
          </Form.Group>
        </div>
        <div>
          <span className="mb-1 mt-3">Type:</span>
          <Dropdown>
            <Dropdown.Toggle
              variant="accent"
              type="submit"
              id="typeSelect"
              block
              style={{ width: "100%" }}
            >
              {btnData[key]?.cdt.toString().charAt(0).toUpperCase() +
                btnData[key]?.cdt.toString().slice(1)}
            </Dropdown.Toggle>
            <Dropdown.Menu variant={props.optionsData.mod}>
              <Dropdown.Item onClick={() => setType("alert")}>
                Alert
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setType("timer")}>
                Timer
              </Dropdown.Item>
              {props.optionsData.ppi || auth.currentUser.uid === "WX0BLAgBQCWYgFp57CktQNxdPrR2" && (
                <>
                  <Dropdown.Item onClick={() => setType("effect")}>
                    Effect
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setType("template")}>
                    Template
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <span className="mb-1">Color:</span>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          alignItems: "center",
          gridGap: "1rem"
        }}
      >
        {btnData[key]?.col === "danger" ? (
          <Button variant="danger" className="active">R</Button>
        ) : (
          <Button variant="danger" onClick={() => setCalloutColor("danger")}>
            R
          </Button>
        )}
        {btnData[key]?.col === "warning" ? (
          <Button variant="warning" className="active">
            O
          </Button>
        ) : (
          <Button variant="warning" onClick={() => setCalloutColor("warning")}>
            O
          </Button>
        )}
        {btnData[key]?.col === "info" ? (
          <Button variant="info" className="active">
            Y
          </Button>
        ) : (
          <Button variant="info" onClick={() => setCalloutColor("info")}>
            Y
          </Button>
        )}
        {btnData[key]?.col === "success" ? (
          <Button variant="success" className="active">
            G
          </Button>
        ) : (
          <Button variant="success" onClick={() => setCalloutColor("success")}>
            G
          </Button>
        )}
        {btnData[key]?.col === "primary" ? (
          <Button variant="primary" className="active">
            B
          </Button>
        ) : (
          <Button variant="primary" onClick={() => setCalloutColor("primary")}>
            B
          </Button>
        )}
        {btnData[key]?.col === "secondary" ? (
          <Button variant="secondary" className="active">
            I
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={() => setCalloutColor("secondary")}
          >
            I
          </Button>
        )}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gridGap: "1rem",
          marginTop: "1rem"
        }}
      >
        <Button variant="accent" onClick={() => applyChange()}>
          Apply
        </Button>
        <Button variant="accent" onClick={() => revertChange()}>
          Revert
        </Button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  optionsData: getOptionsData(state),
  socialSess: getSocialSess(state)
});

export default connect(mapStateToProps, null)(Callouts);
