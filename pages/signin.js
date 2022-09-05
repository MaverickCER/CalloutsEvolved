import React, { useEffect } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import SignIn from '../components/auth/signin';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const Signin = () => {
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      router.push('/lfg');
    }
  }, [currentUser, router]);

  return (
    <div>
      <Head>
        <title>Callouts Evolved | Login</title>
        <meta
          name="description"
          content="Sign in to gain full access to communication tools from Callouts Evolved."
        />
      </Head>
      <h1>Sign In</h1>
      <SignIn />
      <small>
        Need an account?{' '}
        <Link href="/register" passHref>
          <a>
            <u>Register</u>
          </a>
        </Link>
      </small>
      <br />
      <small>
        Forgot Password?{' '}
        <Link href="/forgot-password" passHref>
          <a>
            <u>Reset</u>
          </a>
        </Link>
      </small>
    </div>
  );
};

export default Signin;
