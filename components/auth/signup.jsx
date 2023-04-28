import React, { useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import AuthCeckbox from './authcheckbox';
import AuthInput from './authinput';
import AuthSubmit from './authsubmit';
import styles from './authform.module.css';
import { useAuth } from '../../context/AuthContext';

const SignUp = ({ callback }) => {
  const btnRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [type, setType] = useState(true);
  const [loading, setLoading] = useState(false);
  const [agreeTOS, setAgreeTOS] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });
  const displayNameVal = useWatch({ control, name: 'displayName' });
  const emailVal = useWatch({ control, name: 'email' });
  const passwordVal = useWatch({ control, name: 'password' });

  const onSubmit = async (data) => {
    let displayName = data.displayName.trim();
    let email = data.email.replace(/\s+/g, '').toLowerCase();
    let password = data.password;

    if (displayName === '') return setError('Your display name is required');
    if (displayName.toLowerCase().startsWith('anonymous '))
      return setError('Your display name cannot start with anonymous');
    if (displayName.toLowerCase().includes('maverickcer'))
      return setError('Your display name cannot contain MaverickCER');
    if (email === '') return setError('Your email is required');
    if (password === '') return setError('Your password is required');
    setError('');
    setLoading(true);

    try {
      const res = await signup(email, password, displayName);
      if (res && callback) {
        callback();
      }
    } catch (error) {
      if (error.message === 'Firebase: Error (auth/invalid-email).') {
        setError('Your email is invalid');
      } else if (error.message === 'Firebase: Error (auth/internal-error).') {
        setError(`Internal Error ${error.message}`);
      } else if (error.message === 'Firebase: Error (auth/email-already-exists).') {
        setError('email already exists. Please try a different email address');
      } else {
        setError(`${error.message}`);
      }
    }
    setLoading(false);
  };

  return (
    <form className={`${styles.form} signUpForm`} onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={styles.fieldset} role="guild" aria-label="Sign Up">
        {error !== '' && <span className={styles.formTextError}>{error}</span>}
        <AuthInput
          autoComplete="nickname"
          error={errors.displayName}
          label="Display Name"
          name="displayName"
          placeholder="GamerName"
          register={register('displayName', {
            required: true,
            required: true,
            min: {
              value: 3,
              message: 'Your display name must be at least 3 characters',
            },
            max: 32,
            pattern: {
              value: /^[\w\s]+$/i,
              message: 'English alphanumeric characters only',
            },
          })}
          required="true"
          title="Must be at least 3 characters English alphanumerics only"
          type="text"
          val={displayNameVal}
        />
        <AuthInput
          autoComplete="email"
          error={errors.email}
          label="Email"
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
          autoComplete="password"
          btn="i"
          btnAction={() => {
            setType(!type);
          }}
          error={errors.password}
          label="Password"
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
        <AuthCeckbox
          labelTrue={<>&#9745; I agree to Terms and Policy</>}
          labelFalse={<>&#9744; I agree to Terms and Policy</>}
          setValue={setAgreeTOS}
          value={agreeTOS}
        />
        <div className={styles.formSubmitWrapper}>
          <AuthSubmit loading={loading} ref={btnRef} />
          <button type="submit" ref={btnRef} style={{ display: 'none' }} />
        </div>
      </fieldset>
    </form>
  );
};

export default SignUp;
