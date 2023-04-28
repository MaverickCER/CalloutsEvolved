import React, { useEffect } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import ResetPassword from '../components/auth/resetpassword';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const ForgotPassword = () => {
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
      <h1>Reset Password</h1>
      <ResetPassword />
      <small>
        Have an account?{' '}
        <Link href="/signin" passHref>
          <a>
            <u>Sign In</u>
          </a>
        </Link>
      </small>
      <br />
      <small>
        Need an account?{' '}
        <Link href="/register" passHref>
          <a>
            <u>Register</u>
          </a>
        </Link>
      </small>
    </div>
  );
};

export default ForgotPassword;
