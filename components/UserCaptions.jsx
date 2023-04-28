import 'regenerator-runtime';

import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { ref, update } from 'firebase/database';

import Input from './ui/input';
import Select from './ui/select';
import { database } from '../firebase/firebaseClient';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSettings } from '../context/SettingsContext';

const UserCaptions = ({ isDeaf, triggerAction, sessionButtons }) => {
  const router = useRouter();
  const path = router.pathname.split('/')[1];
  const { id } = router.query;
  const { audio, setAudioData, allDialectsArr, userIsPremium } = useSettings();
  const { userData } = useAuth();
  const [speech, setSpeech] = useState('');
  const [commands, setCommands] = React.useState([
    {
      command: `hello world`,
      callback: () => console.log('hello!'),
    },
  ]);
  const { transcript, listening, resetTranscript } = useSpeechRecognition({ commands });

  useEffect(() => {
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
  }, [isDeaf, userData, transcript, listening, path, id]);

  useEffect(() => {
    if (sessionButtons) {
      let array = [];
      for (const [key, value] of Object.entries(sessionButtons)) {
        if (value.text !== null && value.text !== undefined && value.text !== '') {
          array = [
            ...array,
            {
              command: value.text.toLowerCase(),
              callback: () => {
                console.error('Speech', key, false);
                triggerAction(key, false);
              },
              isFuzzyMatch: true,
              fuzzyMatchingThreshold: audio.threshold / 100,
              bestMatchOnly: true,
            },
          ];
        }
        if (value.texts !== null && value.texts !== undefined && value.texts !== '') {
          array = [
            ...array,
            {
              command: value.texts.toLowerCase(),
              callback: () => {
                console.error('Speech', key, false);
                triggerAction(key, false);
              },
              isFuzzyMatch: true,
              fuzzyMatchingThreshold: audio.threshold / 100,
              bestMatchOnly: true,
            },
          ];
        }
      }
      setCommands([...array]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionButtons, audio.threshold]);

  return (
    <>
      <details className="guildLink">
        <summary className="guildBadge">
          <span className="guildImageWrapper">
            <Image src={userData.userPhotoURL} alt={userData.displayName} height={192} width={144} />
          </span>
          <span>
            <p className="guildName">{`(${userData.color.toUpperCase()}) ${
              userData.displayName
            }`}</p>
            <small className="guildReputation">
              {`${userData.title}${
                userData.title !== 'Gamer' && userData.title !== 'Anonymous' ? ' ★' : ''
              } -`}
              &nbsp;
              <span title="Honor">{userData.honor}</span>
              &nbsp;-&nbsp;
              <span title="Infamy">{userData.infamy}</span>
            </small>
            <small className="guildUsers">Status: Gaming</small>
          </span>
        </summary>
        <div>
          Speech Synthesis:
          <div>
            <button
              onClick={() => {
                if (audio.ttsCalloutsI && audio.ttsCalloutsO) {
                  if (userIsPremium) {
                    setAudioData('ttsCalloutsI', true);
                    setAudioData('ttsCalloutsO', false);
                  } else {
                    setAudioData('ttsCalloutsI', false);
                    setAudioData('ttsCalloutsO', false);
                  }
                } else if (audio.ttsCalloutsI) {
                  setAudioData('ttsCalloutsI', false);
                  setAudioData('ttsCalloutsO', true);
                } else if (audio.ttsCalloutsO) {
                  setAudioData('ttsCalloutsI', false);
                  setAudioData('ttsCalloutsO', false);
                } else {
                  setAudioData('ttsCalloutsI', true);
                  setAudioData('ttsCalloutsO', true);
                }
              }}>
              {audio.ttsCalloutsI && audio.ttsCalloutsO
                ? 'Callouts: Enabled'
                : audio.ttsCalloutsI
                ? 'Callouts: Incoming'
                : audio.ttsCalloutsO
                ? 'Callouts: Outgoing'
                : 'Callouts: Disabled'}
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                if (audio.ttsChatI && audio.ttsChatO) {
                  if (userIsPremium) {
                    setAudioData('ttsChatI', true);
                    setAudioData('ttsChatO', false);
                  } else {
                    setAudioData('ttsChatI', false);
                    setAudioData('ttsChatO', false);
                  }
                } else if (audio.ttsChatI) {
                  setAudioData('ttsChatI', false);
                  setAudioData('ttsChatO', true);
                } else if (audio.ttsChatO) {
                  setAudioData('ttsChatI', false);
                  setAudioData('ttsChatO', false);
                } else {
                  setAudioData('ttsChatI', true);
                  setAudioData('ttsChatO', true);
                }
              }}>
              {audio.ttsChatI && audio.ttsChatO
                ? 'Chat: Enabled'
                : audio.ttsChatI
                ? 'Chat: Incoming'
                : audio.ttsChatO
                ? 'Chat: Outgoing'
                : 'Chat: Disabled'}
            </button>
          </div>
          {!userIsPremium && <>Get access to better synthesis controls by becoming an MVP</>}
          Speech Commands:
          <Input
            autoComplete="off"
            change={(e) => {
              setAudioData('threshold', parseInt(e.target.value));
            }}
            error=""
            label="Threshold"
            name="threshold"
            placeholder="Sensitivity for speech commands"
            required="true"
            title="Adjust the sensitivity for speech commands"
            type="number"
            val={audio.threshold}
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
        </div>
      </details>
      {sessionButtons && (
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
      )}
    </>
  );
};

export default UserCaptions;
