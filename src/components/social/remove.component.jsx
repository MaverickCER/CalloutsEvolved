import React from 'react';
import { connect } from "react-redux";
import { Button } from 'react-bootstrap';
import { firestore } from '../../utils/firebase.util';
import { getSocialSess } from "../../redux/social/social.selectors";

const Remove = (props) => {
  const handleClick = async () => {
    firestore
      .doc(`sessions/${props.socialSess}`)
      .get()
      .then((res) => {
        if (res.empty) return;
        if (res.data() === undefined) return;
        let array = res.data().sesData.arr;
        let filtered = array.filter(
          (a) => a !== `${props.playerID}`
        );
        firestore
          .doc(`sessions/${res.data().sesData.sid}`)
          .set({ sesData: { arr: filtered } }, { merge: true });
        firestore
          .doc(
            `sessions/${res.data().sesData.sid}/sttData/${
              props.playerID
            }`
          )
          .delete();
      });
  };

  return (
    <Button variant='accent' onClick={handleClick}>
      Remove
    </Button>
  );
};

const mapStateToProps = (state) => ({
  socialSess: getSocialSess(state)
});

export default connect(mapStateToProps, null)(Remove);
