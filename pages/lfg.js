import { ref, get, child } from "firebase/database";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { database } from "../firebase/firebaseClient";
import { useAuth } from "../contexts/AuthContext";

const Lfg = (props) => {
  const [limitNum, setLimitNum] = useState(5);
  let itemNum = 0;

  const [dataObj, setDataObj] = useState(props?.data);
  const [data, setData] = useState(props?.data);
  const { currentUser } = useAuth();

  // 3 dropdown menu to filter platform, game, activity, one text box to search description,

  useEffect(() => {
    console.log({ data: data });
  }, [data]);

  useEffect(() => {
    if (limitNum !== 5) {
      loadMore();
    }
  }, [limitNum]);

  const loadMore = async () => {
    const dbRef = ref(database);
    get(child(dbRef, "sessionData"))
      .then((snapShot) => {
        if (snapShot.exists()) {
          console.log(snapShot.val());

          const obj = snapShot.val();
          setDataObj(obj);
          console.log(obj);
        } else {
          console.log("no Data in DB ");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const searchBoxRef = useRef();

  // search box

  const searchBoxSearch = (e) => {
    e.preventDefault();
    setLimitNum(5);
    if (searchBoxRef.current.value === "") {
      alert("not found");
      setData(dataObj);
    } else {
      const filtered = Object.entries(dataObj).filter(([key, value]) => {
        if (searchBoxRef.current.value !== "") {
          return value.description.includes(searchBoxRef.current.value);
        }
      });
      const newData = Object.fromEntries(filtered);
      setData(newData);
    }
  };

  // Filter by game, platform, activity
  const [selectedQuery, setSelectedQuery] = useState({
    game: "",
    platform: "",
    activity: "",
  });

  useEffect(() => {
    console.log(selectedQuery);
    setLimitNum(5);

    if (
      selectedQuery.game !== "" ||
      selectedQuery.platform !== "" ||
      selectedQuery.activity !== ""
    ) {
      const filtered = Object.entries(dataObj).filter(([key, value]) => {
        if (selectedQuery.game !== "" && selectedQuery.game !== value.game) {
          return false;
        }
        if (
          selectedQuery.platform !== "" &&
          selectedQuery.platform !== value.platform
        ) {
          return false;
        }
        if (
          selectedQuery.activity !== "" &&
          selectedQuery.activity !== value.activity
        ) {
          return false;
        }

        return true;
      });
      const newData = Object.fromEntries(filtered);
      setData(newData);
    } else {
      setData(dataObj);
    }
  }, [selectedQuery]);

  return (
    <div>
      <Head>
        <title>Callouts Evolved | LFG</title>
        <meta
          name="description"
          content="Join groups focused on efficiently completing any video game activity."
        />
      </Head>
      <h1>LFG</h1>
      {dataObj ? (
        <div>
          <div>
            <form onSubmit={searchBoxSearch}>
              <input type={"text"} ref={searchBoxRef} />
              <button type="submit">search</button>
            </form>
            <h4>filter</h4>
            <span>
              <p>game:</p>
              <ul>
                {[
                  ...new Set(
                    Object.entries(dataObj).map(([key, data]) => data.game)
                  ),
                ].map((game) => (
                  <li
                    key={game}
                    onClick={() => {
                      setSelectedQuery({ ...selectedQuery, game: game });
                    }}
                  >
                    {game}
                  </li>
                ))}
              </ul>
            </span>
            <span>
              <p>platform:</p>
              <ul>
                {[
                  ...new Set(
                    Object.entries(dataObj).map(([key, data]) => data.platform)
                  ),
                ].map((platform) => (
                  <li
                    key={platform}
                    onClick={() => {
                      setSelectedQuery({
                        ...selectedQuery,
                        platform: platform,
                      });
                    }}
                  >
                    {platform}
                  </li>
                ))}
              </ul>
            </span>
            <span>
              <p>activity:</p>
              <ul>
                {[
                  ...new Set(
                    Object.entries(dataObj).map(([key, data]) => data.activity)
                  ),
                ].map((activity) => (
                  <li
                    key={activity}
                    onClick={() => {
                      setSelectedQuery({
                        ...selectedQuery,
                        activity: activity,
                      });
                    }}
                  >
                    {activity}
                  </li>
                ))}
              </ul>
              <button
                onClick={() =>
                  setSelectedQuery({
                    game: "",
                    platform: "",
                    activity: "",
                  })
                }
              >
                reset filter
              </button>
            </span>
          </div>

          <div>
            <h4>lfgs</h4>

            {Object.entries(data).map(([key, data]) => {
              itemNum++;

              if (itemNum <= limitNum) {
                return (
                  <Link href={`join/${key}`} key={key}>
                    <a>
                      <div
                        style={{
                          background: "rgba(0,0,0,0.1",
                          marginTop: "5px",
                        }}
                      >
                        {data.img && (
                          <span>
                            <Image
                              src={data.img}
                              alt={data.game}
                              height={50}
                              width={50}
                            />
                          </span>
                        )}
                        <div>
                          {itemNum}
                          <p>{`${key}:${data.description}`}</p>
                        </div>
                        <span>
                          <div>
                            <small>{`${data.platform}/${data.game}/${data.activity}/${data.usersCount}/${data.usersMax}`}</small>
                          </div>
                        </span>
                      </div>
                    </a>
                  </Link>
                );
              }
            })}

            <button
              onClick={(e) => {
                setLimitNum(limitNum + 5);
              }}
            >
              load more
            </button>
          </div>
        </div>
      ) : (
        <h2>No Active session</h2>
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const dbRef = ref(database);
  try {
    const res = await get(child(dbRef, "sessionData"));
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

export default Lfg;
