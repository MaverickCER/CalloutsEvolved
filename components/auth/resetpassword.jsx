import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import AuthInput from './authinput';
import styles from './authform.module.css';
import { useAuth } from '../../context/AuthContext';

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });
  const emailVal = useWatch({ control, name: 'email' });

  const onSubmit = async (data) => {
    let email = data.email.replace(/\s+/g, '').toLowerCase();
    if (email === '') return setError('Your email is required');
    setError('');
    setLoading(true);

    try {
      const res = await resetPassword(email);
    } catch (error) {
      if (error.message === 'Firebase: Error (auth/user-not-found).') {
        setError('No account for this email');
      } else if (error.message === 'Firebase: Error (auth/invalid-email).') {
        setError('No account for this email');
      } else {
        setError(`Error: ${error.message}`);
      }
      return setLoading(false);
    }
    setLoading(false);
    setSent(true);
  };

  return (
    <form className={`${styles.form} resetPasswordForm`} onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={styles.fieldset} role="guild" aria-label="Reset Password">
        {error !== '' && <span className={styles.formTextError}>{error}</span>}
        {sent && <span className={styles.formTextMessage}>Please check your email!</span>}
        <AuthInput
          autoComplete="email"
          error={errors.email}
          first={true}
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
        <div className={styles.formSubmitWrapper}>
          <button type="submit" className={styles.formSubmit} disabled={sent}>
            {loading ? 'Loading...' : sent ? 'Sent!' : 'Submit'}
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default ResetPassword;
