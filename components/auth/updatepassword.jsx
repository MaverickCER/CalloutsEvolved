import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import AuthInput from './authinput';
import styles from './authform.module.css';
import { useAuth } from '../../context/AuthContext';

const UpdatePassword = () => {
  const { updateUserPassword } = useAuth();
  const [error, setError] = useState('');
  const [type, setType] = useState(true);
  const [typeOld, setTypeOld] = useState(true);
  const [loading, setLoading] = useState(false);
  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const passwordOldVal = useWatch({ control, name: 'passwordOld' });
  const passwordNewVal = useWatch({ control, name: 'passwordNew' });

  const onSubmit = async (data) => {
    let passwordOld = data.passwordOld;
    let passwordNew = data.passwordNew;

    if (passwordOld === '') return setError('Your old password is required');
    if (passwordNew === '') return setError('Your new password is required');
    setError('');
    setLoading(true);

    try {
      const res = await updateUserPassword(passwordOld, passwordNew);
    } catch (error) {
      if (
        error.message === 'Firebase: Error (auth/wrong-password).' ||
        error.message ===
          'Firebase: Error (auth/invalid-value-(password),-starting-an-object-on-a-scalar-field).'
      ) {
        setError('Wrong Old password');
      } else {
        setError(`${error.message}`);
      }
    } finally {
      reset({ passwordOld: '', passwordNew: '' });
      setLoading(false);
    }
  };

  return (
    <>
      <form className={`${styles.form} updatePasswordForm`} onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={styles.fieldset} role="guild" aria-label="Update Password">
          {error !== '' && <span className={styles.formTextError}>{error}</span>}
          <AuthInput
            autoComplete="off"
            btn="i"
            btnAction={() => {
              setTypeOld(!typeOld);
            }}
            error={errors.passwordOld}
            label="Old Password"
            name="passwordOld"
            placeholder="PassW0rd 8+ characters"
            register={register('passwordOld', {
              required: true,
              min: {
                value: 8,
                message: 'Your old password must be at least 8 characters.',
              },
              pattern: {
                value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/i,
                message: 'Your old password must mix of numbers, lowercase, and uppercase letters.',
              },
            })}
            required="true"
            title="Must be at least 8 characters with a mix of numbers, lowercase, and uppercase letters."
            type={typeOld ? 'password' : 'text'}
            val={passwordOldVal}
          />
          <AuthInput
            autoComplete="off"
            btn="i"
            btnAction={() => {
              setType(!type);
            }}
            error={errors.passwordNew}
            label="New Password"
            name="passwordNew"
            placeholder="PassW0rd 8+ characters"
            register={register('passwordNew', {
              required: true,
              min: {
                value: 8,
                message: 'Your new password must be at least 8 characters.',
              },
              pattern: {
                value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/i,
                message: 'Your new password must mix of numbers, lowercase, and uppercase letters.',
              },
            })}
            required="true"
            title="Must be at least 8 characters with a mix of numbers, lowercase, and uppercase letters."
            type={type ? 'password' : 'text'}
            val={passwordNewVal}
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

export default UpdatePassword;
