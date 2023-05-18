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
          name='description'
          content='Sign in to gain full access to communication tools from Callouts Evolved.'
        />
      </Head>
      <h1>Reset Password</h1>
      <ResetPassword />
      <small>
        Have an account?{' '}
        <Link href='/signin'>
          <u>Sign In</u>
        </Link>
      </small>
      <br />
      <small>
        Need an account?{' '}
        <Link href='/register'>
          <u>Register</u>
        </Link>
      </small>
    </div>
  );
};

export default ForgotPassword;
