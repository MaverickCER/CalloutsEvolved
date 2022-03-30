import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  signInAnonymously,
  updateProfile,
  linkWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import {
  child,
  get,
  ref,
  runTransaction,
  update,
  onValue,
  push,
  onDisconnect,
  set,
  serverTimestamp,
} from 'firebase/database';

import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { auth, database, firestore } from '../firebase/firebaseClient';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(0);
  const router = useRouter();

  const register = async (email, password, username, photoURL) => {
    if (currentUser && currentUser.isAnonymous) {
      console.log('turning anonymous user into permanent');
      const credential = EmailAuthProvider.credential(email, password);

      try {
        const user = await linkWithCredential(auth.currentUser, credential);

        console.log(user);

        if (user) {
          updateProfile(user.user, {
            displayName: username,
            photoURL: photoURL,
          }).then(() => {
            console.log('updated firebase profile');
            setLoader(loader + 1);
          });

          let userObject = {
            [`userBios/` + user.user.uid]: '...',
            [`userData/` + user.user.uid]: {
              color: 'cbb',
              displayName: username,
              userId: user.user.uid,
            },
            [`userStatus/` + user.user.uid]: {
              status: 'online',
              timestamp: serverTimestamp(),
            },
          };

          update(ref(database), userObject).then(() => {
            console.log('finished updating database for new user from anonymous');
          });
          console.log('anonymous user turned permanent');
          return await user;
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    } else {
      try {
        const user = await createUserWithEmailAndPassword(auth, email, password);

        if (user) {
          updateProfile(user.user, {
            displayName: username,
            photoURL: photoURL,
          }).then(() => {
            console.log('updated firebase profile');
            setLoader(loader + 1);
          });

          let userObject = {
            [`userBios/` + user.user.uid]: '...',
            [`userData/` + user.user.uid]: {
              color: 'cbb',
              displayName: username,
              userId: user.user.uid,
            },
            [`userStatus/` + user.user.uid]: {
              status: 'online',
              timestamp: serverTimestamp(),
            },
          };

          update(ref(database), userObject).then(() => {
            console.log('finished updating database for new user');
          });
          console.log('new user created');
          return await user;
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    // remove player from all sessions

    const removePlayer = async (playerId) => {
      // check if user is in whitelist

      try {
        console.log('starting to remove from whitelist');

        update(ref(database), {
          [`userStatus/${currentUser?.uid}/status`]: 'offline',
        });
        update(ref(database), {
          [`userStatus/${currentUser?.uid}/timestamp`]: serverTimestamp(),
        });

        //decreasing usercount

        const sessionListData = await get(child(ref(database), `userSessions/${playerId}`));

        const sessionList = sessionListData.val();
        console.log('sessionList');

        try {
          console.log('removing user from all database');

          update(ref(database), {
            [`userSessions/${playerId}`]: null,
          });
          update(ref(database), {
            [`userStatus/${playerId}`]: null,
          });
          update(ref(database), {
            [`userBios/${playerId}`]: null,
          });

          update(ref(database), {
            [`userData/${playerId}`]: null,
          });

          console.log('deleted in remove database');
        } catch (error) {
          console.log('removing user from database error');
          console.log(error.message);
        } finally {
          return (
            sessionList &&
            Object.entries(sessionList).forEach(([id, value]) => {
              update(ref(database), {
                [`sessionLists/${id}/whitelist/${playerId}`]: null,
              });

              const decreaseUsersCount = async (id) => {
                const db = database;

                const postRef = ref(db, '/sessionData/' + id);

                const res = await (id &&
                  runTransaction(postRef, (post) => {
                    if (post) {
                      post.usersCount--;
                    }
                    console.log('post');
                    return post;
                  }));
                if (res) {
                  return signOut(auth);
                }
              };

              decreaseUsersCount(id);
            })
          );
        }
      } catch (error) {
        console.log('remove player error error');
        console.log(error.message);
      } finally {
      }
    };

    //

    if (currentUser && currentUser.isAnonymous) {
      return removePlayer(currentUser.uid);
    } else {
      return signOut(auth);
    }
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  const updateUsernameAndPhoto = async (username, photo) => {
    try {
      const res = await updateProfile(currentUser, {
        displayName: username,
        photoURL: photo,
      });

      let userObject = {
        [`userData/` + currentUser.uid + `/displayName`]: username,
        [`userData/` + currentUser.uid + `/photoURL`]: photo,
      };
      if (res) {
        return update(ref(database), userObject).then(() => {
          console.log('finished updating database for new user from anonymous');
        });
      }
    } catch (error) {
      return error;
    } finally {
      setLoader(loader + 1);
    }
  };

  const updateUserEmail = (email) => {
    return updateEmail(currentUser, email);
  };

  const updateUserPassword = (password) => {
    return updatePassword(currentUser, password);
  };

  const anonymousLogin = async (id) => {
    const user = await signInAnonymously(auth);
    const randomName = () => {
      let name = '';
      for (let i = 0; i < 6; i++) {
        name += String.fromCharCode(97 + Math.floor(Math.random() * 26));
      }
      return name;
    };
    const chosenName = `anonymous ${randomName()}`;

    if (user) {
      updateProfile(user.user, {
        displayName: chosenName,
        photoURL: '...',
      }).then(() => {
        console.log('updated firebase profile');
        setLoader(loader + 1);
        let userObject = {
          [`userBios/` + user.user.uid]: '...',
          [`userData/` + user.user.uid]: {
            color: 'cbb',
            displayName: chosenName,
            userId: user.user.uid,
          },
          [`userStatus/` + user.user.uid]: {
            status: 'online',
            timestamp: serverTimestamp(),
          },
        };

        update(ref(database), userObject).then(() => {
          console.log('finished updating database for anonymous user');
          router.push(`/session/${id}`);
        });
      });
    }
  };

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
    } else {
      console.log('No user logged in');
    }
  }, [currentUser]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        presence(user.uid);
      }

      setLoading(false);
    });
    return unsubscribe;
  }, [loader]);

  const presence = (userId) => {
    // stores the timestamp of my last disconnect (the last time I was seen online)
    const offlineRef = ref(database, `userStatus/${userId}/status`);
    const lastOnlineRef = ref(database, `userStatus/${userId}/timestamp`);

    const connectedRef = ref(database, '.info/connected');
    onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
        update(ref(database), { [`userStatus/${userId}/status`]: 'onilne' });
        update(ref(database), {
          [`userStatus/${userId}/timestamp`]: serverTimestamp(),
        });

        // When I disconnect, remove this device
        // onDisconnect(con).remove();

        // Add this device to the connections list
        // this value could contain info about the device or a timestamp too

        // When user disconnect, update the last time user was seen online
        onDisconnect(offlineRef).set('offline');
        onDisconnect(lastOnlineRef).set(serverTimestamp());
      }
    });
  };

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (!url.startsWith('/')) {
        console.log(`App is changing to ${url} `);
        logout();
      }
    };

    router.beforePopState(({ as }) => {
      if (!as.startsWith('/')) {
        logout();
      }

      return true;
    });

    if (process.browser) {
      window.addEventListener('beforeunload', (e) => {
        logout();
      });
    }

    return () => {
      router.beforePopState(() => true);
    };
  }, []);

  const value = {
    currentUser,
    register,
    login,
    logout,
    resetPassword,
    updateUserEmail,
    updateUsernameAndPhoto,
    updateUserPassword,
    anonymousLogin,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
