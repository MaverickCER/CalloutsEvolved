import React, { useEffect, useState } from 'react';
import { child, get, onValue, query, ref, update } from 'firebase/database';
import { useForm, useWatch } from 'react-hook-form';

import CrossPlatformIcon from '../assets/CrossPlatformIcon';
import FormCheckbox from './ui/formcheckbox';
import FormInput from './ui/formInput';
import FormSelect from './ui/formSelect';
import NintendoIcon from '../assets/NintendoIcon';
import OtherPlatformIcon from '../assets/OtherPlatformIcon';
import PlayStationIcon from '../assets/PlayStationIcon';
import SteamIcon from '../assets/SteamIcon';
import XboxIcon from '../assets/XboxIcon';
import { database } from '../firebase/firebaseClient';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useSettings } from '../context/SettingsContext';

const GuildBadge = ({ guildId }) => {
  const router = useRouter();
  const path = router.pathname.split('/')[1];
  const id = router.pathname.split('/')[2];
  const { theme, audio } = useSettings();
  const { userData } = useAuth();
  const [activity, setActivity] = useState('Unknown');
  const [allActivities, setAllActivities] = useState([]);
  const [allGames, setAllGames] = useState({});
  const [description, setDescription] = useState('Communication Solutions');
  const [displayName, setDisplayName] = useState('Unknown');
  const [game, setGame] = useState('Unknown');
  const [isBlacklisted, setIsBlacklisted] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [lang, setLang] = useState('EN');
  const [like, setLike] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    'https://static-cdn.jtvnw.net/ttv-boxart/498566-144x192.jpg'
  );
  const [platform, setPlatform] = useState('All');
  const [reputation, setReputation] = useState(0);
  const [title, setTitle] = useState('Anonymous');
  const [users, setUsers] = useState(1);
  const [usersCount, setUsersCount] = useState(1);
  const [usersMax, setUsersMax] = useState(1);
  const [guildLocation, setGuildLocation] = useState(null);
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });
  const editActivity = useWatch({ control, name: 'editActivity', defaultValue: activity });
  const editAlias = useWatch({ control, name: 'editAlias', defaultValue: displayName });
  const editDescription = useWatch({ control, name: 'editDescription', defaultValue: description });
  const editGame = useWatch({ control, name: 'editGame', defaultValue: game });
  const editLang = useWatch({ control, name: 'editLang', defaultValue: lang });
  const editNewActivity = useWatch({ control, name: 'editNewActivity', defaultValue: '' });
  const editNewGame = useWatch({ control, name: 'editNewGame', defaultValue: '' });
  const editOpen = useWatch({ control, name: 'editOpen', defaultValue: isOpen });
  const editPhoto = useWatch({ control, name: 'editPhoto', defaultValue: '' });
  const editPlatform = useWatch({ control, name: 'editPlatform', defaultValue: platform });
  const editPublic = useWatch({ control, name: 'editPublic', defaultValue: isPublic });
  const editUsersMax = useWatch({ control, name: 'editUsersMax', defaultValue: usersMax });

  const onSubmit = async () => {
    setError('');
    setLoading(true);

    let updates = {};
    if (path === 'guild') {
      if (isPublic) {
        if (editAlias && editAlias !== '' && editAlias !== displayName) {
          updates[`guildData${guildLocation}/${guildId}/displayName`] = editAlias;
        }
        if (editDescription && editDescription !== '' && editDescription !== description) {
          updates[`guildData${guildLocation}/${guildId}/description`] = editDescription;
        }
        if (editPhoto && editPhoto !== '' && editPhoto !== photoURL) {
          updates[`guildData${guildLocation}/${guildId}/guildPhotoURL`] = editPhoto;
        }
        if (editOpen && editOpen !== '' && editOpen !== isOpen) {
          updates[`guildData${guildLocation}/${guildId}/isOpen`] = editOpen;
        }
        if (editPublic && editPublic !== '' && editPublic !== isPublic) {
          updates[`guildData${guildLocation}/${guildId}/isPublic`] = editPublic;
        }
        if (editLang && editLang !== '' && editLang !== lang) {
          updates[`guildData${guildLocation}/${guildId}/lang`] = editLang;
        }
      }
    } else if (path === 'session') {
      let newPhotoURL = [];
      await get(
        child(ref(database), `templates/allGames/${editNewGame ? editNewGame : editGame}`)
      ).then((contents) => {
        if (contents.exists()) {
          newPhotoURL = contents.val();
        }
      });

      Promise.allSettled(blacklist, newPhotoURL).then(() => {
        if (editPhoto && editPhoto !== '') {
          newPhotoURL = editPhoto;
        }
        if (
          (editNewActivity && editNewActivity !== '' && editNewActivity !== activity) ||
          (editActivity && editActivity !== '' && editActivity !== activity)
        ) {
          updates[`sessionData/${guildId}/activity`] = editNewActivity
            ? editNewActivity
            : editActivity;
        }
        if (editNewActivity && editNewActivity !== '' && editNewActivity !== activity) {
          updates[
            `templates/allActivities/${editNewGame ? editNewGame : editGame}/${editNewActivity}`
          ] = true;
        }
        if (editDescription && editDescription !== '' && editDescription !== description) {
          updates[`sessionData/${guildId}/description`] = editDescription;
        }
        if (
          (editNewGame && editNewGame !== '' && editNewGame !== game) ||
          (editGame && editGame !== '' && editGame !== game)
        ) {
          updates[`sessionData/${guildId}/game`] = editNewGame ? editNewGame : editGame;
        }
        if (editNewGame && editNewGame !== '' && editNewGame !== game) {
          updates[`templates/allGames/${editNewGame}`] = newPhotoURL;
        }
        if (editOpen && editOpen !== '' && editOpen !== isOpen) {
          updates[`sessionData/${guildId}/isOpen`] = editOpen;
        }
        if (editPublic && editPublic !== '' && editPublic !== isPublic) {
          updates[`sessionData/${guildId}/isPublic`] = editPublic;
        }
        if (editLang && editLang !== '' && editLang !== lang) {
          updates[`sessionData/${guildId}/lang`] = editLang;
        }
        if (editPlatform && editPlatform !== '' && editPlatform !== platform) {
          updates[`sessionData/${guildId}/platform`] = editPlatform;
        }
        if (newPhotoURL && newPhotoURL !== '' && newPhotoURL !== photoURL) {
          updates[`sessionData/${guildId}/sessionPhotoUrl`] = newPhotoURL;
        }
        if (editUsersMax && editUsersMax !== '' && editUsersMax !== photoURL) {
          updates[`sessionData/${guildId}/usersMax`] = parseInt(editUsersMax);
        }
        if (updates !== {}) {
          updates[`sessionData/${guildId}/timestamp`] = serverTimestamp();
        }
      });
    } else if (path === 'sessions') {
      if (editGame === 'newGame') {
        if (editNewGame === '') return setError('New Game is required');
        if (editNewActivity === '') return setError('New Activity is required');
        if (editPhoto === '') return setError('Game Art is required');
      } else if (editGame === '') return setError('Game is required');
      if (editGame !== 'newGame') {
        if (editActivity === '') return setError('Activity is required');
      }
      if (editActivity === 'newActivity') {
        if (editNewActivity === '') return setError('New Activity is required');
      }
      if (editDescription === '') return setError('Description is required');
      if (editLang === '') return setError('Language is required');
      if (editUsers.toString().includes('e')) return setError('Max Users can not contain e');
      if (parseInt(editUsers) < 2 || parseInt(editUsers) > 16)
        return setError('Max Users is must be between 2 and 16');

      setError('');
      setLoading(true);

      const updates = {};
      let blacklist = [],
        sessionPhotoURL = [];
      await get(child(ref(database), `userLists/${userData.userId}/blacklist`)).then((contents) => {
        if (contents.val() === null) {
          blacklist = contents.val();
        }
      });
      await get(
        child(ref(database), `templates/allGames/${editNewGame ? editNewGame : editGame}`)
      ).then((contents) => {
        if (contents.exists()) {
          sessionPhotoURL = contents.val();
        }
      });

      Promise.allSettled(blacklist, sessionPhotoURL).then(() => {
        if (!sessionPhotoURL && editPhoto) {
          sessionPhotoURL = editPhoto;
        }
        for (let i = 1; i < 17; i++) {
          let char = (i + 9).toString(36).toUpperCase();
          updates[`sessionActions/${userData.userId}/${char}/displayName`] = '';
          updates[`sessionActions/${userData.userId}/${char}/isShift`] = false;
          updates[`sessionActions/${userData.userId}/${char}/timestamp`] = 0;
          updates[`sessionActions/${userData.userId}/${char}/userId`] = '';
          updates[`sessionButtons/${userData.userId}/${char}/color`] = 'cba';
          updates[`sessionButtons/${userData.userId}/${char}/image`] =
            'https://i.imgur.com/yk5wTiF.png';
          updates[`sessionButtons/${userData.userId}/${char}/shift`] = 'Callout A (shift)';
          updates[`sessionButtons/${userData.userId}/${char}/text`] = 'Callout A';
          updates[`sessionButtons/${userData.userId}/${char}/time`] = 2;
          updates[`sessionButtons/${userData.userId}/${char}/type`] = 'alert';
        }
        updates[`sessionData/${userData.userId}/activity`] = editNewActivity
          ? editNewActivity
          : editActivity;
        updates[`sessionData/${userData.userId}/description`] = editDescription;
        updates[`sessionData/${userData.userId}/game`] = editNewGame ? editNewGame : editGame;
        updates[`sessionData/${userData.userId}/isOpen`] = editOpen;
        updates[`sessionData/${userData.userId}/isPublic`] = editPublic;
        updates[`sessionData/${userData.userId}/lang`] = editLang;
        updates[`sessionData/${userData.userId}/platform`] = editPlatform;
        updates[`sessionData/${userData.userId}/sessionPhotoURL`] = sessionPhotoURL;
        updates[`sessionData/${userData.userId}/timestamp`] = serverTimestamp();
        updates[`sessionData/${userData.userId}/usersCount`] = 1;
        updates[`sessionData/${userData.userId}/usersMax`] = parseInt(editUsers);
        updates[`sessionLists/${userData.userId}/whitelist/${userData.userId}`] = true;
        updates[`sessionMessages/${userData.userId}/0/color`] = 'bbc';
        updates[`sessionMessages/${userData.userId}/0/honor`] = 0;
        updates[`sessionMessages/${userData.userId}/0/message`] = `${
          editGame === 'newGame' && 'Thank you for contributing the community! '
        }Session editd successfully. You can invite others directly to this session with the following url: https://www.calloutsevolved.com/session/${
          userData.userId
        }`;
        updates[`sessionMessages/${userData.userId}/0/timestamp`] = serverTimestamp();
        updates[`sessionMessages/${userData.userId}/0/title`] = 'System';
        updates[`sessionMessages/${userData.userId}/0/userId`] = 0;
        updates[`sessionMsgHonors/${userData.userId}/0/dishonors/system`] = true;
        updates[`sessionMsgHonors/${userData.userId}/0/honors/system`] = true;
        updates[`sessionSpeech/${userData.userId}/${userData.userId}/message`] = 'Muted';
        updates[`sessionSpeech/${userData.userId}/${userData.userId}/title`] = 'Owner';
        updates[`sessionSpeech/${userData.userId}/${userData.userId}/userId`] = userData.userId;
        updates[`userData/${userData.userId}/sessionId`] = userData.userId;
        if (editNewGame) {
          updates[`templates/allGames/${editNewGame}`] = sessionPhotoURL;
        }
        if (editNewActivity) {
          updates[
            `templates/allActivities/${editNewGame ? editNewGame : editGame}/${editNewActivity}`
          ] = true;
        }
        if (blacklist) {
          updates[`sessionLists/${userData.userId}/blacklist`] = blacklist;
        }
      });
    }
    update(ref(database), updates).then(() => {
      setLoading(false);
      if (path === 'sessions') {
        router.push(`/session/${userData.userId}`);
      }
    });
  };

  const isOwner =
    path === 'session'
      ? userData.userId === guildId
      : path === 'guild'
      ? title === 'titleMaster'
      : false;
  const isModerator =
    path === 'session'
      ? userData.userId === guildId
      : path === 'guild'
      ? title === 'titleModerator'
      : false;

  useEffect(() => {
    if (path === 'guild' || path === 'guilds') {
      if (isBlacklisted === true) {
        get(ref(`guildDataLocation/${guildId}`)).then((snapshot) => {
          if (snapshot.exists()) {
            setGuildLocation(snapshot.val());
            if (userData.userId === '0') {
              get(child(ref(database), `guildData${snapshot.val()}/${guildId}/isOpen`)).then(
                (DataSnapshot) => {
                  if (DataSnapshot.exists()) {
                    if (DataSnapshot.val() === true && isBlacklisted !== false) {
                      setIsBlacklisted(false);
                    } else if (
                      isBlacklisted !==
                      'This guild is private. Please login to view more information.'
                    ) {
                      setIsBlacklisted(
                        'This guild is private. Please login to view more information.'
                      );
                    }
                  } else {
                    if (isBlacklisted !== 'This guild does not exist.') {
                      setIsBlacklisted('This guild does not exist.');
                    }
                  }
                }
              );
            } else {
              get(child(ref(database), `guildLists/${guildId}/blacklist/${userData.userId}`)).then(
                (DataSnapshot) => {
                  if (DataSnapshot.exists()) {
                    setIsBlacklisted(DataSnapshot.val());
                  } else {
                    setIsBlacklisted(false);
                  }
                }
              );
            }
          }
        });
      } else if (isBlacklisted === false) {
        if (userData.userId !== '0') {
          get(child(ref(database), `guildReputation/${guildId}/${userData.userId}`)).then(
            (DataSnapshot) => {
              if (DataSnapshot.exists()) {
                setLike(DataSnapshot.val());
              }
            }
          );
          get(child(ref(database), `guildLists/${guildId}/witelist/${userData.userId}`)).then(
            (DataSnapshot) => {
              if (DataSnapshot.exists()) {
                setTitle(DataSnapshot.val());
              }
            }
          );
        }
        get(child(ref(database), `guildData${guildLocation}/${guildId}`)).then((DataSnapshot) => {
          if (DataSnapshot.exists()) {
            setDescription(DataSnapshot.val().description);
            setDisplayName(DataSnapshot.val().displayName);
            setPhotoURL(DataSnapshot.val().guildPhotoURL);
            setIsOpen(DataSnapshot.val().isOpen);
            setIsPublic(DataSnapshot.val().isPublic);
            setLang(DataSnapshot.val().lang);
            setReputation(DataSnapshot.val().reputation);
            setUsers(DataSnapshot.val().users);
          }
        });
      }
    } else if (path === 'session' || path === 'lfg') {
      if (isBlacklisted === true && userData.userId !== '0') {
        get(child(ref(database), `sessionLists/${guildId}/blacklist/${userData.userId}`)).then(
          (DataSnapshot) => {
            if (DataSnapshot.exists()) {
              setIsBlacklisted(DataSnapshot.val());
            } else {
              setIsBlacklisted(false);
            }
          }
        );
      } else if (isBlacklisted === false) {
        get(child(ref(database), `guildData${guildLocation}/${guildId}`)).then((DataSnapshot) => {
          if (DataSnapshot.exists()) {
            setActivity(DataSnapshot.val().activity);
            setDescription(DataSnapshot.val().description);
            setGame(DataSnapshot.val().game);
            setIsOpen(DataSnapshot.val().isOpen);
            setIsPublic(DataSnapshot.val().isPublic);
            setLang(DataSnapshot.val().lang);
            setPlatform(DataSnapshot.val().platform);
            setPhotoURL(DataSnapshot.val().guildPhotoURL);
            setUsersCount(DataSnapshot.val().usersCount);
            setUsersMax(DataSnapshot.val().usersMax);
          }
        });
      }
    }
  }, [isBlacklisted, path]);

  useEffect(() => {
    if (path === 'sessions') {
      let unsubscribeGame = onValue(query(ref(database, `templates/allGames`)), (snapshot) => {
        if (snapshot.exists()) {
          setAllGames(snapshot.val());
        }
      });

      return () => {
        unsubscribeGame();
      };
    }
  }, []);

  useEffect(() => {
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
  }, [editGame]);

  return (
    <>
      <details>
        <summary className="guildLink">
          <div className="guildBadge">
            <span className="guildImageWrapper">
              <img src={photoURL} alt={description} height={192} width={144} />
            </span>
            <span>
              {isBlacklisted !== false ? (
                <>
                  {path === 'guild' || path === 'guilds' ? (
                    <>
                      <p className="guildName">(X) Blacklisted</p>
                      <small className="guildReputation">Reputation: 0</small>
                      <small className="guildUsers">Users: 0</small>
                    </>
                  ) : (
                    <>
                      <p className="guildName">
                        <OtherPlatformIcon width="1em" height="1em" />
                        {path === 'sessions' ? ' Solo Session' : ' Blacklisted'}
                      </p>
                      <small className="guildReputation">Unknown Activity</small>
                      <small className="guildUsers">Users: 1/1</small>
                    </>
                  )}
                </>
              ) : (
                <>
                  {path === 'guild' || path === 'guilds' ? (
                    <>
                      <p className="guildName">
                        {audio.sttDialect.split('-')[0] !== lang && (
                          <span title="Language">({lang.toUpperCase()})&nbsp;</span>
                        )}
                        {displayName}
                      </p>
                      <small className="guildReputation">Reputation: {reputation}</small>
                      <small className="guildUsers">Users: {users}</small>
                    </>
                  ) : (
                    <>
                      <p className="guildName">
                        {audio.sttDialect.split('-')[0] !== lang && (
                          <span title="Language">({lang.toUpperCase()})&nbsp;</span>
                        )}
                        {platform === 'all' ? (
                          <CrossPlatformIcon width="1em" height="1em" />
                        ) : platform === 'nintendo' ? (
                          <NintendoIcon width="1em" height="1em" n />
                        ) : platform === 'playstation' ? (
                          <PlayStationIcon width="1em" height="1em" />
                        ) : platform === 'steam' ? (
                          <SteamIcon width="1em" height="1em" />
                        ) : platform === 'xbox' ? (
                          <XboxIcon width="1em" height="1em" />
                        ) : platform === 'other' ? (
                          <OtherPlatformIcon width="1em" height="1em" />
                        ) : (
                          <CrossPlatformIcon width="1em" height="1em" />
                        )}
                        &nbsp;
                        {game}
                      </p>
                      <small className="guildReputation">{activity}</small>
                      <small className="guildUsers">
                        Users: {usersCount}/{usersMax}
                      </small>
                    </>
                  )}
                </>
              )}
            </span>
          </div>
          <p>{description}</p>
        </summary>
        <div>
          {isBlacklisted ? (
            <>
              {isBlacklisted === true ? (
                path === 'sessions' ? (
                  <>
                    <div>
                      <p>
                        Callouts Evolved provides an Augmentatitive and Alternative Communication
                        inferface for gamers. This page is set up so that no one else can join, if
                        you would like an interactive page, please check out the LFG page.
                      </p>
                      <p>
                        This is the ideal page if you're looking to see what Callouts Evolved has to
                        offer, test premium features, or import/export audio features. Mute gamers
                        often find it easier to use synthesized callouts to get into and stay in mic
                        required commuinities. They export the audio either by putting their mic
                        next to a speker or by connecting a{' '}
                        <a
                          href="https://www.amazon.com/dp/B01GW69IQ2"
                          target="_blank"
                          rel="noopenner">
                          mic attenuator
                        </a>{' '}
                        from a speaker output to the mic input on a{' '}
                        <a
                          href="https://www.amazon.com/dp/B07114YZFC"
                          target="_blank"
                          rel="noopenner">
                          headset splitter
                        </a>{' '}
                        and connecting it to their controller. Deaf gamers reverse this
                        configuration to get speech recognition, and speech commands to keep up with
                        call outs in real time.
                      </p>
                    </div>
                    {userData.userId !== '0' && (
                      <div>
                        <h4>{path === 'sessions' ? 'Create ' : 'Edit '}Session</h4>
                        <form
                          className={`${styles.form} sessionForm`}
                          onSubmit={handleSubmit(onSubmit)}>
                          <fieldset className={styles.fieldset} role="guild" aria-label="Sign In">
                            {error !== '' && <span className={styles.formTextError}>{error}</span>}
                            <FormSelect
                              autoComplete="off"
                              label="Game"
                              name="editGame"
                              placeholder="Select a Game"
                              title="Select a Game"
                              required={path === 'sessions'}
                              register={register('editGame', { required: path === 'sessions' })}>
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
                                required={path === 'sessions'}
                                register={register('editActivity', {
                                  required: path === 'sessions',
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
                                      required={path === 'sessions'}
                                      register={register('editNewGame', {
                                        required: path === 'sessions',
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
                                      required={path === 'sessions'}
                                      register={register('editPhoto', {
                                        required: path === 'sessions',
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
                                      required={path === 'sessions'}
                                      register={register('editNewActivity', {
                                        required: path === 'sessions',
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
                                        required={path === 'sessions'}
                                        register={register('editActivity', {
                                          required: path === 'sessions',
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
                                  required={path === 'sessions'}
                                  register={register('editActivity', {
                                    required: path === 'sessions',
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
                                          required={path === 'sessions'}
                                          register={register('editNewActivity', {
                                            required: path === 'sessions',
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
                              required={path === 'sessions'}
                              register={register('editDescription', {
                                required: path === 'sessions',
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
                              required={path === 'sessions'}
                              register={register('editPlatform', {
                                required: path === 'sessions',
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
                              required={path === 'sessions'}
                              register={register('editLang', { required: path === 'sessions' })}>
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
                              required={path === 'sessions'}
                              register={register('editUsersMax', {
                                required: path === 'sessions',
                                min: {
                                  value: 2,
                                  message: 'Please enter a number between 2 - 16',
                                },
                                max: {
                                  value: 16,
                                  message: 'Please enter a number between 2 - 16',
                                },
                              })}
                              title="Must be at least 2"
                              type="number"
                              val={editUsersMax}
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
                            <div className={styles.formSubmitWrapper}>
                              <button type="submit" className={styles.formSubmit}>
                                {loading ? 'Loading...' : 'Submit'}
                              </button>
                            </div>
                          </fieldset>
                        </form>
                      </div>
                    )}
                  </>
                ) : (
                  'No reason provided'
                )
              ) : (
                `Reason: ${isBlacklisted}`
              )}
            </>
          ) : (
            <>
              {path === 'guild' && (isOwner || isModerator) ? (
                <>
                  <div>
                    <h4>Edit Guild Settings</h4>
                    <form className={`${styles.form} signInForm`} onSubmit={handleSubmit(onSubmit)}>
                      <fieldset className={styles.fieldset} role="guild" aria-label="Sign In">
                        {error !== '' && <span className={styles.formTextError}>{error}</span>}
                        <FormInput
                          autoComplete="off"
                          error={errors.editAlias}
                          label="Guild Name"
                          name="editAlias"
                          placeholder="What guild are you creating?"
                          required="true"
                          register={register('editAlias', {
                            required: true,
                          })}
                          maxLength={userIsPremium ? 80 : 25}
                          title="Must be at least 3 characters"
                          type="text"
                          val={editAlias}
                        />
                        <FormInput
                          autoComplete="off"
                          error={errors.editDescription}
                          label="Description"
                          name="editDescription"
                          placeholder="Any other requirements?"
                          required="true"
                          register={register('editDescription', {
                            required: true,
                          })}
                          maxLength={userIsPremium ? 160 : 80}
                          title="Must be at least 3 characters"
                          type="text"
                          val={editDescription}
                        />
                        <FormInput
                          autoComplete="off"
                          error={errors.editPhoto}
                          label="Guild Image"
                          name="editPhoto"
                          placeholder="What game are you playing?"
                          required="true"
                          register={register('editPhoto', {
                            required: true,
                            pattern: /(?:jpg|png)/i,
                          })}
                          title="Must begin with https:// and end with .jpg or png"
                          type="text"
                          val={editPhoto}
                        />
                        <FormSelect
                          autoComplete="off"
                          label="Guild Language"
                          name="editLang"
                          placeholder="Select a Language"
                          title="Select a Language"
                          required={true}
                          register={register('editLang', { required: true })}>
                          <option>Select a Language</option>
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
                        {userIsPremium ? (
                          <>
                            <FormCheckbox
                              autoComplete="off"
                              error={errors.editOpen}
                              label="Anonymous Viewers"
                              name="editOpen"
                              placeholder="Enable non-members to see guild messages."
                              required="true"
                              register={register('editOpen')}
                              title="Enable non-members to see guild messages."
                              type="checkbox"
                              val={editOpen}
                              valTrue="True"
                              valFalse="False"
                            />
                            <FormCheckbox
                              autoComplete="off"
                              error={errors.editPublic}
                              label="Auto Recruit"
                              name="editPublic"
                              placeholder="Automatically post this guild to Guilds."
                              required="true"
                              register={register('editPublic')}
                              title="Automatically post this guild to Guilds."
                              type="checkbox"
                              val={editPublic}
                              valTrue="True"
                              valFalse="False"
                            />
                          </>
                        ) : (
                          <>
                            <p>
                              Become an MVP to disable auto recruit and make your guild more
                              private.
                            </p>
                            <ManageSub />
                          </>
                        )}
                        <div className={styles.formSubmitWrapper}>
                          <button type="submit" className={styles.formSubmit}>
                            {loading ? 'Loading...' : 'Submit'}
                          </button>
                        </div>
                      </fieldset>
                    </form>
                  </div>
                </>
              ) : (
                path === 'session' &&
                isOwner && (
                  <>
                    <div>
                      <h4>{path === 'sessions' ? 'Create ' : 'Edit '}Session</h4>
                      <form
                        className={`${styles.form} sessionForm`}
                        onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className={styles.fieldset} role="guild" aria-label="Sign In">
                          {error !== '' && <span className={styles.formTextError}>{error}</span>}
                          <FormSelect
                            autoComplete="off"
                            label="Game"
                            name="editGame"
                            placeholder="Select a Game"
                            title="Select a Game"
                            required={path === 'sessions'}
                            register={register('editGame', { required: path === 'sessions' })}>
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
                              required={path === 'sessions'}
                              register={register('editActivity', {
                                required: path === 'sessions',
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
                                    required={path === 'sessions'}
                                    register={register('editNewGame', {
                                      required: path === 'sessions',
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
                                    required={path === 'sessions'}
                                    register={register('editPhoto', {
                                      required: path === 'sessions',
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
                                    required={path === 'sessions'}
                                    register={register('editNewActivity', {
                                      required: path === 'sessions',
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
                                      required={path === 'sessions'}
                                      register={register('editActivity', {
                                        required: path === 'sessions',
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
                                required={path === 'sessions'}
                                register={register('editActivity', {
                                  required: path === 'sessions',
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
                                        required={path === 'sessions'}
                                        register={register('editNewActivity', {
                                          required: path === 'sessions',
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
                            required={path === 'sessions'}
                            register={register('editDescription', {
                              required: path === 'sessions',
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
                            required={path === 'sessions'}
                            register={register('editPlatform', { required: path === 'sessions' })}>
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
                            required={path === 'sessions'}
                            register={register('editLang', { required: path === 'sessions' })}>
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
                            required={path === 'sessions'}
                            register={register('editUsersMax', {
                              required: path === 'sessions',
                              min: {
                                value: 2,
                                message: 'Please enter a number between 2 - 16',
                              },
                              max: {
                                value: 16,
                                message: 'Please enter a number between 2 - 16',
                              },
                            })}
                            title="Must be at least 2"
                            type="number"
                            val={editUsersMax}
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
                          <div className={styles.formSubmitWrapper}>
                            <button type="submit" className={styles.formSubmit}>
                              {loading ? 'Loading...' : 'Submit'}
                            </button>
                          </div>
                        </fieldset>
                      </form>
                    </div>
                  </>
                )
              )}
            </>
          )}
        </div>
      </details>
    </>
  );
};

export default GuildBadge;
