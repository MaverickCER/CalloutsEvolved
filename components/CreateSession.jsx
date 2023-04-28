import React, { useEffect, useState } from 'react';
import {
  child,
  get,
  onValue,
  ref,
  serverTimestamp,
  update,
} from 'firebase/database';
import { useForm, useWatch } from 'react-hook-form';

import CrossPlatformIcon from '../assets/CrossPlatformIcon';
import FormInput from './ui/formInput';
import FormSelect from './ui/formselect';
import FormCheckbox from './FormCheckbox';
import ManageSub from './ManageSub';
import NintendoIcon from '../assets/NintendoIcon';
import OtherPlatformIcon from '../assets/OtherPlatformIcon';
import PlayStationIcon from '../assets/PlayStationIcon';
import XboxIcon from '../assets/XboxIcon';
import SteamIcon from '../assets/SteamIcon';
import { database } from '../firebase/firebaseClient';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useSettings } from '../context/SettingsContext';

const CreateSession = () => {
  const router = useRouter();
  const { currentUser, userData } = useAuth();
  const { audio, userIsPremium, allLanguagesArr } = useSettings();
  const [error, setError] = useState('');
  const [allGames, setAllGames] = useState([]);
  const [allActivities, setAllActivities] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const onSubmit = async () => {
    setError('');
    setLoading(true);

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
    if (editUsersMax.toString().includes('e')) return setError('Max Users can not contain e');
    if (parseInt(editUsersMax) < 2 || parseInt(editUsersMax) > 16)
      return setError('Max Users is must be between 2 and 16');

    setError('');
    setLoading(true);

    let updates = {},
      blacklist = [],
      sessionPhotoURL = [],
      tempArr = [];
    await get(child(ref(database), `userLists/${userData.userId}/blacklist`)).then((contents) => {
      if (contents.val() === null) {
        blacklist = contents.val();
        tempArr.push(contents.val());
      }
    });
    await get(
      child(ref(database), `templates/allGames/${editNewGame ? editNewGame : editGame}`)
    ).then((contents) => {
      if (contents.exists()) {
        sessionPhotoURL = contents.val();
        tempArr.push(contents.val());
      }
    });

    Promise.allSettled(tempArr).then(() => {
      if (!sessionPhotoURL && editPhoto) {
        sessionPhotoURL = editPhoto;
      }
      for (let i = 1; i < 17; i++) {
        let char = (i + 9).toString(36).toUpperCase();
        updates[`sessionActions/${currentUser.uid}/${char}/displayName`] = '';
        updates[`sessionActions/${currentUser.uid}/${char}/isShift`] = false;
        updates[`sessionActions/${currentUser.uid}/${char}/timestamp`] = 0;
        updates[`sessionActions/${currentUser.uid}/${char}/userId`] = '';
        updates[`sessionButtons/${currentUser.uid}/${char}/color`] = 'cba';
        updates[`sessionButtons/${currentUser.uid}/${char}/image`] =
          'https://i.imgur.com/yk5wTiF.png';
        updates[`sessionButtons/${currentUser.uid}/${char}/shift`] = 'Callout A (shift)';
        updates[`sessionButtons/${currentUser.uid}/${char}/text`] = 'Callout A';
        updates[`sessionButtons/${currentUser.uid}/${char}/time`] = 2;
        updates[`sessionButtons/${currentUser.uid}/${char}/type`] = 'alert';
      }
      updates[`sessionData/${currentUser.uid}/activity`] = editNewActivity
        ? editNewActivity
        : editActivity;
      updates[`sessionData/${currentUser.uid}/description`] = editDescription;
      updates[`sessionData/${currentUser.uid}/game`] = editNewGame ? editNewGame : editGame;
      updates[`sessionData/${currentUser.uid}/isOpen`] = editOpen;
      updates[`sessionData/${currentUser.uid}/isPublic`] = editPublic;
      updates[`sessionData/${currentUser.uid}/lang`] = editLang;
      updates[`sessionData/${currentUser.uid}/platform`] = editPlatform;
      updates[`sessionData/${currentUser.uid}/sessionPhotoURL`] = sessionPhotoURL;
      updates[`sessionData/${currentUser.uid}/timestamp`] = serverTimestamp();
      updates[`sessionData/${currentUser.uid}/usersCount`] = 1;
      updates[`sessionData/${currentUser.uid}/usersMax`] = parseInt(editUsersMax);
      updates[`sessionLists/${currentUser.uid}/whitelist/${currentUser.uid}`] = 'Player 1';
      updates[`sessionMessages/${currentUser.uid}/0/color`] = 'bbc';
      updates[`sessionMessages/${currentUser.uid}/0/honor`] = 0;
      updates[`sessionMessages/${currentUser.uid}/0/message`] = `${
        editGame === 'newGame' && 'Thank you for contributing the community! '
      }Session created successfully. You can invite others directly to this session with the following url: https://www.calloutsevolved.com/session/${
        currentUser.uid
      }`;
      updates[`sessionMessages/${currentUser.uid}/0/timestamp`] = serverTimestamp();
      updates[`sessionMessages/${currentUser.uid}/0/title`] = 'System';
      updates[`sessionMessages/${currentUser.uid}/0/userId`] = 0;
      updates[`sessionMsgHonors/${currentUser.uid}/0/dishonors/system`] = true;
      updates[`sessionMsgHonors/${currentUser.uid}/0/honors/system`] = true;
      updates[`sessionSpeech/${currentUser.uid}/${currentUser.uid}/message`] = 'Muted';
      updates[`sessionSpeech/${currentUser.uid}/${currentUser.uid}/title`] = 'Owner';
      updates[`sessionSpeech/${currentUser.uid}/${currentUser.uid}/userId`] = currentUser.uid;
      updates[`userData/${currentUser.uid}/sessionId`] = currentUser.uid;
      if (editNewGame) {
        updates[`templates/allGames/${editNewGame}`] = sessionPhotoURL;
      }
      if (editNewActivity) {
        updates[
          `templates/allActivities/${editNewGame ? editNewGame : editGame}/${editNewActivity}`
        ] = true;
      }
      if (blacklist) {
        updates[`sessionLists/${currentUser.uid}/blacklist`] = blacklist;
      }
    });
    update(ref(database), updates).then(() => {
      setLoading(false);
      router.push(`/session/${currentUser.uid}`);
    });
  };

  useEffect(() => {
    if (currentUser && !currentUser.isAnonymous) {
      let unsubscribeGame = onValue(query(ref(database, `templates/allGames`)), (snapshot) => {
        if (snapshot.exists()) {
          setAllGames(snapshot.val());
        }
      });

      return () => {
        unsubscribeGame();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentUser && !currentUser.isAnonymous) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editGame]);

  return (
    <>
      {currentUser && !currentUser.isAnonymous ? (
        <form className={`sessionForm`} onSubmit={handleSubmit(onSubmit)}>
          <fieldset role="guild" aria-label="Create Session">
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
                  Become an MVP to lock out anonymous users or disable auto lfg and make your guild
                  more private.
                </p>
                <ManageSub />
              </>
            )}
            <div>
              <button type="submit">{loading ? 'Loading...' : 'Submit'}</button>
            </div>
          </fieldset>
        </form>
      ) : (
        <>Please create an account or sign in to create an account</>
      )}
    </>
  );
};

export default CreateSession;
