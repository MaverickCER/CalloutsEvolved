import { child, get, ref } from "firebase/database";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase/firebaseClient";

const Join = (props) => {
  const { anonymousLogin, currentUser } = useAuth();
  const [data, setData] = useState(props.data);
  const [loading, setLoading] = useState(false);
  const [usersCount, setUsersCount] = useState(Number(props.data.usersCount));
  const [usersMax, setUsersMax] = useState(Number(props.data.usersMax));
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  console.log(usersCount, usersMax);
  console.log(data);

  const loginAnonymously = async () => {
    setLoading(true);
    anonymousLogin(id)
      .then(() => {
        setLoading(false);
        router.push(`/session/${id}`);
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (data.usersCount >= data.usersMax) {
      alert("session is full");
      router.push("/lfg");
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      router.push(`/session/${id}`);
    }
  }, [currentUser]);

  return (
    <div>
      <button disabled={loading} onClick={loginAnonymously}>
        Sign in anonymously and Join
      </button>
      <button
        disabled={loading}
        onClick={() => {
          router.push("/register");
        }}
      >
        register with email/password
      </button>
      <button
        disabled={loading}
        onClick={() => {
          router.push("/login");
        }}
      >
        login
      </button>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  console.log(id);
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

export default Join;
