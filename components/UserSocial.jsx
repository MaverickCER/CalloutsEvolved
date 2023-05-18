import React, { useEffect, useState } from 'react';
import { child, get, ref, update } from 'firebase/database';

import Input from './ui/input';
import { database } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

const UserSocial = ({ userId = 'deleted' }) => {
  const { currentUser } = useAuth();
  const isCurrentUser = currentUser && currentUser.uid ? currentUser.uid === userId : false;
  const [isBlacklisted, setIsBlacklisted] = useState(true);
  const [isFriend, setIsFriend] = useState(false);
  const [isFoe, setIsFoe] = useState(false);
  const [isInfamous, setIsInfamous] = useState(false);
  const [reason, setReason] = useState(false);
  const [reasonVal, setReasonVal] = useState('');
  const [editReason, setEditReason] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser || isCurrentUser) return;
    if (isBlacklisted === true) {
      get(child(ref(database), `userLists/${userId}/blacklist/${currentUser.uid}`)).then(
        (DataSnapshot) => {
          if (DataSnapshot.exists()) {
            setIsBlacklisted(DataSnapshot.val());
          } else {
            setIsBlacklisted(false);
          }
        }
      );
    }

    if (isBlacklisted === false) {
      get(child(ref(database), `userLists/${currentUser.uid}`)).then((DataSnapshot4) => {
        if (DataSnapshot4.exists()) {
          if (DataSnapshot4.val().blacklist) {
            if (Object.keys(DataSnapshot4.val().blacklist).includes(id)) {
              if (DataSnapshot4.val().blacklist[id].isInfamous) {
                setIsInfamous(true);
              } else {
                setIsFoe(true);
              }
              setReason(DataSnapshot4.val().blacklist[id].reason);
            }
          }
          if (DataSnapshot4.val().whitelist) {
            if (Object.keys(DataSnapshot4.val().whitelist).includes(id)) {
              setIsFriend(true);
            }
          }
        }
      });
    }
  }, [currentUser, isCurrentUser, isBlacklisted, userId]);

  const addFriend = () => {
    let updates = {};
    updates[`userLists/${currentUser.uid}/blacklist/${userId}`] = null;
    updates[`userLists/${currentUser.uid}/whitelist/${userId}`] = reason ? reason : true;
    update(ref(database), updates).then(() => {
      setIsFriend(true);
      setIsFoe(false);
    });
  };

  const removeFriend = () => {
    let updates = {};
    updates[`userLists/${currentUser.uid}/whitelist/${userId}`] = null;
    update(ref(database), updates).then(() => {
      setIsFriend(false);
      setReason('');
    });
  };

  const block = () => {
    let updates = {};
    updates[`userLists/${currentUser.uid}/blacklist/${userId}/isInfamous`] = false;
    updates[`userLists/${currentUser.uid}/blacklist/${userId}/reason`] = reason ? reason : true;
    updates[`userLists/${currentUser.uid}/whitelist/${userId}`] = null;
    update(ref(database), updates).then(() => {
      setIsFriend(false);
      setIsFoe(true);
    });
  };

  const unblock = () => {
    let updates = {};
    updates[`userLists/${currentUser.uid}/blacklist/${userId}`] = null;
    update(ref(database), updates).then(() => {
      setIsFoe(false);
    });
  };

  const report = () => {
    let updates = {};
    updates[`userLists/${currentUser.uid}/blacklist/${userId}/isInfamous`] = true;
    updates[`userLists/${currentUser.uid}/blacklist/${userId}/reason`] = reason ? reason : true;
    updates[`userLists/${currentUser.uid}/whitelist/${userId}`] = null;
    updates[`userLists/${userId}/infamylist/${currentUser.uid}`] = reason ? reason : true;
    update(ref(database), updates).then(() => {
      setIsFriend(false);
      setIsFoe(false);
      setIsInfamous(true);
    });
  };

  const onSubmit = async () => {
    setLoading(true);

    let updates = {};
    if (isFriend) {
      updates[`userLists/${currentUser.uid}/whitelist/${userId}`] =
        reasonVal !== '' ? reasonVal : true;
    } else if (isInfamous) {
      updates[`userLists/${currentUser.uid}/blacklist/${userId}/reason`] = reasonVal
        ? reasonVal
        : true;
      updates[`userLists/${userId}/infamylist/${currentUser.uid}`] = reasonVal ? reasonVal : true;
    } else {
      updates[`userLists/${currentUser.uid}/blacklist/${userId}/reason`] =
        reasonVal !== '' ? reasonVal : true;
    }
    update(ref(database), updates).then(() => {
      setReason(reasonVal);
      setLoading(false);
      setReasonVal('');
    });
  };

  return (
    <>
      {currentUser && !isCurrentUser && (
        <>
          {isFriend ? (
            <>
              <button
                onClick={() => {
                  removeFriend();
                }}>
                Remove friend
              </button>
            </>
          ) : (
            !isInfamous && (
              <>
                <button
                  onClick={() => {
                    addFriend();
                  }}>
                  Add friend
                </button>
              </>
            )
          )}
          {isFoe || isInfamous ? (
            !isInfamous && (
              <>
                <button
                  onClick={() => {
                    unblock();
                  }}>
                  Unblock
                </button>
              </>
            )
          ) : (
            <>
              <button
                onClick={() => {
                  block();
                }}>
                Block
              </button>
            </>
          )}
          {!isInfamous && (
            <>
              <button
                onClick={() => {
                  report();
                }}>
                Report and Block Permanently
              </button>
            </>
          )}
          {(isFriend || isFoe || isInfamous) && (
            <>
              <p>
                {isInfamous ? 'Reported' : isFoe ? 'Reason' : isFriend && 'Note'}: {reason}
              </p>
              <button
                onClick={() => {
                  setEditReason(!editReason);
                }}>
                Edit
              </button>
            </>
          )}
          {(isFriend || isFoe || isInfamous) && editReason && (
            <Input
              autoComplete="off"
              btn={loading ? 'Loading...' : 'Submit'}
              btnAction={() => {
                onSubmit();
              }}
              change={(e) => {
                setReasonVal(e.target.value);
              }}
              error=""
              label={isFriend ? 'Note' : 'Reason'}
              name="reasonVal"
              placeholder={
                isFriend ? 'Make a note about this friend' : 'Please explain what happened.'
              }
              required="true"
              title={isFriend ? 'Make a note about this friend' : 'Please explain what happened.'}
              type="text"
              val={reasonVal}
            />
          )}
        </>
      )}
    </>
  );
};

export default UserSocial;
