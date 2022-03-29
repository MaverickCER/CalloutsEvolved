import React from "react";
import { Accordion } from "react-bootstrap";
import { auth, firestore } from "../../utils/firebase.util";
import { ContextAwareToggle } from "../theme/colors.component";
import View from "./view.component";

const List = () => {
  const [whitelist, setWhitelist] = React.useState([]);
  const [blacklist, setBlacklist] = React.useState([]);
  const [lists, setLists] = React.useState([]);

  React.useEffect(() => {
    const getList = () => {
      return firestore
        .doc(`customers/${auth.currentUser.uid}/userData/lists`)
        .onSnapshot((docSnapshot) => {
          if (!docSnapshot.empty) {
            if (JSON.stringify(docSnapshot.data()) !== lists) {
              setLists(JSON.stringify(docSnapshot.data()));
            }
            const docBlacklist = docSnapshot.data().blacklist;
            const docWhitelist = docSnapshot.data().whitelist;
            const arr0 = [];
            const arr1 = [];
            if (docBlacklist.length === 0) {
              setBlacklist([]);
            } else {
              docBlacklist.forEach((val) => {
                if (val !== "" && val !== undefined && val !== null) {
                  firestore
                    .doc(`customers/${val}`)
                    .get()
                    .then((userSnapshot) => {
                      if (!userSnapshot.empty) {
                        arr0.push({
                          pdn: userSnapshot.data().userData.cid,
                          pid: userSnapshot.data().userData.uid
                        });
                        setBlacklist(arr0);
                      }
                    });
                }
              });
            }
            if (docWhitelist.length === 0) {
              setWhitelist([]);
            } else {
              docWhitelist.forEach((val) => {
                if (val !== "" && val !== undefined && val !== null) {
                  firestore
                    .doc(`customers/${val}`)
                    .get()
                    .then((userSnapshot) => {
                      if (!userSnapshot.empty) {
                        arr1.push({
                          pdn: userSnapshot.data().userData.cid,
                          pid: userSnapshot.data().userData.uid
                        });
                        setWhitelist(arr1);
                      }
                    });
                }
              });
            }
          } else {
            setBlacklist([]);
            setWhitelist([]);
          }
        });
    };
    let unsubscribe = getList();
    return unsubscribe;
  }, [lists]);

  return (
    <>
      <Accordion className="pt-1 mb-2 pb-1" defaultActiveKey="0">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridGap: "1rem",
            marginTop: "1rem"
          }}
        >
          <ContextAwareToggle variant="accent" eventKey="0">
            Friends
          </ContextAwareToggle>
          <ContextAwareToggle variant="accent" eventKey="1">
            Blocked
          </ContextAwareToggle>
        </div>
        <div style={{ minHeight: "10rem", height: "calc(100vh - 54.4rem)" }}>
          <Accordion.Collapse className="hcpWrapper mt-3" eventKey="0">
            <>
              {whitelist.map((v, index) => (
                <div
                  key={index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    alignItems: "center",
                    marginTop: "1rem"
                  }}
                >
                  <p>{v.pdn}</p>
                  <View className="mt-1 mb-1" playerID={v.pid} />
                </div>
              ))}
            </>
          </Accordion.Collapse>
          <Accordion.Collapse className="hcpWrapper mt-3" eventKey="1">
            <>
              {blacklist.map((v, index) => (
                <div
                  key={index}
                  style={{ display: "grid", gridTemplateColumns: "1fr auto" }}
                >
                  <p>{v.pdn}</p>
                  <View className="mt-1 mb-1" playerID={v.pid} />
                </div>
              ))}
            </>
          </Accordion.Collapse>
        </div>
      </Accordion>
    </>
  );
};

export default List;
