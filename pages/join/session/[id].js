import React, { useEffect, useState } from 'react';
import { increment, onValue, ref, update } from 'firebase/database';

import SignIn from '../../../components/auth/signin';
import SignUp from '../../../components/auth/signup';
import { database } from '../../../firebase/firebaseClient';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/router';

const JoinSessionId = () => {
  const { anonymousLogin, currentUser, userData } = useAuth();
  const [checkUsers, setCheckUsers] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [anonymousLoading, setAnonymousLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({
    activity: 'Activity',
    description: 'Description...',
    game: 'Game',
    isOpen: true,
    isPublic: true,
    lang: 'en',
    ownerId: '0',
    platform: 'all',
    sessionPhotoURL: 'https://i.imgur.com/yk5wTiF.png',
    timestamp: 0,
    usersCount: 1,
    usersMax: 2,
  });

  const loginAnonymously = async () => {
    setAnonymousLoading(true);
    setCheckUsers(false);
    anonymousLogin(id)
      .then(() => {
        setIsReady(true);
      })
      .catch((error) => {
        console.error(error);
        setCheckUsers(true);
        setAnonymousLoading(false);
      });
  };

  useEffect(() => {
    if (checkUsers) {
      let unsubscribe = onValue(ref(database, `sessionData/${id}`), (snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
          if (snapshot.val().usersCount === snapshot.val().usersMax) {
            router.push('/lfg?unavailable');
          }
        }
      });

      return () => unsubscribe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, router, checkUsers]);

  useEffect(() => {
    if (currentUser) {
      if (isReady) {
        let updates = {};
        updates[`sessionLists/${id}/whitelist/${currentUser.uid}`] = userData.title;
        updates[`sessionSpeech/${id}/${currentUser.uid}/message`] = 'Muted';
        updates[`sessionSpeech/${id}/${currentUser.uid}/title`] = 'Unknown';
        updates[`sessionSpeech/${id}/${currentUser.uid}/userId`] = currentUser.uid;
        updates[`userData/${currentUser.uid}/sessionId`] = id;

        update(ref(database), updates).then(() => {
          router.push(`/session/${id}`);
        });
      } else {
        let unsubscribe = onValue(
          ref(database, `sessionLists/${id}/blacklist/${currentUser.uid}`),
          (snapshot) => {
            if (snapshot.exists()) {
              router.push('/lfg?blacklisted');
            }
          }
        );

        return () => unsubscribe();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, router, currentUser, isReady]);

  return (
    <div>
      {currentUser ? (
        <>
          <button
            onClick={() => {
              setIsReady(true);
            }}>
            Join Session
          </button>
        </>
      ) : (
        <>
          <button
            disabled={anonymousLoading}
            onClick={() => {
              loginAnonymously();
            }}>
            {anonymousLoading ? 'Loading...' : 'Sign in anonymously and Join'}
          </button>
          <SignIn
            callback={() => {
              setIsReady(true);
            }}
          />
          <SignUp
            callback={() => {
              setIsReady(true);
            }}
          />
        </>
      )}
    </div>
  );
};

export default JoinSessionId;
