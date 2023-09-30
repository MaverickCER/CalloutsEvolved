import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  linkWithCredential,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { auth, database, messaging } from '../firebase/firebaseClient';
import {
  child,
  get,
  increment,
  onDisconnect,
  onValue,
  ref,
  serverTimestamp,
  update,
} from 'firebase/database';

import { useRouter } from 'next/router';

// import { getToken } from 'firebase/messaging';


const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    color: 'a',
    displayName: 'Anonymous',
    honor: 0,
    infamy: 0,
    isOpen: false,
    isSessionIdPublic: false,
    isStatusPublic: false,
    sessionId: '',
    status: 'online',
    timestamp: Date.now(),
    title: 'Anonymous',
    userId: '0',
    userPhotoURL: 'https://i.imgur.com/6X537cL.png',
  });
  const userIsPremium = Date.parse(userData?.subscriptionData?.next_billing_time || 0) > Date.now();
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  const anonymousLogin = async (id) => {
    const names = [
      'Barbarian',
      'Bard',
      'Cleric',
      'Druid',
      'Fighter',
      'Monk',
      'Paladin',
      'Ranger',
      'Rogue',
      'Sorcerer',
      'Warlock',
      'Wizard',
      'Artificer',
      'Hunter',
      'Titan',
      'Fighter',
      'Warrior',
      'Soldier',
      'Assassin',
      'Ninja',
      'Mage',
      'Archer',
      'Ranger',
      'Berserker',
      'Priest',
      'Enchanter',
      'Necromancer',
      'Shadowknight',
      'Summoner',
      'Dancer',
      'Dragoon',
      'Lancer',
      'Dragon',
      'Sniper',
      'Rifleman',
      'Gunner',
      'Scout',
      'Poltergeist',
      'Clown',
      'Trickster',
      'Defender',
      'Medic',
      'Mechanic',
      'Recon',
      'Assault',
      'Support',
      'Engineer',
      'Invader',
      'Collector',
      'Reaper',
      'Sentry',
      'Runner',
      'Centurion',
      'Colossus',
      'Legionary',
      'Psion',
      'Phalanx',
      'Knight',
      'Ogre',
      'Thrall',
      'Acolyte',
      'Goblin',
      'Harpy',
      'Hobgoblin',
      'Hydra',
      'Minotaur',
      'Mongrel',
      'Screeb',
      'Raider',
      'Lurker',
      'Ravager',
      'Chieftain',
      'Dreg',
      'Shank',
      'Vandal',
      'Captain',
      'Servitor',
      'Walker',
      'Pike',
      'Shrieker',
      'Seeder',
      'Interceptor',
      'Tank',
      'Nightmare',
    ];
    const user = await signInAnonymously(auth);
    const name = `Anonymous ${names[Math.floor(Math.random() * names.length)]}`;

    if (user) {
      let updates = {};
      updates[`userData/${user.user.uid}/color`] = 'cba';
      updates[`userData/${user.user.uid}/displayName`] = name;
      updates[`userData/${user.user.uid}/honor`] = 0;
      updates[`userData/${user.user.uid}/infamy`] = 0;
      updates[`userData/${user.user.uid}/isSessionIdPublic`] = true;
      updates[`userData/${user.user.uid}/sessionId`] = id;
      updates[`userData/${user.user.uid}/title`] = 'Unknown';
      updates[`userData/${user.user.uid}/userId`] = user.user.uid;
      updates[`userData/${user.user.uid}/userPhotoURL`] =
        'https://ratchet-galaxy.com/image/fanarts/4/8/408-slim-cognito.jpg';
      updates[`userStatus/${user.user.uid}/isStatusPublic`] = false;
      updates[`userStatus/${user.user.uid}/status`] = 'online';
      updates[`userStatus/${user.user.uid}/timestamp`] = Date.now();

      update(ref(database), updates);
      setUserData({
        color: 'a',
        displayName: 'Anonymous',
        honor: 0,
        infamy: 0,
        isOpen: false,
        isSessionIdPublic: false,
        isStatusPublic: false,
        sessionId: 'sessions',
        status: 'online',
        timestamp: Date.now(),
        title: 'Anonymous',
        userId: '0',
        userPhotoURL: 'https://i.imgur.com/6X537cL.png',
      });
    }
  };

  const logout = () => {
    if (currentUser && currentUser.isAnonymous) {
      deletePlayer();
    } else {
      signOut(auth)
        .then(() => {
          router.push('/');
        })
        .catch((err) => {
          console.error('LOGOUT ERROR:', err);
        });
    }

    setUserData({
      color: 'a',
      displayName: 'Anonymous',
      honor: 0,
      infamy: 0,
      isOpen: false,
      isSessionIdPublic: false,
      isStatusPublic: false,
      sessionId: 'sessions',
      status: 'online',
      timestamp: Date.now(),
      title: 'Anonymous',
      userId: '0',
      userPhotoURL: 'https://i.imgur.com/6X537cL.png',
    });
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email, password, username) => {
    if (currentUser && currentUser.isAnonymous) {
      try {
        const credential = EmailAuthProvider.credential(email, password);
        const user = await linkWithCredential(auth.currentUser, credential);

        if (user) {
          let updates = {};
          updates[`userData/${user.user.uid}/color`] = 'a';
          updates[`userData/${user.user.uid}/displayName`] = username;
          updates[`userData/${user.user.uid}/honor`] = 0;
          updates[`userData/${user.user.uid}/infamy`] = 0;
          updates[`userData/${user.user.uid}/isSessionIdPublic`] = true;
          updates[`userData/${user.user.uid}/isStatusPublic`] = true;
          updates[`userData/${user.user.uid}/sessionId`] = '';
          updates[`userData/${user.user.uid}/status`] = 'Online';
          updates[`userData/${user.user.uid}/timestamp`] = serverTimestamp();
          updates[`userData/${user.user.uid}/title`] = 'Gamer';
          updates[`userData/${user.user.uid}/userId`] = user.user.uid;
          updates[`userData/${user.user.uid}/userPhotoURL`] = 'https://i.imgur.com/yk5wTiF.png';

          update(ref(database), updates);

          setUserData({
            bio: '',
            color: 'a',
            displayName: username,
            honor: 0,
            infamy: 0,
            isSessionIdPublic: true,
            isStatusPublic: true,
            sessionId: '',
            status: 'Online',
            timestamp: Date.now(),
            title: 'Gamer',
            userId: user.user.uid,
            userPhotoURL: 'https://i.imgur.com/yk5wTiF.png',
          });
          return user;
        }
      } catch (error) {
        console.error('AuthContext signup 1 ', error.message);
        return error;
      }
    } else {
      try {
        const user = await createUserWithEmailAndPassword(auth, email, password);

        if (user) {
          let updates = {};
          updates[`userData/${user.user.uid}/color`] = 'a';
          updates[`userData/${user.user.uid}/displayName`] = username;
          updates[`userData/${user.user.uid}/honor`] = 0;
          updates[`userData/${user.user.uid}/infamy`] = 0;
          updates[`userData/${user.user.uid}/isSessionIdPublic`] = true;
          updates[`userData/${user.user.uid}/isStatusPublic`] = true;
          updates[`userData/${user.user.uid}/sessionId`] = '';
          updates[`userData/${user.user.uid}/status`] = 'Online';
          updates[`userData/${user.user.uid}/timestamp`] = serverTimestamp();
          updates[`userData/${user.user.uid}/title`] = 'Gamer';
          updates[`userData/${user.user.uid}/userId`] = user.user.uid;
          updates[`userData/${user.user.uid}/userPhotoURL`] = 'https://i.imgur.com/yk5wTiF.png';

          update(ref(database), updates);

          setUserData({
            bio: '',
            color: 'a',
            displayName: username,
            honor: 0,
            infamy: 0,
            isSessionIdPublic: true,
            isStatusPublic: true,
            sessionId: '',
            status: 'Online',
            timestamp: Date.now(),
            title: 'Gamer',
            userId: user.user.uid,
            userPhotoURL: 'https://i.imgur.com/yk5wTiF.png',
          });
          return user;
        }
      } catch (error) {
        console.error('AuthContext signup 2 ', error.message);
        return error;
      }
    }
  };

  const updateDisplayName = async (displayName) => {
    try {
      update(ref(database, 'userData/' + currentUser.uid), {
        displayName: displayName,
      });
    } catch (error) {
      console.error(`AuthContext updateDisplayName 1 `, error.message);
    }
  };

  const updateUserEmail = async (email, password) => {
    const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
    const result = await reauthenticateWithCredential(auth.currentUser, credential);
    if (result) {
      return updateEmail(currentUser, email).then(() => {
        setCurrentUser({ ...currentUser, email: email });
      });
    }
  };

  const updateUserPassword = async (passwordOld, passwordNew) => {
    const credential = EmailAuthProvider.credential(auth.currentUser.email, passwordOld);
    const result = await reauthenticateWithCredential(auth.currentUser, credential);
    if (result) {
      return updatePassword(currentUser, passwordNew);
    }
  };

  const updatePhotoURL = async (photo) => {
    try {
      update(ref(database, 'userData/' + currentUser.uid), {
        userPhotoURL: photo,
      });
    } catch (error) {
      console.error(`AuthContext updatePhotoURL 1 `, error.message);
    }
  };

  const removeMember = async (playerId, guildId, guildLocation, guildTitle, isBlacklist = null, setLoading) => {
    if (setLoading) {
      setLoading(true);
    }
    if (
      guildTitle === 'titleModerator' ||
      guildTitle === 'titleMaster' ||
      playerId === currentUser.uid
    ) {
      let updates = {};
      updates[`guildData${guildLocation}/${guildId}/users`] = increment(-1);
      updates[`guildLists/${guildId}/blacklist/${playerId}`] = isBlacklist;
      updates[`guildLists/${guildId}/whitelist/${playerId}`] = null;
      updates[`userGuilds/${playerId}/${guildId}`] = null;
      update(ref(database), updates)
        .then(() => {
          if (setLoading) {
            setLoading(false);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const manageMember = async (playerId, guildId, title, setLoading) => {
    if (setLoading) {
      setLoading(true);
    }
    get(child(ref(database), `guildLists/${guildId}/${currentUser.uid}`))
      .then((DataSnapshot) => {
        if (DataSnapshot.exists()) {
          if (DataSnapshot.val() === 'titleMaster') {
            if (title === 'titleMaster' || title === 'titleModerator' || title === 'titleMember') {
              let updates = {};
              updates[`guildLists/${guildId}/${playerId}`] = title;
              if (title === 'titleMaster') {
                updates[`guildLists/${guildId}/${currentUser.uid}`] = 'titleModerator';
              }
              update(ref(database), updates);
            }
          }
        }
      })
      .finally(() => {
        if (setLoading) {
          setLoading(false);
        }
      });
  };

  const removeGamer = async (playerId, isBlacklist, setLoading) => {
    if (setLoading) {
      setLoading(true);
    }
    get(child(ref(database), `sessionLists/${userData.sessionId}/whitelist/${playerId}`))
      .then((DataSnapshot) => {
        if (DataSnapshot.exists()) {
          if (userData.sessionId === currentUser.uid || playerId === currentUser.uid) {
            let updates = {};
            if (playerId === currentUser.uid && currentUser.uid === userData.sessionId) {
              updates[`sessionActions/${userData.sessionId}`] = null;
              updates[`sessionButtons/${userData.sessionId}`] = null;
              updates[`sessionData/${userData.sessionId}`] = null;
              updates[`sessionLists/${userData.sessionId}`] = null;
              updates[`sessionMessages/${userData.sessionId}`] = null;
              updates[`sessionMsgHonors/${userData.sessionId}`] = null;
              updates[`sessionSpeech/${userData.sessionId}`] = null;
              update(ref(database), updates);
            } else {
              get(child(ref(database), `userData/${playerId}/sessionId`)).then((Snap) => {
                if (Snap.exists()) {
                  if (Snap.val() === userData.sessionId) {
                    updates[`userData/${playerId}/sessionId`] = '';
                  }
                }
                let obj = {};
                for (let i = 1; i < 17; i++) {
                  let char = (i + 9).toString(36).toLowerCase();
                  obj = {
                    ...obj,
                    [char]: {
                      displayName: '',
                      isShift: false,
                      timestamp: 0,
                      userId: '',
                    },
                  };
                }
                updates[`sessionActions/${userData.sessionId}`] = { ...obj };
                updates[`sessionLists/${userData.sessionId}/whitelist/${playerId}`] = null;
                updates[`sessionSpeech/${userData.sessionId}/${playerId}`] = null;
                if (isBlacklist) {
                  updates[`sessionLists/${userData.sessionId}/blacklist/${playerId}`] = true;
                }
                update(ref(database), updates);
              });
            }
          }
        }
      })
      .finally(() => {
        if (setLoading) {
          setLoading(false);
        }
      });
  };

  const deletePlayer = async (setLoading, password) => {
    if (setLoading) {
      setLoading(true);
    }
    let updates = {};
    let tempArr = [];
    await get(child(ref(database), `userGuilds/${userData.userId}`)).then(async (DataSnapshot) => {
      if (DataSnapshot.exists()) {
        let array = Object.keys(DataSnapshot.val());
        for (let i = 0; i < array.length; i++) {
          await get(
            child(ref(database), `guildAliases/${array[i]}/whitelist/${userData.userId}`)
          ).then((DataSnapshot1) => {
            if (DataSnapshot1.exists()) {
              if (DataSnapshot1.val() === 'titleMaster') {
                updates[`guildAliases/${array[i]}`] = null;
                updates[`guildRooms/${array[i]}`] = null;
                updates[`guildLists/${array[i]}`] = null;
                updates[`guildMessages/${array[i]}`] = null;
                updates[`guildMsgHonors/${array[i]}`] = null;
                updates[`guildReputation/${array[i]}`] = null;
              } else {
                updates[`guildAliases/${array[i]}/users`] = increment(-1);
                updates[`guildLists/${array[i]}/${userData.userId}`] = null;
              }
              tempArr = [...tempArr, DataSnapshot1.key];
            }
          });
        }
        tempArr = [...tempArr, DataSnapshot.key];
      }
    });
    await get(child(ref(database), `userData/${userData.userId}/sessionId`)).then(
      (DataSnapshot) => {
        if (DataSnapshot.exists()) {
          if (DataSnapshot.val() === userData.userId) {
            updates[`sessionActions/${DataSnapshot.val()}`] = null;
            updates[`sessionButtons/${DataSnapshot.val()}`] = null;
            updates[`sessionData/${DataSnapshot.val()}`] = null;
            updates[`sessionLists/${DataSnapshot.val()}`] = null;
            updates[`sessionMessages/${DataSnapshot.val()}`] = null;
            updates[`sessionMsgHonors/${DataSnapshot.val()}`] = null;
            updates[`sessionSpeech/${DataSnapshot.val()}`] = null;
          } else {
            let obj = {};
            for (let i = 1; i < 17; i++) {
              let char = (i + 9).toString(36).toLowerCase();
              obj = {
                ...obj,
                [char]: {
                  displayName: '',
                  isShift: false,
                  timestamp: 0,
                  userId: '',
                },
              };
            }
            updates[`sessionActions/${DataSnapshot.val()}`] = { ...obj };
            updates[`sessionData/${DataSnapshot.val()}/users`] = increment(-1);
            updates[`sessionLists/${DataSnapshot.val()}/whitelist/${userData.userId}`] = null;
            updates[`sessionSpeech/${DataSnapshot.val()}/${userData.userId}`] = null;
            updates[`userBios/${userData.userId}`] = null;
            updates[`userData/${userData.userId}`] = null;
            updates[`userGuilds/${userData.userId}`] = null;
            updates[`userLists/${userData.userId}`] = null;
            updates[`userSettings/${userData.userId}`] = null;
            updates[`userStatus/${userData.userId}`] = null;
          }
          tempArr = [...tempArr, DataSnapshot.key];
        }
      }
    );

    Promise.allSettled(tempArr)
      .then(() => {
        update(ref(database), updates);
      })
      .finally(async () => {
        if (setLoading) {
          setLoading(false);
        }
        if (!password) return deleteUser(auth.currentUser);
        const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
        const result = await reauthenticateWithCredential(auth.currentUser, credential);
        if (result) {
          return deleteUser(auth.currentUser);
        }
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        // const messagingToken = getToken(messaging, {
        //   vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPIDKEY,
        // });
        onValue(ref(database, `userData/${user.uid}`), (snapshot) => {
          if (snapshot.exists()) {
            if (
              user.isAnonymous &&
              snapshot.val().sessionId !== userData.sessionId &&
              userData.sessionId !== ''
            ) {
              deletePlayer();
            }
            setUserData(snapshot.val());
          }
        });
        presence();
      }
    });
    return () => unsubscribe();
  }, []);

  const presence = () => {
    if (userData.isStatusPublic) {
      // stores the timestamp of my last disconnect (the last time I was seen online)
      onValue(ref(database, '.info/connected'), (snap) => {
        if (snap.val() === true) {
          // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
          let connect = {};
          connect[`userData/${userData.userId}/status`] = 'online';
          connect[`userData/${userData.userId}/timestamp`] = serverTimestamp();
          update(ref(database)).update(connect);

          // When user disconnect, update the last time user was seen online
          let disconnect = {};
          disconnect[`userData/${userData.userId}/status`] = 'offline';
          disconnect[`userData/${userData.userId}/timestamp`] = serverTimestamp();
          // if (session === userData.userId) {
          //   disconnect[`sessionActions/${userData.sessionId}`] = null;
          //   disconnect[`sessionButtons/${userData.sessionId}`] = null;
          //   disconnect[`sessionData/${userData.sessionId}`] = null;
          //   disconnect[`sessionLists/${userData.sessionId}`] = null;
          //   disconnect[`sessionMessages/${userData.sessionId}`] = null;
          //   disconnect[`sessionMsgHonors/${userData.sessionId}`] = null;
          //   disconnect[`sessionSpeech/${userData.sessionId}`] = null;
          // } else {
          //   disconnect[`sessionData/${userData.sessionId}/usersCount`] = increment(-1);
          //   disconnect[`sessionData/${userData.sessionId}/timestamp`] = serverTimestamp();
          //   disconnect[`sessionLists/${userData.sessionId}/whitelist/${userData.userId}`] = null;
          //   disconnect[`sessionSpeech/${userData.sessionId}/${userData.userId}`] = null;
          // }

          onDisconnect(ref(database)).update(disconnect);
        }
      });
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', (e) => {
        if (userData.sessionId && userData.sessionId !== 'sessions' && userData.sessionId !== '') {
          removeGamer(currentUser.uid);
        }
      });

      return () => {
        window.removeEventListener('beforeunload', (e) => {
          if (
            userData.sessionId &&
            userData.sessionId !== 'sessions' &&
            userData.sessionId !== ''
          ) {
            removeGamer(currentUser.uid);
          }
        });
      };
    }
  }, []);

  const value = {
    anonymousLogin,
    deletePlayer,
    currentUser,
    logout,
    resetPassword,
    signin,
    signup,
    removeGamer,
    manageMember,
    removeMember,
    setCurrentUser,
    updateDisplayName,
    updateUserEmail,
    updateUserPassword,
    updatePhotoURL,
    userData,
    userIsPremium,
    setUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
