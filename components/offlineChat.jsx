import React, { useEffect, useRef, useState } from 'react';
import {
  child,
  query as fbQuery,
  get,
  increment,
  limitToLast,
  onValue,
  orderByChild,
  push,
  ref,
  serverTimestamp,
  update,
} from 'firebase/database';
import { useForm, useWatch } from 'react-hook-form';

import ChevronIcon from '../assets/ChevronIcon';
import FormInput from './ui/formInput';
import { database } from '../firebase/firebaseClient';
import styles from './auth/authform.module.css';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSettings } from '../context/SettingsContext';

const OfflineChat = ({ isSolo }) => {
  const inputRef = useRef(null);
  const messageRef = useRef(null);
  const { userData, currentUser } = useAuth();
  const { audio, speak, theme } = useSettings();
  const [loading, setLoading] = useState(false);
  const [messagesLength, setMessagesLength] = useState(0);
  const [isLive, setIsLive] = useState(true);
  const router = useRouter();
  const path = router.pathname.split('/')[1];
  const { id } = router.query;
  const [messages, setMessages] = useState({});
  const {
    reset,
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });
  const messageInputValue = useWatch({ control, name: 'messageInputValue', defaultValue: '' });

  useEffect(() => {
    if (path === 'session') {
      async function getMessageHonors(messagesObj) {
        if (messagesObj !== {}) {
          let obj = {};
          let tempArr = [];
          for (const [key, val] of Object.entries(messagesObj)) {
            await get(
              child(ref(database), `sessionMsgHonors/${id}/${key}/${userData.userId}`)
            ).then((contents) => {
              val.like = contents.val();
              obj = {
                ...obj,
                [key]: val,
              };

              tempArr = [...tempArr, contents.val()];
            });
          }

          Promise.allSettled(tempArr).then(() => {
            const ret = {};
            Object.keys(obj)
              .sort((a, b) => obj[a].timestamp - obj[b].timestamp)
              .forEach((s) => (ret[s] = obj[s]));
            setMessages(ret);
          });
        }
      }

      let unsubscribe = onValue(
        fbQuery(
          ref(database, `sessionMessages/${id}`),
          orderByChild('timestamp'),
          limitToLast(100)
        ),
        (snapshot) => {
          if (snapshot.exists()) {
            getMessageHonors(snapshot.val());
          }
        }
      );

      return () => {
        unsubscribe();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, id]);

  useEffect(() => {
    function scrollSpy() {
      if (
        Math.ceil(messageRef.current.scrollTop) >=
        Math.ceil(messageRef.current.scrollHeight - messageRef.current.clientHeight)
      ) {
        setIsLive(true);
      } else {
        setIsLive(false);
      }
    }

    messageRef.current.addEventListener('scroll', scrollSpy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageRef]);

  useEffect(() => {
    if (Object.keys(messages).length !== messagesLength) {
      let index = Object.values(messages)[Object.keys(messages).length - 1];
      if (index) {
        setMessagesLength(Object.keys(messages).length);
        let text = index.message;
        let user = index.userId;
        if ((userData && userData.userId === user) || isSolo) {
          if (audio.ttsChatO) {
            speak(text);
          }
        } else {
          if (audio.ttsChatI) {
            speak(text);
          }
        }
      }

      if (isLive) {
        messageRef.current.scrollTop = Math.ceil(
          messageRef.current.scrollHeight - messageRef.current.clientHeight
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesLength, messages, isLive]);

  const onSubmit = async (data) => {
    let messageInputValue = data.messageInputValue.trim();
    if (messageInputValue !== '') {
      setLoading(true);

      let msgObj;
      msgObj = {
        [Object.keys(messages).length]: {
          color: userData.color,
          displayName: userData.displayName,
          honor: 0,
          message: messageInputValue,
          timestamp: Date.now(),
          title: userData.title,
          userId: userData.userId,
          userPhotoURL: userData.userPhotoURL,
        },
      };
      setMessages({ ...messages, ...msgObj });
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
      }
      setValue('messageInputValue', '');
      setLoading(false);
    }
  };

  const userRep = async (key, val, delta, userId) => {
    if (!isSolo && id && userData.userId) {
      let updates = {};
      updates[`sessionMessages/${id}/${key}/honor`] = increment(delta);
      updates[`userData/${userId}/honor`] = increment(delta);
      updates[`sessionMsgHonors/${id}/${key}/${userData.userId}`] = val;
      update(ref(database), updates).then(() => {
        let rep = messages[key].reputation + delta;
        let messageObj = { ...messages };
        messageObj[key].reputation = rep;
        setMessages(messageObj);
      });
    }
  };

  return (
    <>
      <div
        className="messageWrapper"
        ref={messageRef}
        style={{
          height: '300px',
          maxHeight: '300px',
          overflowY: 'scroll',
          overscrollBehaviorY: 'none',
        }}>
        {Object.entries(messages).map(([key, value]) => (
          <div key={key}>
            <div className="messageBadge">
              <span className="messageImageWrapper">
                <Image src={value.userPhotoURL} alt={value.displayName} height={192} width={144} />
              </span>
              <span>
                <p className="messageName">{`${value.displayName}`}</p>
                <small className="messageReputation">{`${value.title} - ${new Date(
                  value.timestamp
                ).toLocaleString(audio.sttDialect, {
                  hour: '2-digit',
                  hour12: theme.hrs,
                  minute: '2-digit',
                  second: '2-digit',
                })}`}</small>
                <br />
                <small className="messageUsers">
                  {value.honor}
                  {value.userId !== userData.userId &&
                    value.userId !== '0' &&
                    currentUser &&
                    !currentUser.isAnonymous && (
                      <span className="btn-like-wrapper">
                        <button
                          onClick={() => {
                            userRep(
                              key,
                              value.like === false ? null : false,
                              value.like === false ? 1 : value.like === true ? -2 : -1,
                              value.userId
                            );
                          }}>
                          <ChevronIcon
                            width="1em"
                            height="1em"
                            style={{ width: '1rem', height: '1rem' }}
                            title="Dislike Icon"
                            fill={value.like === false ? `rgb(${theme.bbc})` : `rgb(${theme.mca})`}
                          />
                        </button>
                        <button
                          onClick={() => {
                            userRep(
                              key,
                              value.like === true ? null : true,
                              value.like === true ? -1 : value.like === false ? 2 : 1,
                              value.userId
                            );
                          }}>
                          <ChevronIcon
                            height="1em"
                            style={{ transform: 'rotate(180deg)', width: '1rem', height: '1rem' }}
                            title="Like Icon"
                            width="1em"
                            fill={value.like ? `rgb(${theme.bbc})` : `rgb(${theme.mca})`}
                          />
                        </button>
                      </span>
                    )}
                </small>
              </span>
            </div>
            <p
              className="messageDescription"
              style={{ overflowWrap: 'break-word' }}>{`${value.message}`}</p>
          </div>
        ))}
      </div>
      <form className={`${styles.form} sendMessageInputValue`} onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={styles.fieldset} role="guild" aria-label="Update Display Name">
          <FormInput
            autoComplete="off"
            btn={loading ? '...' : 'Send'}
            btnAction="submit"
            error={errors.messageInputValue}
            label=""
            name="messageInputValue"
            placeholder="Compose message"
            ref={inputRef}
            register={register('messageInputValue')}
            maxLength={80}
            required="false"
            title="Say what you want to say..."
            type="text"
            val={messageInputValue}
          />
        </fieldset>
      </form>
    </>
  );
};

export default OfflineChat;
