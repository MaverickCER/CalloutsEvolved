import React, { useEffect, useState } from 'react';
import { child, get, increment, onValue, ref, update } from 'firebase/database';

import SignIn from '../../../components/auth/signin';
import SignUp from '../../../components/auth/signup';
import { database } from '../../../firebase/firebaseClient';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/router';

const JoinGuildId = () => {
  const { currentUser } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({
    description: 'Description...',
    displayName: 'Guild Name',
    guildPhotoURL: 'https://i.imgur.com/yk5wTiF.png',
    isPublic: true,
    lang: 'en',
    reputation: 0,
    timestamp: 0,
    users: 0,
  });

  useEffect(() => {
    let unsubscribe = onValue(ref(database, `guildAliases/${id}`), (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      }
    });

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    if (currentUser) {
      get(child(ref(database), `guildLists/${id}/whitelist/${currentUser.uid}`)).then(
        (DataSnapshot) => {
          if (DataSnapshot.exists()) {
            router.push(`/guild/${id}`);
          } else {
            if (isReady) {
              let updates = {};
              updates[`guildAliases/${id}/users`] = increment(1);
              updates[`guildLists/${id}/whitelist/${currentUser.uid}`] = 'titleMember';
              updates[`userGuilds/${currentUser.uid}/${id}`] = true;

              update(ref(database), updates).then(() => {
                router.push(`/guild/${id}`);
              });
            } else {
              let unsubscribe = onValue(
                ref(database, `guildLists/${id}/blacklist/${currentUser.uid}`),
                (snapshot) => {
                  if (snapshot.exists()) {
                    router.push('/guilds');
                  }
                }
              );

              return () => unsubscribe();
            }
          }
        }
      );
    }
  }, [id, router, currentUser, isReady]);

  return (
    <div>
      {currentUser ? (
        <>
          <button
            onClick={() => {
              setIsReady(true);
            }}>
            Join Guild
          </button>
        </>
      ) : (
        <>
          <SignIn />
          <SignUp />
        </>
      )}
    </div>
  );
};

export default JoinGuildId;
