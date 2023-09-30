import React, { useEffect, useState } from 'react';
import { child, get, onValue, ref, serverTimestamp, update } from 'firebase/database';

import UserBadge from './UserBadge';
import { database } from '../firebase/firebaseClient';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const OfflineUsers = ({ list = 'whitelist', data = { isDeaf: false } }) => {
  const router = useRouter();
  const path = router.pathname.split('/')[1];
  const { id } = router.query;
  const { userData } = useAuth();
  const [isOwner, setIsOwner] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [usersObj, setUsersObj] = useState({
    [userData.userId]: { title: userData.title, guildTitle: 'titleOwner' },
  });

  useEffect(() => {
    async function getUsers(list) {
      if (path !== 'sessions') {
        let unsubscribe = onValue(
          ref(database, `${path}Lists/${id}/${list}`),
          async (DataSnapshot) => {
            if (DataSnapshot.exists()) {
              let obj = {};
              if (path === 'guild') {
                for (const [key, value] of Object.entries(DataSnapshot.val())) {
                  obj = {
                    ...obj,
                    [key]: {
                      title: data[value] ? data[value] : value.substring(5),
                      guildTitle: value,
                    },
                  };
                }
                setUsersObj({ ...obj });
              } else if (path === 'session') {
                for (const [key, value] of Object.entries(DataSnapshot.val())) {
                  obj = {
                    ...obj,
                    [key]: { title: value, guildTitle: key === id ? 'titleOwner' : value },
                  };
                }
                setUsersObj({ ...obj });
              } else {
                setUsersObj(DataSnapshot.val());
              }
              if (list === 'whitelist' && path === 'guild') {
                setIsOwner(DataSnapshot.val()[userData.userId] === 'titleMaster');
                setIsModerator(DataSnapshot.val()[userData.userId] === 'titleModerator');
              }
              if (list === 'whitelist' && path === 'session' && userData.userId === id) {
                setIsOwner(true);
                let array = Object.keys(DataSnapshot.val());
                let updates = {};
                let blacklist = {};
                updates[`sessionData/${id}/isDeaf`] = false;
                let tempArr = [];
                for (let i = 0; i < array.length; i++) {
                  await get(child(ref(database), `userData/${array[i]}/isDeaf`)).then(
                    (Snapshot) => {
                      if (Snapshot.exists()) {
                        tempArr = [...tempArr, Snapshot.key];
                        if (Snapshot.val() === true) {
                          updates[`sessionData/${id}/isDeaf`] = true;
                        }
                      }
                    }
                  );
                  await get(child(ref(database), `userLists/${array[i]}/blacklist`)).then(
                    (Snapshot) => {
                      if (Snapshot.exists()) {
                        let tempObj = {};
                        for (const [key, value] of Object.entries(Snapshot.val())) {
                          tempArr = [...tempArr, value];
                          tempObj = {
                            ...tempObj,
                            [key]: array[i],
                          };
                        }
                        blacklist = {
                          ...blacklist,
                          ...tempObj,
                        };
                      }
                    }
                  );
                }
                updates[`sessionLists/${id}/blacklist`] = blacklist;
                updates[`sessionData/${id}/timestamp`] = serverTimestamp();
                updates[`sessionData/${id}/usersCount`] = DataSnapshot.size;

                Promise.allSettled(tempArr).then(() => {
                  update(ref(database), updates);
                });
              }
            }
          }
        );

        return () => {
          unsubscribe();
        };
      }
    }

    getUsers(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, list]);

  return (
    <>
      <div
        className="userWrapper"
        style={{
          overscrollBehaviorY: 'none',
        }}>
        {path === 'session' && usersObj ? (
          <>
            {Object.entries(usersObj).map(([key, value]) => {
              if (userData.userId !== key)
                return (
                  <div key={key}>
                    <UserBadge
                      userId={key}
                      title={value.title}
                      guildTitle={value.guildTitle}
                      isOwner={isOwner}
                      isDeaf={data.isDeaf}
                    />
                  </div>
                );
            })}
          </>
        ) : (
          usersObj && (
            <>
              {Object.entries(usersObj).map(([key, value]) => {
                return (
                  <div key={key}>
                    <UserBadge
                      userId={key}
                      title={value.title}
                      guildLocation={guildLocation}
                      guildTitle={value.guildTitle}
                      isOwner={isOwner}
                      isModerator={isModerator}
                      isDeaf={false}
                    />
                  </div>
                );
              })}
            </>
          )
        )}
      </div>
    </>
  );
};

export default OfflineUsers;
