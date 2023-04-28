import React, { useEffect, useRef, useState } from 'react';
import {
  child,
  get,
  increment,
  onValue,
  query,
  ref,
  serverTimestamp,
  update,
} from 'firebase/database';
import { useForm, useWatch } from 'react-hook-form';

import CrossPlatformIcon from '../../assets/CrossPlatformIcon';
import FormCheckbox from '../../components/ui/formcheckbox';
import FormInput from '../../components/ui/formInput';
import FormSelect from '../../components/ui/formselect';
import Head from 'next/head';
import Image from 'next/image';
import ManageSub from '../../components/ManageSub';
import NintendoIcon from '../../assets/NintendoIcon';
import OfflineBtn from '../../components/offlineBtn';
import OfflineChat from '../../components/offlineChat';
import OfflineUsers from '../../components/offlineUsers';
import OtherPlatformIcon from '../../assets/OtherPlatformIcon';
import PlayStationIcon from '../../assets/PlayStationIcon';
import SteamIcon from '../../assets/SteamIcon';
import UpdateButton from '../../components/UpdateButton';
import UserCaptions from '../../components/UserCaptions';
import XboxIcon from '../../assets/XboxIcon';
import { database } from '../../firebase/firebaseClient';
import defaultData from '../../utils/default.json';
import jsonData from '../../utils/templateData.json';
import { useAuth } from '../../context/AuthContext';
import useKeydown from '../../utils/useKeypress';
import { useRouter } from 'next/router';
import { useSettings } from '../../context/SettingsContext';

const Session = () => {
  const router = useRouter();
  const { id } = router.query;
  const isSolo = false;
  const calloutGrid = useRef(null);
  const { audio, theme, ahk, userIsPremium, allLanguagesArr } = useSettings();
  const { currentUser, userData, removeGamer } = useAuth();
  const [allActivities, setAllActivities] = useState([]);
  const [allGames, setAllGames] = useState({});
  const [gridSize, setGridSize] = useState(0);
  const [sessionActions, setSessionActions] = useState(defaultData.actions);
  const [sessionButtons, setSessionButtons] = useState(defaultData.buttons);
  const [loading, setLoading] = useState(false);
  const [sessionData, setSessionData] = useState({
    activity: 'Unknown Activity',
    description: 'Communication Solutions',
    game: 'Solo Session',
    isDeaf: false,
    isOpen: false,
    isPublic: false,
    lang: audio.sttDialect.split('-')[0],
    platform: 'other',
    sessionPhotoURL: 'https://static-cdn.jtvnw.net/ttv-boxart/498566-144x192.jpg',
    timestamp: Date.now(),
    usersCount: 1,
    usersMax: 1,
  });
  const [isShift, setIsShift] = useState(false);
  const [history, setHistory] = useState([]);
  const [savedTemplates, setSavedTemplates] = useState({});
  const [error, setError] = useState();
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });
  const editActivity = useWatch({ control, name: 'editActivity', defaultValue: '' });
  const editDescription = useWatch({ control, name: 'editDescription', defaultValue: '' });
  const editGame = useWatch({ control, name: 'editGame', defaultValue: '' });
  const editLang = useWatch({
    control,
    name: 'editLang',
    defaultValue: audio.sttDialect.split('-')[0],
  });
  const editNewActivity = useWatch({ control, name: 'editNewActivity', defaultValue: '' });
  const editNewGame = useWatch({ control, name: 'editNewGame', defaultValue: '' });
  const editOpen = useWatch({ control, name: 'editOpen', defaultValue: true });
  const editPhoto = useWatch({ control, name: 'editPhoto', defaultValue: '' });
  const editPlatform = useWatch({ control, name: 'editPlatform', defaultValue: 'all' });
  const editPublic = useWatch({ control, name: 'editPublic', defaultValue: true });
  const editUsersMax = useWatch({ control, name: 'editUsersMax', defaultValue: 6 });

  useKeydown(
    [
      'NumpadDivide',
      'Digit7',
      'NumpadMultiply',
      'Digit8',
      'NumpadSubtract',
      'Digit9',
      'Numpad7',
      'KeyY',
      'Numpad8',
      'KeyU',
      'Numpad9',
      'KeyI',
      'KeyO',
      'NumpadAdd',
      'KeyL',
      'Numpad4',
      'KeyH',
      'Numpad5',
      'KeyJ',
      'Numpad6',
      'KeyK',
      'Numpad1',
      'KeyN',
      'Numpad2',
      'KeyM',
      'Numpad3',
      'Comma',
      'NumpadEnter',
      'Period',
      'Numpad0',
      'Space',
      'AltRight',
      'NumpadDecimal',
    ],
    (event) => {
      if (ahk.macroMode === 'keyboard') {
        switch (event.code) {
          case 'Digit7': // 7
            triggerAction('a', isShift);
            break;
          case 'Digit8': // 8
            triggerAction('b', isShift);
            break;
          case 'Digit9': // 9
            triggerAction('c', isShift);
            break;
          case 'KeyO': // O
            triggerAction('c', isShift);
            break;
          case 'KeyY': // Y
            triggerAction('d', isShift);
            break;
          case 'KeyU': // U
            triggerAction('e', isShift);
            break;
          case 'KeyI': // I
            triggerAction('f', isShift);
            break;
          case 'KeyL': // L
            triggerAction('g', isShift);
            break;
          case 'KeyH': // H
            triggerAction('h', isShift);
            break;
          case 'KeyJ': // J
            triggerAction('i', isShift);
            break;
          case 'KeyK': // K
            triggerAction('j', isShift);
            break;
          case 'KeyN': // N
            triggerAction('k', isShift);
            break;
          case 'KeyM': // M
            triggerAction('l', isShift);
            break;
          case 'Comma': // ,<
            triggerAction('m', isShift);
            break;
          case 'Period': // .>
            triggerAction('n', isShift);
            break;
          case 'Space': // spacebar
            triggerAction('o', isShift);
            break;
          case 'AltRight': // right alt
            triggerAction('p', isShift);
            break;
          default:
            break;
        }
      } else if (ahk.macroMode === 'numberpad') {
        switch (event.code) {
          case 'NumpadDivide': // /
            triggerAction('a', isShift);
            break;
          case 'NumpadMultiply': // *
            triggerAction('b', isShift);
            break;
          case 'NumpadSubtract': // -
            triggerAction('c', isShift);
            break;
          case 'Numpad7': // 7
            triggerAction('d', isShift);
            break;
          case 'Numpad8': // 8
            triggerAction('e', isShift);
            break;
          case 'Numpad9': // 9
            triggerAction('f', isShift);
            break;
          case 'NumpadAdd': // +
            triggerAction('g', isShift);
            break;
          case 'Numpad4': // 4
            triggerAction('h', isShift);
            break;
          case 'Numpad5': // 5
            triggerAction('i', isShift);
            break;
          case 'Numpad6': // 6
            triggerAction('j', isShift);
            break;
          case 'Numpad1': // 1
            triggerAction('k', isShift);
            break;
          case 'Numpad2': // 2
            triggerAction('l', isShift);
            break;
          case 'Numpad3': // 3
            triggerAction('m', isShift);
            break;
          case 'NumpadEnter':
            triggerAction('n', isShift);
            break;
          case 'Numpad0': // 0
            triggerAction('o', isShift);
            break;
          case 'NumpadDecimal': // .
            triggerAction('p', isShift);
            break;
          default:
            break;
        }
      }
    }
  );

  const onSubmit = async () => {
    setError('');
    setLoading(true);

    if (editGame === 'newGame') {
      if (editNewGame === '') return setError('New Game is required');
      if (editNewActivity === '') return setError('New Activity is required');
      if (editPhoto === '') return setError('Game Art is required');
    }
    if (editActivity === 'newActivity') {
      if (editNewActivity === '') return setError('New Activity is required');
    }

    setError('');
    setLoading(true);

    let updates = {},
      sessionPhotoURL = [],
      tempArr = [];
    await get(
      child(ref(database), `templates/allGames/${editNewGame ? editNewGame : editGame}`)
    ).then((contents) => {
      if (contents.exists()) {
        sessionPhotoURL = contents.val();
        tempArr.push(contents.val());
      }
    });

    Promise.allSettled(tempArr).then(() => {
      if (editDescription) {
        updates[`sessionData/${currentUser.uid}/description`] = editDescription;
      }
      updates[`sessionData/${currentUser.uid}/isOpen`] = editOpen;
      updates[`sessionData/${currentUser.uid}/isPublic`] = editPublic;
      if (editLang) {
        updates[`sessionData/${currentUser.uid}/lang`] = editLang;
      }
      if (editPlatform) {
        updates[`sessionData/${currentUser.uid}/platform`] = editPlatform;
      }
      if (editUsersMax) {
        updates[`sessionData/${currentUser.uid}/usersMax`] = parseInt(editUsersMax);
      }
      if (editNewActivity) {
        updates[`sessionData/${currentUser.uid}/activity`] = editNewActivity;
        updates[
          `templates/allActivities/${editNewGame ? editNewGame : editGame}/${editNewActivity}`
        ] = true;
      } else if (editActivity) {
        updates[`sessionData/${currentUser.uid}/activity`] = editActivity;
      }
      if (editNewGame) {
        updates[`sessionData/${currentUser.uid}/game`] = editNewGame;
        updates[`templates/allGames/${editNewGame}`] = sessionPhotoURL;
      } else if (editGame) {
        updates[`sessionData/${currentUser.uid}/game`] = editGame;
      }
      if (!sessionPhotoURL && editPhoto) {
        updates[`sessionData/${currentUser.uid}/sessionPhotoURL`] = editPhoto;
      } else if (sessionPhotoURL) {
        updates[`sessionData/${currentUser.uid}/sessionPhotoURL`] = sessionPhotoURL;
      }
      updates[`sessionData/${currentUser.uid}/timestamp`] = serverTimestamp();
    });
    update(ref(database), updates).then(() => {
      setValue({
        editNewActivity: '',
        editNewGame: '',
        editOpen: '',
        editPhoto: '',
        editPlatform: '',
        editPublic: '',
        editUsersMax: '',
      });
      setLoading(false);
    });
  };

  const triggerAction = (btn, shift, auto) => {
    if (sessionButtons[btn]?.type === 'shift' && isShift === false) {
      setIsShift(true);
      let timer = setTimeout(() => {
        setIsShift(false);
      }, sessionButtons[btn]?.times * 1000);
      return () => {
        clearTimeout(timer);
      };
    } else if (sessionButtons[btn]?.type === 'shift' && isShift === true) {
      setIsShift(false);
    } else {
      let updates = {};
      if (
        sessionActions[btn]?.userId &&
        sessionActions[btn]?.userId !== '0' &&
        sessionActions[btn]?.userId !== ''
      ) {
        if (sessionActions[btn]?.userId === userData.userId) {
          if (auto) {
            if (sessionButtons[btn]?.type === 'timer' && sessionActions[btn]?.dura > 0) {
              updates[`sessionActions/${id}/${btn}/dura`] = increment(-1);
            } else {
              updates[`sessionActions/${id}/${btn}`] = null;
            }
          } else {
            updates[`sessionActions/${id}/${btn}`] = null;
          }
        }
      } else {
        updates[`sessionActions/${id}/${btn}/displayName`] = userData.displayName;
        updates[`sessionActions/${id}/${btn}/isShift`] = shift;
        updates[`sessionActions/${id}/${btn}/timestamp`] = serverTimestamp();
        updates[`sessionActions/${id}/${btn}/userId`] = userData.userId;
        if (sessionButtons[btn]?.type === 'timer') {
          updates[`sessionActions/${id}/${btn}/dura`] = shift
            ? sessionButtons[btn]?.times
            : sessionButtons[btn]?.time;
        }
      }

      update(ref(database), updates);
      setIsShift(false);
    }
  };

  const handleTemplate = (template) => {
    if (id !== userData.userId || !savedTemplates[template]) return;
    let templateObj = savedTemplates[template];
    let updates = {};
    if (!userIsPremium) {
      for (let i = 1; i < 17; i++) {
        let char = (i + 9).toString(36).toLowerCase();
        let tempType = savedTemplates[template][char].type;
        if (tempType !== 'alert' && tempType !== 'timer') {
          templateObj = {
            ...templateObj,
            [char]: {
              color: 'a',
              colors: null,
              effect: null,
              effects: null,
              image: null,
              images: null,
              temp: null,
              temps: null,
              text: `Become an MVP to use this ${tempType}`,
              texts: null,
              time: null,
              times: null,
              type: 'alert',
            },
          };
        }
      }
    }
    updates[`sessionActions/${id}`] = null;
    updates[`sessionButtons/${id}`] = templateObj;
    update(ref(database), updates);
  };

  const addHistory = (btn) => {
    let milliseconds;
    let msVal =
      sessionActions[btn]?.timestamp - Math.floor(sessionActions[btn]?.timestamp / 1000) * 1000;
    if (msVal.toString().length === 1) {
      milliseconds = `00${msVal}`;
    } else if (msVal.toString().length === 2) {
      milliseconds = `0${msVal}`;
    } else if (msVal.toString().length === 3) {
      milliseconds = `${msVal}`;
    }
    let obj = {
      [Object.keys(history).length]: {
        btn: btn,
        color:
          sessionButtons[btn]?.type === 'timer' || sessionButtons[btn]?.type === 'template'
            ? 'A'
            : sessionActions[btn]?.isShift
            ? sessionButtons[btn]?.colors.toUpperCase()
            : sessionButtons[btn]?.color.toUpperCase(),
        displayName: sessionActions[btn]?.displayName,
        image: sessionActions[btn]?.isShift
          ? sessionButtons[btn]?.images
          : sessionButtons[btn]?.image,
        text: sessionActions[btn]?.isShift ? sessionButtons[btn]?.texts : sessionButtons[btn]?.text,
        time: sessionActions[btn]?.isShift ? sessionButtons[btn]?.times : sessionButtons[btn]?.time,
        timestamp: `${Date(sessionActions[btn]?.timestamp)
          .toString()
          .split(' ')
          .slice(4, 5)
          .join(' ')}:${milliseconds}`,
        type: sessionButtons[btn]?.type,
        userId: sessionActions[btn]?.userId,
      },
    };
    let newObj = { ...history, ...obj };
    setHistory({ ...newObj });
  };

  useEffect(() => {
    const getGridSize = () => {
      setGridSize(Math.min(calloutGrid.current.clientHeight, calloutGrid.current.clientWidth));
    };

    const handleRouteChange = () => {
      removeGamer(currentUser.uid);
    };

    if (currentUser) {
      if (!currentUser.isAnonymous) {
        // let ceTemplates = localStorage.getItem('ceTemplates');
        // if (ceTemplates === null) {
        //   localStorage.setItem('ceTemplates', JSON.stringify(jsonData));
        //   setSavedTemplates(JSON.stringify(JSON.parse(jsonData)));
        // } else {
        //   setSavedTemplates(JSON.parse(ceTemplates));
        // }
        setSavedTemplates(JSON.parse(JSON.stringify(jsonData)));
      }

      getGridSize();
      window.addEventListener('resize', getGridSize);
      router.events.on('routeChangeComplete', handleRouteChange);

      let unsubscribe = onValue(query(ref(database, `sessionData/${id}`)), (snapshot) => {
        if (snapshot.exists()) {
          setSessionData(snapshot.val());
        }
      });

      let unsubscribeActions = onValue(query(ref(database, `sessionActions/${id}`)), (snapshot) => {
        if (snapshot.exists()) {
          setSessionActions(snapshot.val());
        }
      });

      let unsubscribeButtons = onValue(query(ref(database, `sessionButtons/${id}`)), (snapshot) => {
        if (snapshot.exists()) {
          setSessionButtons(snapshot.val());
        }
      });

      let unsubscribeGame = onValue(query(ref(database, `templates/allGames`)), (snapshot) => {
        if (snapshot.exists()) {
          setAllGames(snapshot.val());
        }
      });

      let unsubscribeWhitelist = onValue(
        query(ref(database, `sessionLists/${id}/whitelist/${currentUser.uid}`)),
        (snapshot) => {
          if (!snapshot.exists()) {
            router.push(`/join/session/${id}`);
          }
        }
      );

      return () => {
        unsubscribe();
        unsubscribeActions();
        unsubscribeButtons();
        unsubscribeGame();
        unsubscribeWhitelist();
        window.removeEventListener('resize', getGridSize);
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    } else {
      if (id) {
        router.push(`/join/session/${id}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, currentUser]);

  useEffect(() => {
    if (!currentUser || currentUser.isAnonymous) return;
    setValue('editActivity', '');
    setValue('editNewActivity', '');
    if (editGame === '' || editGame === 'otherVideoGame') {
      setAllActivities([]);
    } else {
      let unsubscribeActivities = onValue(
        query(ref(database, `templates/allActivities/${editGame}`)),
        (snapshot) => {
          if (snapshot.exists()) {
            let allActivitiesArr = [];
            snapshot.forEach((child) => {
              if (!allActivitiesArr.includes(child.key)) {
                allActivitiesArr = [...allActivitiesArr, child.key];
              }
            });
            setAllActivities(allActivitiesArr);
          }
        }
      );

      return () => {
        unsubscribeActivities();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editGame, currentUser]);

  return (
    <div>
      <Head>
        <title>Callouts Evolved | Session</title>
        <meta
          name="description"
          content="Free online virtual microphone or augmentative and alternative communicateion (AAC) to improve call outs in video games."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {currentUser && (
        <>
          <div className="session-wrapper">
            <span className="session-menu-wrapper">
              <div className="session-menu">
                <details>
                  <summary>
                    <div className="guildBadge">
                      <span className="guildImageWrapper">
                        <Image
                          src={sessionData.sessionPhotoURL}
                          alt={sessionData.game}
                          height={192}
                          width={144}
                        />
                      </span>
                      <span>
                        <p className="guildName" style={{ margin: '0' }}>
                          {audio.sttDialect.split('-')[0] !== sessionData.lang && (
                            <span title="Language">({sessionData.lang.toUpperCase()})&nbsp;</span>
                          )}
                          <span title="Platform">
                            {sessionData.platform === 'all' ? (
                              <CrossPlatformIcon width="1em" height="1em" />
                            ) : sessionData.platform === 'nintendo' ? (
                              <NintendoIcon width="1em" height="1em" n />
                            ) : sessionData.platform === 'playstation' ? (
                              <PlayStationIcon width="1em" height="1em" />
                            ) : sessionData.platform === 'steam' ? (
                              <SteamIcon width="1em" height="1em" />
                            ) : sessionData.platform === 'xbox' ? (
                              <XboxIcon width="1em" height="1em" />
                            ) : sessionData.platform === 'other' ? (
                              <OtherPlatformIcon width="1em" height="1em" />
                            ) : (
                              <CrossPlatformIcon width="1em" height="1em" />
                            )}
                            &nbsp;
                          </span>
                          {sessionData.game}
                        </p>
                        <small className="guildReputation">{sessionData.activity}</small>
                        <br />
                        <small className="guildUsers">
                          Users: {sessionData.usersCount}/{sessionData.usersMax}
                        </small>
                      </span>
                    </div>
                    <p className="guildDescription">{sessionData.description}</p>
                  </summary>
                  <div>
                    {!sessionData.isDeaf && (
                      <>
                        <OfflineUsers
                          triggerAction={triggerAction}
                          sessionButtons={sessionButtons}
                          addHistory={addHistory}
                          data={sessionData}
                        />
                      </>
                    )}
                    <UpdateButton
                      sessionButtons={sessionButtons}
                      setSessionButtons={setSessionButtons}
                      savedTemplates={savedTemplates}
                      isSolo={isSolo}
                    />
                    {currentUser && currentUser.uid === id && (
                      <div>
                        <h4>Edit Session</h4>
                        <form className={`sessionForm`} onSubmit={handleSubmit(onSubmit)}>
                          <fieldset role="guild" aria-label="Sign In">
                            {error !== '' && <span>{error}</span>}
                            <FormSelect
                              autoComplete="off"
                              label="Game"
                              name="editGame"
                              placeholder="Select a Game"
                              title="Select a Game"
                              required={true}
                              register={register('editGame', { required: true })}>
                              <option value="">Select Game</option>
                              {Object.keys(allGames).map((key, i) => {
                                return (
                                  <option key={i} value={key}>
                                    {key}
                                  </option>
                                );
                              })}
                              <option value="newGame">New Game</option>
                            </FormSelect>
                            {editGame === '' ? (
                              <FormSelect
                                autoComplete="off"
                                label="Activity"
                                name="editActivity"
                                placeholder="Select an Activity"
                                title="Select an Activity"
                                required={true}
                                register={register('editActivity', {
                                  required: true,
                                })}>
                                <option value="">Select Activity</option>
                                <option disabled>Select a Game First</option>
                              </FormSelect>
                            ) : editGame === 'newGame' ? (
                              <>
                                {userIsPremium ? (
                                  <>
                                    <FormInput
                                      autoComplete="off"
                                      error={errors.editNewGame}
                                      label="New Game"
                                      name="editNewGame"
                                      placeholder="What game are you playing?"
                                      required={true}
                                      register={register('editNewGame', {
                                        required: true,
                                      })}
                                      maxLength={80}
                                      title="Must be at least 3 characters in format"
                                      type="text"
                                      val={editNewGame}
                                    />
                                    <FormInput
                                      autoComplete="off"
                                      error={errors.editPhoto}
                                      label="Game Art from IGDB"
                                      name="editPhoto"
                                      placeholder="What game are you playing?"
                                      required={true}
                                      register={register('editPhoto', {
                                        required: true,
                                        pattern: /https:\/\/static-cdn\.jtvnw\.net\/.*\.jpg/i,
                                      })}
                                      title="Must begin with https://static-cdn.jtvnw.net/ and end with .jpg"
                                      type="text"
                                      val={editPhoto}
                                    />
                                    <FormInput
                                      autoComplete="off"
                                      error={errors.editNewActivity}
                                      label="New Activity"
                                      name="editNewActivity"
                                      placeholder="Any other requirements?"
                                      required={true}
                                      register={register('editNewActivity', {
                                        required: true,
                                      })}
                                      maxLength={80}
                                      title="Must be at least 3 characters in format"
                                      type="text"
                                      val={editNewActivity}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <p>Become an MVP to add your favorite games.</p>
                                    <ManageSub />
                                    <span>
                                      <FormSelect
                                        autoComplete="off"
                                        label="Activity"
                                        name="editActivity"
                                        placeholder="Select an Activity"
                                        title="Select an Activity"
                                        required={true}
                                        register={register('editActivity', {
                                          required: true,
                                        })}>
                                        <option value="">Select Activity</option>
                                      </FormSelect>
                                    </span>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                <FormSelect
                                  autoComplete="off"
                                  label="Activity"
                                  name="editActivity"
                                  placeholder="Select an Activity"
                                  title="Select an Activity"
                                  required={true}
                                  register={register('editActivity', {
                                    required: true,
                                  })}>
                                  <option value="">Select Activity</option>
                                  {allActivities.map((v, i) => (
                                    <option key={i} value={v}>
                                      {v}
                                    </option>
                                  ))}
                                  <option value="newActivity">New Activity</option>
                                </FormSelect>
                                {editActivity === 'newActivity' && (
                                  <>
                                    {userIsPremium ? (
                                      <>
                                        <FormInput
                                          autoComplete="off"
                                          error={errors.editNewActivity}
                                          label="New Activity"
                                          name="editNewActivity"
                                          placeholder="Any other requirements?"
                                          required={true}
                                          register={register('editNewActivity', {
                                            required: true,
                                          })}
                                          maxLength={80}
                                          title="Must be at least 3 characters in format"
                                          type="text"
                                          val={editNewActivity}
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <p>Become an MVP to add your favorite activities.</p>
                                        <ManageSub />
                                      </>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                            <FormInput
                              autoComplete="off"
                              error={errors.editDescription}
                              label="Description"
                              name="editDescription"
                              placeholder="Any other requirements?"
                              required={true}
                              register={register('editDescription', {
                                required: true,
                              })}
                              maxLength={userIsPremium ? 160 : 80}
                              title="Must be at least 3 characters"
                              type="text"
                              val={editDescription}
                            />
                            <FormSelect
                              autoComplete="off"
                              label={
                                <span>
                                  Platform{' '}
                                  {editPlatform === 'all' ? (
                                    <CrossPlatformIcon width="1em" height="1em" />
                                  ) : editPlatform === 'nintendo' ? (
                                    <NintendoIcon width="1em" height="1em" n />
                                  ) : editPlatform === 'playstation' ? (
                                    <PlayStationIcon width="1em" height="1em" />
                                  ) : editPlatform === 'steam' ? (
                                    <SteamIcon width="1em" height="1em" />
                                  ) : editPlatform === 'xbox' ? (
                                    <XboxIcon width="1em" height="1em" />
                                  ) : editPlatform === 'other' ? (
                                    <OtherPlatformIcon width="1em" height="1em" />
                                  ) : (
                                    <CrossPlatformIcon width="1em" height="1em" />
                                  )}
                                </span>
                              }
                              name="editPlatform"
                              placeholder="Select a Platform"
                              title="Select a Platform"
                              required={true}
                              register={register('editPlatform', {
                                required: true,
                              })}>
                              <option value="all">All Platforms</option>
                              <option value="xbox">Xbox</option>
                              <option value="playstation">Playstation</option>
                              <option value="nintendo">Nintendo</option>
                              <option value="steam">Steam</option>
                              <option value="other">Other</option>
                            </FormSelect>
                            <FormSelect
                              autoComplete="off"
                              label="Language"
                              name="editLang"
                              placeholder="Select a Language"
                              title="Select a Language"
                              required={true}
                              register={register('editLang', {
                                required: true,
                                defaultValue: audio.sttDialect.split('-')[0],
                              })}>
                              <option value="">Select a Language</option>
                              <option value={audio.sttDialect.split('-')[0]}>
                                {
                                  allLanguagesArr.filter((o) => {
                                    return o.code === audio.sttDialect.split('-')[0];
                                  })[0].lang
                                }
                              </option>
                              {allLanguagesArr.map((v, i) => (
                                <option key={i} value={v.code}>
                                  {v.lang}
                                </option>
                              ))}
                            </FormSelect>
                            <FormInput
                              autoComplete="off"
                              error={errors.editUsersMax}
                              label="Max Users"
                              name="editUsersMax"
                              placeholder="Largest guild or team size?"
                              required={true}
                              register={register('editUsersMax', {
                                required: true,
                                min: {
                                  value: 2,
                                  message: 'Please enter a number between 2 - 16',
                                },
                                max: {
                                  value: 16,
                                  message: 'Please enter a number between 2 - 16',
                                },
                                defaultValue: 6,
                              })}
                              title="Must be at least 2"
                              type="number"
                              val={editUsersMax}
                              valMin={2}
                              valMax={16}
                              valStep={1}
                            />
                            {userIsPremium ? (
                              <>
                                <FormCheckbox
                                  autoComplete="off"
                                  error={errors.editOpen}
                                  label="Anonymous Users"
                                  name="editOpen"
                                  placeholder="Enable users to join without an account."
                                  required={false}
                                  register={register('editOpen')}
                                  title="Enable users to join without an account."
                                  type="checkbox"
                                  val={editOpen}
                                  valTrue="Allowed"
                                  valFalse="Denied"
                                />
                                <FormCheckbox
                                  autoComplete="off"
                                  error={errors.editPublic}
                                  label="Auto LFG"
                                  name="editPublic"
                                  placeholder="Automatically post this session to LFG."
                                  required={false}
                                  register={register('editPublic')}
                                  title="Automatically post this session to LFG."
                                  type="checkbox"
                                  val={editPublic}
                                  valTrue="True"
                                  valFalse="False"
                                />
                              </>
                            ) : (
                              <>
                                <p>
                                  Become an MVP to lock out anonymous users or disable auto lfg and
                                  make your guild more private.
                                </p>
                                <ManageSub />
                              </>
                            )}
                            <div>
                              <button type="submit">{loading ? 'Loading...' : 'Submit'}</button>
                            </div>
                          </fieldset>
                        </form>
                      </div>
                    )}
                  </div>
                </details>
                {sessionData.isDeaf ? (
                  <>
                    <UserCaptions
                      triggerAction={triggerAction}
                      sessionButtons={sessionButtons}
                      isDeaf={sessionData.isDeaf}
                    />
                    <OfflineUsers
                      triggerAction={triggerAction}
                      sessionButtons={sessionButtons}
                      addHistory={addHistory}
                      data={sessionData}
                    />
                  </>
                ) : (
                  <UserCaptions
                    triggerAction={triggerAction}
                    sessionButtons={sessionButtons}
                    isDeaf={sessionData.isDeaf}
                  />
                )}

                {history && (
                  <>
                    History
                    {Object.values(history).map((data, i, array) => {
                      if (i < array.length - 10) return;
                      return (
                        <details key={i}>
                          <summary>
                            {defaultData.keys[data.btn][ahk.macroMode]} ({data.color}): {data.text}
                          </summary>
                          {data.displayName}
                          <br />
                          {data.timestamp}
                          <br />
                          {data.type}
                        </details>
                      );
                    })}
                  </>
                )}

                <OfflineChat isSolo={isSolo} />
              </div>
            </span>
            <span className="session-grid-wrapper">
              <div className="session-grid" ref={calloutGrid}>
                <div
                  className={`${ahk.macroMode}`}
                  style={{ height: `${gridSize}px`, width: `${gridSize}px` }}>
                  <button disabled className="session-btn-example">
                    <span
                      style={{
                        color: `rgb(${theme.mca})`,
                      }}>
                      <section
                        style={{
                          color: `rgb(${theme.mca})`,
                        }}>
                        <small>Legend: User Name</small>
                        <p>Callout Example</p>
                      </section>
                    </span>
                  </button>
                  {Object.entries(defaultData.keys).map(([key, data]) => (
                    <OfflineBtn
                      key={key}
                      addHistory={addHistory}
                      btn={key}
                      label={data[ahk.macroMode]}
                      handleTemplate={handleTemplate}
                      isShift={isShift}
                      sessionAction={sessionActions[key]}
                      sessionButton={sessionButtons[key]}
                      theme={theme}
                      triggerAction={triggerAction}
                      userData={userData}
                    />
                  ))}
                </div>
              </div>
            </span>
          </div>
          <form style={{ display: 'none' }}>
            <input disabled id="gameChatClose" value={ahk.gameChatClose} type="text" />
            <input disabled id="gameChatDelay" value={ahk.gameChatDelay} type="number" />
            <input disabled id="gameChatOpen" value={ahk.gameChatOpen} type="text" />
            <input disabled id="gameChatSend" value={ahk.gameChatSend} type="text" />
            <input disabled id="sendGameChat" value={ahk.sendGameChat} type="text" />
            <input disabled id="macroMode" value={ahk.macroMode} type="text" />
            <input disabled id="macroToggle" value={ahk.macroToggle} type="text" />
          </form>
        </>
      )}
    </div>
  );
};

export default Session;
