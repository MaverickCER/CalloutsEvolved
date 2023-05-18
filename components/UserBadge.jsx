import 'regenerator-runtime';

import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { child, get, onValue, ref, update } from 'firebase/database';

import Input from './ui/input';
import Link from 'next/link';
import Select from './ui/select';
import UserSocial from './UserSocial';
import { database } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useSettings } from '../context/SettingsContext';

const UserBadge = ({
  title,
  guildTitle,
  guildLocation,
  isDeaf,
  isOwner,
  isModerator,
  userId = 'deleted',
  triggerAction,
  sessionButtons,
}) => {
  const router = useRouter();
  const path = router.pathname.split('/')[1];
  const { id } = router.query;
  const { ahk, audio, setAudioData, allDialectsArr, theme, userIsPremium } = useSettings();
  const { userData, removeGamer, manageMember, removeMember } = useAuth();
  const [threshold, setThreshold] = useState(70);
  const [bio, setBio] = useState();
  const [isStatusPublic, setIsStatusPublic] = useState(true);
  const [isBlacklisted, setIsBlacklisted] = useState(true);
  const [status, setStatus] = useState({});
  const [lastActive, setLastActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState('a');
  const [displayName, setDisplayName] = useState('Unknown');
  const [honor, setHonor] = useState(0);
  const [infamy, setInfamy] = useState(0);
  const [mvp, setMvp] = useState('Gamer');
  const [isSessionIdPublic, setIsSessionIdPublic] = useState(false);
  const [sessionId, setSessionId] = useState('Unknown');
  const [userPhotoURL, setUserPhotoURL] = useState('https://i.imgur.com/yk5wTiF.png');
  const [speech, setSpeech] = useState('');
  const [commands, setCommands] = React.useState([
    {
      command: `hello world`,
      callback: () => console.log('hello!'),
    },
  ]);
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition({ commands });

  useEffect(() => {
    if (path === 'sessions') {
      if (isBlacklisted === true) {
        setIsBlacklisted(false);
      } else if (isBlacklisted === false) {
        setColor(userData.color);
        setDisplayName(userData.displayName);
        setHonor(userData.honor);
        setMvp(userData.title);
        setInfamy(userData.infamy);
        setIsOpen(userData.isOpen);
        setIsSessionIdPublic(userData.isSessionIdPublic);
        setSessionId(userData.sessionId);
        setUserPhotoURL(userData.userPhotoURL);
        setIsStatusPublic(userData.isStatusPublic);
        setStatus(userData.status);
        setLastActive(userData.timestamp);
      }
    } else {
      if (isBlacklisted === true) {
        if (userData.userId === userId) {
          setIsBlacklisted(false);
        } else if (userData.userId !== '0') {
          get(child(ref(database), `userLists/${userId}/blacklist/${userData.userId}`)).then(
            (DataSnapshot) => {
              if (DataSnapshot.exists()) {
                if (isBlacklisted !== DataSnapshot.val()) {
                  setIsBlacklisted(DataSnapshot.val());
                }
              } else {
                if (isBlacklisted !== false) {
                  setIsBlacklisted(false);
                }
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
      } else if (isBlacklisted === false) {
        if (userData.userId === userId) {
          setBio(userData.Bio);
          setColor(userData.color);
          setDisplayName(userData.displayName);
          setHonor(userData.honor);
          setMvp(userData.title !== null ? userData.title : 'Gamer');
          setInfamy(userData.infamy);
          setIsOpen(userData.isOpen !== null ? userData.isOpen : true);
          setIsSessionIdPublic(userData.isSessionIdPublic);
          setSessionId(userData.sessionId);
          setUserPhotoURL(userData.userPhotoURL);
          setIsStatusPublic(userData.isStatusPublic);
          setStatus(userData.status);
          setLastActive(userData.timestamp);
        } else {
          let unsubscribe = onValue(ref(database, `userData/${userId}`), (DataSnapshot) => {
            if (DataSnapshot.exists()) {
              if (DataSnapshot.val().bio) {
                setBio(DataSnapshot.val()?.bio);
              }
              setColor(DataSnapshot.val().color);
              setDisplayName(DataSnapshot.val().displayName);
              setHonor(DataSnapshot.val().honor);
              setInfamy(DataSnapshot.val().infamy);
              setIsOpen(DataSnapshot.val().isOpen !== null ? DataSnapshot.val().isOpen : true);
              setIsSessionIdPublic(DataSnapshot.val().isSessionIdPublic);
              setIsStatusPublic(DataSnapshot.val().isStatusPublic);
              setLastActive(DataSnapshot.val().timestamp);
              setMvp(DataSnapshot.val().title !== null ? DataSnapshot.val().title : 'Gamer');
              setSessionId(DataSnapshot.val().sessionId);
              setStatus(DataSnapshot.val().status);
              setUserPhotoURL(DataSnapshot.val().userPhotoURL);
            }
          });
          return () => unsubscribe();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBlacklisted, path]);

  useEffect(() => {
    if (userId !== userData.userId) return;
    if (path !== 'session' && path !== 'sessions') return;
    if (isDeaf === true) {
      let updates = {};
      if (listening) {
        updates[`sessionSpeech/${id}/${userData.userId}`] = transcript.slice(-80);
      } else {
        resetTranscript();
        updates[`sessionSpeech/${id}/${userData.userId}`] = 'Muted';
      }
      update(ref(database), updates);
      if (userId === userData.userId) {
        if (listening) {
          setSpeech(transcript.slice(-80));
        } else {
          resetTranscript();
          setSpeech('Muted');
        }
      }
    } else {
      if (path === 'session' || path === 'sessions') {
        if (listening) {
          setSpeech(transcript.slice(-80));
        } else {
          resetTranscript();
          setSpeech('Muted');
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeaf, userId, userData, transcript, listening, path, id]);

  useEffect(() => {
    if (userData.isDeaf === true && path === 'session' && userId !== userData.userId) {
      let unsubscribe = onValue(ref(database, `sessionSpeech/${id}/${userId}`), (DataSnapshot) => {
        if (DataSnapshot.exists()) {
          setSpeech(DataSnapshot.val());
        }
      });

      return () => unsubscribe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeaf, path, id]);

  useEffect(() => {
    if (userData.userId === userId && sessionButtons) {
      let array = [];
      for (const [key, value] of Object.entries(sessionButtons)) {
        if (value.texts !== null && value.texts !== undefined && value.texts !== '') {
          array = [
            ...array,
            {
              command: value.text.toLowerCase(),
              callback: () => {
                triggerAction(key, false);
              },
              isFuzzyMatch: true,
              fuzzyMatchingThreshold: threshold / 100,
              bestMatchOnly: true,
            },
            {
              command: value.texts.toLowerCase(),
              callback: () => {
                triggerAction(key, true);
              },
              isFuzzyMatch: true,
              fuzzyMatchingThreshold: threshold / 100,
              bestMatchOnly: true,
            },
          ];
        } else {
          array = [
            ...array,
            {
              command: value.text.toLowerCase(),
              callback: () => {
                triggerAction(key, false);
              },
              isFuzzyMatch: true,
              fuzzyMatchingThreshold: threshold / 100,
              bestMatchOnly: true,
            },
          ];
        }
      }
      setCommands([...array]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, sessionButtons, threshold]);

  return (
    <>
      <details
        className="guildLink"
        style={{
          borderLeft:
            userData.userId !== userId
              ? `1px solid rgb(${theme['cb' + color]})`
              : `1px solid transparent`,
          borderRight:
            userData.userId === userId
              ? `1px solid rgb(${theme['cb' + color]})`
              : `1px solid transparent`,
        }}>
        <summary className="guildBadge">
          <span className="guildImageWrapper">
            <img src={userPhotoURL} alt={displayName} height={192} width={144} />
          </span>
          <span>
            {isBlacklisted !== false ? (
              <>
                <p className="guildName">(A) Unknown</p>
                <small className="guildReputation">Blacklisted - Honor: 0 - Infamy: 0</small>
                <small className="guildUsers">Status: Unknown</small>
              </>
            ) : (
              <>
                <p className="guildName">{`(${color.toUpperCase()}) ${displayName}`}</p>
                <small className="guildReputation">
                  {`${title}${mvp !== 'Gamer' && mvp !== 'Anonymous' ? ' ★' : ''} -`}
                  &nbsp;
                  <span title="Honor">{honor}</span>
                  &nbsp;-&nbsp;
                  <span title="Infamy">{infamy}</span>
                </small>
                <small className="guildUsers">{`${
                  mvp === 'Anonymous'
                    ? 'Status: Gaming'
                    : userData !== '0' || isOpen
                    ? isStatusPublic
                      ? isSessionIdPublic
                        ? `Status: ${sessionId && sessionId !== '' ? 'Gaming' : status}`
                        : `Status: ${status}`
                      : `Status: ${status}`
                    : 'Status: Unknown'
                }`}</small>
              </>
            )}
          </span>
        </summary>
        <div>
          {isBlacklisted ? (
            <>
              {isBlacklisted === true ? `No reason provided` : `Reason: ${isBlacklisted}`}
              {path === 'session' && (
                <>
                  Note: Unlike traditional social applications, you will continue to recieve
                  communications from this user until you or they leave this session. Afterwards,
                  the two of you will never be able to join the same session unless you unblock
                  them.
                  {userData.userId === id && id === sessionId && (
                    <>
                      <button
                        onClick={() => {
                          removeGamer(userId, id, sessionId, true);
                        }}>
                        Kick
                      </button>
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {bio && <>About: {bio}</>}
              {path === 'guild' && isOwner ? (
                <>
                  <button
                    onClick={() => {
                      manageMember(
                        userId,
                        id,
                        guildTitle === 'titleModerator' ? 'titleMaster' : 'titleModerator'
                      );
                    }}>
                    Promote to {guildTitle === 'titleModerator' ? masterLabel : moderatorLabel}
                  </button>
                  {guildTitle === 'titleMember' ? (
                    <>
                      <button
                        onClick={() => {
                          removeMember(userId, id, guildLocation, guildTitle, true);
                        }}>
                        Remove {memberLabel}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          manageMember(userId, id, 'titleMember');
                        }}>
                        Demote to {memberLabel}
                      </button>
                    </>
                  )}
                </>
              ) : (
                path === 'guild' &&
                isModerator &&
                guildTitle === 'titleMember' && (
                  <>
                    <button
                      onClick={() => {
                        removeMember(userId, id, guildLocation, guildTitle, true);
                      }}>
                      Remove {memberLabel}
                    </button>
                  </>
                )
              )}
              {path === 'session' && userData.userId === id && id === sessionId && (
                <>
                  <button
                    onClick={() => {
                      removeGamer(userId, id, sessionId, false);
                    }}>
                    Kick
                  </button>
                  <button
                    onClick={() => {
                      removeGamer(userId, id, sessionId, true);
                    }}>
                    Kick and Block
                  </button>
                </>
              )}
              {userData.userId !== userId && userId !== '0' && (
                <>
                  <UserSocial userId={userId} />
                  {!router.pathname.includes(`/user/${userId}`) && (
                    <Link href={`/user/${userId}`}>
                      View Profile
                    </Link>
                  )}
                </>
              )}
              {(path === 'session' || path === 'sessions') &&
                (userData.userId === userId || userId === '0') && (
                  <>
                    Speech Synthesis:
                    {!userIsPremium ? (
                      <>
                        <div>
                          <button
                            onClick={() => {
                              setAudioData('ttsChatI', !audio.ttsChatI);
                            }}>
                            {audio.ttsChatI ? 'Incoming Chat: On' : 'Incoming Chat: Off'}
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              setAudioData('ttsChatO', !audio.ttsChatO);
                            }}>
                            {audio.ttsChatO ? 'Outgoing Chat: On' : 'Outgoing Chat: Off'}
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              setAudioData('ttsCalloutsI', !audio.ttsCalloutsI);
                            }}>
                            {audio.ttsCalloutsI
                              ? 'Incoming Callouts: On'
                              : 'Incoming Callouts: Off'}
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              setAudioData('ttsCalloutsO', !audio.ttsCalloutsO);
                            }}>
                            {audio.ttsCalloutsO
                              ? 'Outgoing Callouts: On'
                              : 'Outgoing Callouts: Off'}
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <button
                            onClick={() => {
                              setAudioData('ttsChatI', !audio.ttsChatO);
                              setAudioData('ttsChatO', !audio.ttsChatO);
                            }}>
                            {audio.ttsChatO ? 'Chat: On' : 'Chat: Off'}
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              setAudioData('ttsCalloutsI', !audio.ttsCalloutsO);
                              setAudioData('ttsCalloutsO', !audio.ttsCalloutsO);
                            }}>
                            {audio.ttsCalloutsO ? 'Callouts: On' : 'Callouts: Off'}
                          </button>
                        </div>
                      </>
                    )}
                    Speech Commands:
                    <Input
                      autoComplete="off"
                      change={(e) => {
                        setThreshold(e.target.value);
                      }}
                      error=""
                      label="Threshold"
                      name="threshold"
                      placeholder="Sensitivity for speech commands"
                      required="true"
                      title="Adjust the sensitivity for speech commands"
                      type="number"
                      val={threshold}
                      valMax={90}
                      valMin={50}
                      valStep={10}
                    />
                    Speech Transcription:
                    <Select
                      autoComplete="off"
                      label="Language"
                      name="sttLang"
                      placeholder="Select a Language"
                      title="Select a Language"
                      val={audio.sttDialect}
                      change={(e) => {
                        setAudioData('sttDialect', e.target.value);
                      }}>
                      <option value={audio.sttDialect}>
                        {
                          allDialectsArr.filter((o) => {
                            return o.code === audio.sttDialect;
                          })[0].dialect
                        }
                      </option>
                      {allDialectsArr.map((v, i) => (
                        <option key={i} value={v.code}>
                          {v.dialect}
                        </option>
                      ))}
                    </Select>
                  </>
                )}
            </>
          )}
        </div>
      </details>
      {(path === 'session' || path === 'sessions') &&
      (userData.userId === userId || userId === '0') ? (
        <>
          <button
            onClick={() => {
              if (listening) {
                SpeechRecognition.stopListening();
              } else {
                SpeechRecognition.startListening({
                  continuous: true,
                  language: audio.sttDialect,
                });
              }
            }}>
            {listening ? 'Stop Speech Recognition' : 'Start Speech Recognition'}
          </button>
          {isDeaf ? 'Public' : 'Private'}: {listening ? speech : 'Muted'}
        </>
      ) : (
        userData.isDeaf && path === 'session' && <>{speech ? <>{speech}</> : <>Muted</>}</>
      )}
    </>
  );
};

export default UserBadge;
