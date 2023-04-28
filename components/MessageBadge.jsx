import React, { useEffect, useState } from 'react';
import { child, get, ref, update } from 'firebase/database';

import Link from 'next/link';
import Image from 'next/image';
import { database } from '../../firebase/firebaseClient';
import { useAuth } from '../../context/AuthContext';
import ChevronIcon from '../assets/ChevronIcon';

const MessageBadge = ({
  color,
  displayName,
  guild,
  honor,
  infamy,
  isMVP,
  like,
  msg,
  session,
  timestamp,
  title,
  userId,
  userPhotoURL,
}) => {
  const { currentUser } = useAuth();
  const isCurrentUser = currentUser && currentUser.uid ? currentUser.uid === userId : false;
  const [isBlacklisted, setIsBlacklisted] = useState(true);
  const [onBlacklist, setOnBlacklist] = useState(true);
  const [adjHonor, setAdjHonor] = useState(honor);
  const [adjLike, setAdjLike] = useState(like);

  useEffect(() => {
    if (isBlacklisted === true) {
      if (isCurrentUser) {
        setIsBlacklisted(false);
      } else if (currentUser) {
        get(child(ref(database), `userLists/${userId}/blacklist/${currentUser.uid}`)).then(
          (DataSnapshot) => {
            if (DataSnapshot.exists()) {
              if (isBlacklisted !== DataSnapshot.val()) {
                setIsBlacklisted(DataSnapshot.val());
                get(child(ref(database), `userLists/${currentUser.uid}/blacklist/${userId}`)).then(
                  (DataSnapshot) => {
                    if (DataSnapshot.exists()) {
                      if (onBlacklist !== DataSnapshot.val()) {
                        setOnBlacklist(DataSnapshot.val());
                      }
                    } else {
                      if (onBlacklist !== false) {
                        setOnBlacklist(false);
                      }
                    }
                  }
                );
              }
            } else {
              get(child(ref(database), `userLists/${currentUser.uid}/blacklist/${userId}`)).then(
                (DataSnapshot) => {
                  if (DataSnapshot.exists()) {
                    if (onBlacklist !== DataSnapshot.val()) {
                      setOnBlacklist(DataSnapshot.val());
                    }
                  } else {
                    if (onBlacklist !== false) {
                      setOnBlacklist(false);
                    }
                  }
                }
              );
            }
          }
        );
      } else {
        get(child(ref(database), `userData/${userId}/isOpen`)).then((DataSnapshot) => {
          if (DataSnapshot.exists()) {
            if (DataSnapshot.val() === true && isBlacklisted !== false) {
              setIsBlacklisted(false);
            } else if (
              isBlacklisted !== 'This profile is private. Please login to view more information.'
            ) {
              setIsBlacklisted('This profile is private. Please login to view more information.');
            }
          } else {
            if (isBlacklisted !== 'This user does not exist.') {
              setIsBlacklisted('This user does not exist.');
            }
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBlacklisted, userId]);

  const changeRep = async (val, delta) => {
    if (currentUser && currentUser.uid !== userId && (session || guild)) {
      let updates = {};
      if (session) {
        updates[`sessionMessages/${session}/${msg}/honor`] = increment(delta);
        updates[`userData/${userId}/honor`] = increment(delta);
        updates[`sessionMsgHonors/${session}/${msg}/${currentUser.uid}`] = val;
      } else if (guild) {
        updates[`guildMessages/${guild}/${msg}/honor`] = increment(delta);
        updates[`userData/${userId}/honor`] = increment(delta);
        updates[`sessionMsgHonors/${guild}/${msg}/${currentUser.uid}`] = val;
      }

      update(ref(database), updates).then(() => {
        setAdjHonor(honor + delta);
        setAdjLike(val);
      });
    }
  };

  return (
    <>
      <details
        className="guildLink"
        style={{
          borderLeft: !isCurrentUser
            ? `1px solid rgb(${theme['cb' + color]})`
            : `1px solid transparent`,
          borderRight: isCurrentUser
            ? `1px solid rgb(${theme['cb' + color]})`
            : `1px solid transparent`,
        }}>
        <summary className="guildBadge">
          <span className="guildImageWrapper">
            <Image src={userPhotoURL} alt={displayName} height={192} width={144} />
          </span>
          <span>
            {isBlacklisted || onBlacklist ? (
              <>
                <p className="guildName">(A) Unknown</p>
                <small className="guildReputation">Blacklisted - Honor: 0 - Infamy: 0</small>
                <small className="guildUsers">Status: Unknown</small>
              </>
            ) : (
              <>
                <p className="guildName">{`(${color}) ${displayName}`}</p>
                <small className="guildReputation">
                  {`${title}${isMVP && ' ★'} - Honor: ${adjHonor} - Infamy: ${infamy}`}
                </small>
                <small className="guildUsers">
                  {`${getDate(timestamp) + 1}/${getMonth(timestamp)}/${getFullYear(timestamp).slice(
                    2,
                    4
                  )} ${Date(timestamp).toString().split(' ').slice(4, 5).join(' ')}`}
                  {currentUser && (
                    <span className="btn-like-wrapper">
                      {' - '}
                      <button
                        onClick={() => {
                          changeRep(
                            adjLike === false ? null : false,
                            adjLike === false ? 1 : adjLike === true ? -2 : -1
                          );
                        }}>
                        <ChevronIcon
                          width="1em"
                          height="1em"
                          style={{ width: '1rem', height: '1rem' }}
                          title="Dislike Icon"
                          fill={adjLike === false ? `rgb(${theme.bbc})` : `rgb(${theme.mca})`}
                        />
                      </button>
                      <button
                        onClick={() => {
                          changeRep(
                            adjLike === true ? null : true,
                            adjLike === true ? -1 : adjLike === false ? 2 : 1
                          );
                        }}>
                        <ChevronIcon
                          height="1em"
                          style={{ transform: 'rotate(180deg)', width: '1rem', height: '1rem' }}
                          title="Like Icon"
                          width="1em"
                          fill={
                            adjLike || userId === currentUser.uid
                              ? `rgb(${theme.bbc})`
                              : `rgb(${theme.mca})`
                          }
                        />
                      </button>
                    </span>
                  )}
                </small>
              </>
            )}
          </span>
        </summary>
        <div>
          {isBlacklisted || onBlacklist ? (
            <>
              {isBlacklisted !== true && isBlacklisted !== false
                ? onBlacklist !== true && onBlacklist !== false
                  ? `Reason: ${onBlacklist}`
                  : `Reason: ${isBlacklisted}`
                : onBlacklist !== true && onBlacklist !== false
                ? `Reason: ${onBlacklist}`
                : `No reason provided`}
            </>
          ) : (
            !isBlacklisted && (
              <Link href={`user/${userId}`} passHref>
                <a>View Profile</a>
              </Link>
            )
          )}
        </div>
      </details>
    </>
  );
};

export default MessageBadge;
