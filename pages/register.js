import React, { useEffect } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import SignUp from '../components/auth/signup';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const Register = () => {
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
        <title>Callouts Evolved | Register</title>
        <meta
          name="description"
          content="Sign up to gain full access to communication tools from Callouts Evolved."
        />
      </Head>
      <h1>Register</h1>
      <SignUp />
      <small>
        Have an account?{' '}
        <Link href="/signin" passHref>
          <a>
            <u>Sign In</u>
          </a>
        </Link>
      </small>
    </div>
  );
};

export default Register;
