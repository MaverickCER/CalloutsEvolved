import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import AuthInput from './authinput';
import styles from './authform.module.css';
import { useAuth } from '../../context/AuthContext';

const UpdateEmail = () => {
  const { updateUserEmail, currentUser, setCurrentUser } = useAuth();
  const [error, setError] = useState('');
  const [type, setType] = useState(true);
  const [loading, setLoading] = useState(false);
  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const emailVal = useWatch({ control, name: 'email' });
  const passwordVal = useWatch({ control, name: 'password' });

  const onSubmit = async (data) => {
    let email = data.email.replace(/\s+/g, '').toLowerCase();
    let password = data.password;

    if (email === '') return setError('Your new email is required');
    if (password === '') return setError('Your password is required');
    if (email === currentUser.email) return setError('Your new email is required');
    setError('');
    setLoading(true);

    try {
      const res = await updateUserEmail(email, password);
    } catch (error) {
      console.error(error);
      if (error.message === 'Firebase: Error (auth/wrong-password).') {
        setError('Wrong password');
      } else if (error.message === 'Firebase: Error (auth/user-not-found).') {
        setError('Wrong email');
      } else if (error.message === 'Firebase: Error (auth/invalid-email).') {
        setError('Your email is invalid');
      } else {
        setError(`${error.message}`);
      }
    } finally {
      reset({ email: '', password: '' });
      setLoading(false);
    }
  };

  return (
    <>
      <form className={`${styles.form} updateEmailForm`} onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={styles.fieldset} role="guild" aria-label="Update Email">
          {error !== '' && <span className={styles.formTextError}>{error}</span>}
          <AuthInput
            autoComplete="off"
            error={errors.email}
            label="New Email"
            name="email"
            placeholder="GamerName@gmail.com"
            register={register('email', {
              required: true,
              min: {
                value: 8,
                message: 'Your email must be at least 8 characters.',
              },
              max: 320,
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Your email must be in format: user@domain.com',
              },
            })}
            required="true"
            title="Must be at least 8 characters in format: user@domain.com"
            type="email"
            val={emailVal}
          />
          <AuthInput
            autoComplete="off"
            btn="i"
            btnAction={() => {
              setType(!type);
            }}
            error={errors.password}
            label="Current Password"
            name="password"
            placeholder="PassW0rd 8+ characters"
            register={register('password', {
              required: true,
              min: {
                value: 8,
                message: 'Your password must be at least 8 characters.',
              },
              pattern: {
                value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/i,
                message: 'Your password must mix of numbers, lowercase, and uppercase letters.',
              },
            })}
            required="true"
            title="Must be at least 8 characters with a mix of numbers, lowercase, and uppercase letters."
            type={type ? 'password' : 'text'}
            val={passwordVal}
          />
          <div className={styles.formSubmitWrapper}>
            <button type="submit" className={styles.formSubmit}>
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default UpdateEmail;
