import {
  child,
  get,
  push,
  ref,
  set,
  update,
  runTransaction,
  onValue,
} from "firebase/database";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase/firebaseClient";

const SessionId = (props) => {
  const { anonymousLogin, currentUser } = useAuth();
  const [data, setData] = useState(props.data);
  const [loading, setLoading] = useState(true);
  const [usersCount, setUsersCount] = useState(data.usersCount);
  const [usersMax, setUsersMax] = useState(data.usersMax);
  const [sessionUsers, setSessionUsers] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    //check if user is logged in
    if (!currentUser) {
      router.push(`/join/${id}`);
    } else {
      //check blacklist if logged in
      console.log(`currentUser uid: ${currentUser.uid}`);

      const checkBlackList = async () => {
        const dbRef = ref(database);
        try {
          console.log("starting to load blacklist");
          const res = await get(child(dbRef, `sessionLists/${id}/blacklist`));
          console.log("blacklist imported");
          const blacklistUsers = res.val();

          console.log({ blacklist: blacklistUsers });

          if (!blacklistUsers) {
            console.log("no blacklist in sssion");
          }

          blacklistUsers &&
            Object.entries(blacklistUsers).map(([key, value]) => {
              if (currentUser.uid === key) {
                router.push("/lfg");
                alert("user is blacklisted");
              }
            });
          console.log("blacklist was not matched ");
          console.log("starting to add player");

          addPlayer();
        } catch (error) {
          console.error(error.message);
          console.log("blacklist error");
        }
      };
      checkBlackList();
    }
  }, [currentUser]);

  const [whiteList, setWhiteList] = useState(false);

  // add session in User's Database function

  const AddInUserData = (uid, id) => {
    console.log("adding in user's database");
    try {
      update(ref(database), { [`userData/${uid}/sessions/${id}`]: true });

      console.log("added in user's database");
    } catch (error) {
      console.error(error.message);
      console.log("failed to add in user's database");
    }
  };

  // remove session from user's database function

  const deleteInUserData = async (uid, id) => {
    console.log("removing from user's database");
    try {
      update(ref(database), { [`userData/${uid}/sessions/${id}`]: null });

      console.log("removed in user's database");
    } catch (error) {
      console.error(error.message);
      console.log("failed to remove in user's database");
    }
  };

  // add in session database function

  const monitorWhitelist = () => {
    onValue(ref(database, `sessionLists/${id}/whitelist`), (snapshot) => {
      const whitelistData = snapshot.val();

      setWhitelist(whitelistData);
    });
  };

  const [whitelist, setWhitelist] = useState();
  useEffect(() => {
    if (whitelist) {
      const isInWhitlist =
        whitelist &&
        Object.entries(whitelist).find(([key, value]) => {
          return key === currentUser?.uid;
        });
      if (!isInWhitlist) {
        console.log("not in whitelist now, going to reroute");
        router.push("/lfg");
        setWhiteList(false);
      } else {
        console.log("In whitelist now, going to fetch players");
        fetchAllPlayersInSession();
        setWhiteList(true);
      }
    }
  }, [whitelist]);

  const fetchAllPlayersInSession = () => {
    let players = {};
    const iterateAllUsers = Object.entries(whitelist).map(([uid, value]) => {
      const getPlayer = async () => {
        const playerReq = await get(child(ref(database), `userData/${uid}`));
        const player = playerReq.val();
        if (!player) {
          console.log("user not found");
          console.log("removing invalid user");
          removePlayer(id, uid);
        } else {
          players = { ...players, [uid]: player };
        }
      };

      return getPlayer();
    });

    Promise.all(iterateAllUsers).then(() => {
      setSessionUsers(players);
    });
  };
  const addPlayer = async () => {
    // check if user is in whitelist

    try {
      const initialWhitelist = await get(
        child(ref(database), `sessionLists/${id}/whitelist/${currentUser.uid}`)
      );

      console.log("initial whitelist check");
      console.log(initialWhitelist);
      const whitelistData = initialWhitelist.val();

      if (whitelistData) {
        // user is already in the session
        console.log("user is already whitelisted");

        monitorWhitelist();
        console.log("monitoring  whitelist ");
      } else {
        console.log("user is not whitelisted");
        console.log("starting to add in  whitelisted");

        //increasing usercount

        const increaseUsersCount = (sessionId) => {
          const db = database;
          const postRef = ref(db, "/sessionData/" + sessionId);

          runTransaction(postRef, (post) => {
            console.log(post);

            if (post) {
              if (post.usersCount < post.usersMax) {
                post.usersCount++;
                setUsersCount(post.usersCount);
              } else {
                console.log("session is full");
                router.push("/lfg");
              }
            }
            return post;
          });
        };

        try {
          console.log("adding user in all database");

          increaseUsersCount(id);
          console.log("increased usercount");
          update(ref(database), {
            [`sessionLists/${id}/whitelist/${currentUser.uid}`]: true,
          });
          console.log("added in whitelist ");

          update(ref(database), {
            [`userSessions/${currentUser.uid}/${id}`]: true,
          });
          console.log("added in userSessions ");

          console.log("monitoring  whitelist ");
          monitorWhitelist();
          console.log("monitoring  whitelist ");
        } catch (error) {
          console.log("adding user in database error");
          console.error(error.message);
        }

        ///

        ///

        ///
      }

      //
    } catch (error) {
      console.log("initialWhitelist error");
      console.error(error.message);
    }
  };

  // remove player function
  const removePlayer = async (sessionId, playerId) => {
    // check if user is in whitelist

    try {
      console.log("starting to remove from whitelist");

      //decreasing usercount

      const decreaseUsersCount = (sessionId) => {
        const db = database;
        const postRef = ref(db, "/sessionData/" + sessionId);

        runTransaction(postRef, (post) => {
          console.log(post);

          if (post) {
            post.usersCount--;
            setUsersCount(post.usersCount);
          }
          return post;
        });
      };

      try {
        console.log("removing user from all database");

        decreaseUsersCount(sessionId);
        console.log("decreased usercount");
        update(ref(database), {
          [`sessionLists/${sessionId}/whitelist/${playerId}`]: null,
        });
        console.log("removed from whitelist ");

        update(ref(database), {
          [`userSessions/${playerId}/${sessionId}`]: null,
        });
        console.log("removed from userSessions ");

        console.log("monitoring  whitelist ");
        monitorWhitelist();
        console.log("finished removing player");
      } catch (error) {
        console.log("removing user from database error");
        console.error(error.message);
      }
    } catch (error) {
      console.log("remove player error error");
      console.error(error.message);
    }
  };

  // main component

  return (
    <div>
      {whiteList ? (
        <>
          <button
            onClick={() => {
              removePlayer(id, currentUser.uid);
            }}
          >
            Remove Player
          </button>
          <div>
            {sessionUsers &&
              Object.entries(sessionUsers).map(([uid, value]) => (
                <div key={uid}>
                  <p>
                    {" "}
                    key: {value?.uid}
                    <br />
                    {value &&
                      Object.entries(value).map(([key2, value2]) => (
                        <span key={key2}>
                          {key2} :<span>{value2}</span> <br />
                        </span>
                      ))}
                  </p>
                </div>
              ))}
          </div>
          <div>
            <p>
              SessionData : <br />
              activity: {data?.activity}
              <br />
              description: {data?.description}
              <br />
              game: {data?.game}
              <br />
              ownerId: {data?.description}
              <br />
              platform: {data?.platform}
              <br />
              timestamp:{" "}
              {data?.timestamp && new Date(data?.timestamp).toLocaleString()}
              <br />
              usersCount: {data?.usersCount}
              <br />
              usersMax: {data?.usersMax}
              <br />
            </p>
          </div>
          <div>stripe</div>
        </>
      ) : (
        <button onClick={addPlayer}>addPlayer</button>
      )}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  const dbRef = ref(database);
  try {
    const res = await get(child(dbRef, `sessionData/${id}`));
    const sessionData = await res.val();
    return {
      props: { data: sessionData },
    };
  } catch (error) {
    console.error(error.message);
    return {
      props: { data: "error" },
    };
  }
};

export default SessionId;
