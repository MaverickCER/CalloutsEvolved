import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import DisplayData from "../../components/DisplayData";
import { useAuth } from "../../contexts/AuthContext";
import ManageSub from "../../components/ManageSub";

const Index = () => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser || currentUser.isAnonymous) {
      router.push("/lfg");
    }
  }, [currentUser]);

  return currentUser && !currentUser.isAnonymous ? (
    <div>
      <Head>
        <title>Callouts Evolved | Session</title>
        <meta
          name="description"
          content="Free online virtual microphone or augmentative and alternative communicateion (AAC) to improve call outs in video games."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Session</h1>
      <DisplayData />
      <Link href={"/updateProfile"}>
        <a>update profile</a>
      </Link>
      <ManageSub />
    </div>
  ) : (
    <h1>No user logged in</h1>
  );
};

export default Index;
