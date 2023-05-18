import React, { useEffect, useState } from 'react';
import { child, get, ref, update, increment } from 'firebase/database';

import { database } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import ChevronIcon from '../assets/ChevronIcon';

const PostShare = (props) => {
  const { currentUser } = useAuth();
  const [adjLike, setAdjLike] = useState(undefined);

  const changeRep = async (val, delta) => {
    if (currentUser) {
      let updates = {};
      updates[`blog/${props.slug}/honor`] = increment(delta);
      props.authors.map((a) => {
        updates[`userData/${a}/honor`] = increment(delta);
      });
      updates[`honors/${props.slug}/${currentUser.uid}`] = val;

      update(ref(database), updates).then(() => {
        setAdjLike(val);
      });
    }
  };

  useEffect(() => {
    const updateLikes = async () => {
      let data = await get(child(ref(database), `honors/${props.slug}/${currentUser.uid}`)).then((snapshot) => snapshot?.val());
      setAdjLike(data);
    }
    if (currentUser && !adjLike) {
      updateLikes();
    }
  }, [currentUser, adjLike, props.slug]);

  return (
    <>
      <div>
        <p style={{ textAlign: 'center' }}>What did you think of this post?</p>
        {currentUser ? (
          <div className='btn-like-wrapper' style={{ width: 'fit-content', margin: 'auto' }}>
            <button
              onClick={() => {
                changeRep(
                  adjLike === false ? null : false,
                  adjLike === false ? 1 : adjLike === true ? -2 : -1
                );
              }}>
              <ChevronIcon
                width='1em'
                height='1em'
                style={{ width: '1rem', height: '1rem' }}
                title='Dislike Icon'
                fill={adjLike === false ? `rgb(var(--bbc))` : `rgb(var(--mca))`}
              />
            </button>
            <button
              onClick={() => {
                changeRep(
                  adjLike === true ? null : true,
                  adjLike === true ? -1 : adjLike === false ? 2 : 1
                );
              }}>
              <ChevronIcon
                height='1em'
                style={{ transform: 'rotate(180deg)', width: '1rem', height: '1rem' }}
                title='Like Icon'
                width='1em'
                fill={adjLike === true ? `rgb(var(--mca))` : `rgb(var(--bbc))`}
              />
            </button>
          </div>
        ) : (
          <p style={{ textAlign: 'center' }}>Log in to vote!</p>
        )}
      </div>
    </>
  );
};

export default PostShare;
