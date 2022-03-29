import { auth, firestore } from "./firebase.util";

const useLeave = async () => {
  firestore
    .doc(`customers/${auth.currentUser.uid}`)
    .get()
    .then((data) => {
      if (!data.empty) {
        if (data.data() !== undefined) {
          if (
            data.data().userData.sid.toLowerCase() !== "solo" &&
            data.data().userData.sid !== auth.currentUser.uid
          ) {
            firestore
              .doc(`sessions/${data.data().userData.sid}`)
              .get()
              .then(async (data) => {
                if (!data.empty) {
                  if (data.data() !== undefined) {
                    if (data.data().sesData.sap === 1) {
                      firestore
                        .collection(
                          `sessions/${data.data().sesData.sid}/btnData`
                        )
                        .get()
                        .then((querySnapshot) => {
                          querySnapshot.forEach((doc) => {
                            doc.ref.delete();
                          });
                        });
                      firestore
                        .doc(`sessions/${data.data().sesData.sid}/chaData/chat`)
                        .delete();
                      firestore
                        .collection(
                          `sessions/${data.data().sesData.sid}/sttData`
                        )
                        .get()
                        .then((querySnapshot) => {
                          querySnapshot.forEach((doc) => {
                            doc.ref.delete();
                          });
                        });
                      firestore
                        .doc(
                          `sessions/${data.data().sesData.sid}/userData/lists`
                        )
                        .delete();
                      firestore
                        .doc(`sessions/${data.data().sesData.sid}`)
                        .delete();
                    } else {
                      firestore
                        .doc(
                          `sessions/${data.data().sesData.sid}/sttData/${
                            auth.currentUser.uid
                          }`
                        )
                        .delete();
                      firestore
                        .doc(`sessions/${data.data().sesData.sid}/chaData/chat`)
                        .set(
                          {
                            cid: "[System Message]",
                            msg: `${
                              auth.currentUser.displayName
                            } Left Session ID ${data.data().userData.sid}`,
                            ucc: "accent",
                            uid: "0"
                          },
                          { merge: true }
                        );
                      var sapDec = data.data().sesData.sap - 1;
                      firestore.doc(`sessions/${data.data().sesData.sid}`).set(
                        {
                          sesData: {
                            sap: parseInt(sapDec, 10)
                          }
                        },
                        { merge: true }
                      );
                      var oldLists = await firestore
                        .doc(
                          `sessions/${data.data().sesData.sid}/userData/lists`
                        )
                        .get();
                      var oldulist = oldLists.data().userlist.filter((n) => {
                        return n !== auth.currentUser.uid;
                      });
                      firestore
                        .doc(
                          `sessions/${data.data().sesData.sid}/userData/lists`
                        )
                        .set(
                          {
                            userlist: oldulist
                          },
                          { merge: true }
                        );
                    }
                  }
                }
              });
          }
        }
      }
    });
};

export default useLeave;
