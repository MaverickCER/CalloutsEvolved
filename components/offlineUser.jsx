import React, { useEffect, useState } from 'react';
import { onValue, update } from 'firebase/database';

import { database } from '../firebase/firebaseClient';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

const OfflineUser = ({ userId, title }) => {
  const { currentUser, userData } = useAuth();
  const [userObj, setUserObj] = useState({});
  const [userStt, setUserStt] = useState('');

  useEffect(() => {
    async function getUserObj() {
      if (userId !== 'Anonymous') {
        let unsubscribe0 = onValue(ref(database, `userData/${userId}`), (DataSnapshot) => {
          if (DataSnapshot.exists()) {
            setUserObj({ ...DataSnapshot.val() });
          }
        });

        return () => {
          unsubscribe0();
        };
      } else {
        if (userData) {
          setUserObj({ ...userData });
        } else {
          setUserObj({
            color: 'a',
            displayName: 'Anonymous',
            honor: 0,
            infamy: 0,
            isSessionIdPublic: false,
            sessionId: 'sessions',
            title: 'Anonymous',
            userId: '0',
            userPhotoUrl: 'https://i.imgur.com/6X537cL.png',
          });
        }
      }
    }

    getUserObj();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <>
      <div key={key}>
        <div className="userBadge">
          <span className="userImageWrapper">
            <img src={userObj.userPhotoURL} alt={userObj.displayName} height={192} width={144} />
          </span>
          <span>
            <p className="userName">{userObj.displayName}</p>
            <small className="userReputation">{`${title ? title : 'Gamer'}${
              userObj.title !== 'Gamer' && ' ★'
            } - Honor: ${data.honor} - Infamy: ${data.infamy}`}</small>
            <small className="userUsers">
              {userObj.honor} - {userObj.infamy}
            </small>
          </span>
        </div>
        <p className="userDescription">{`${userObj.message}`}</p>
      </div>
    </>
  );
};

export default OfflineUser;
