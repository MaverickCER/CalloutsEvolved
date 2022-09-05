import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import AuthInput from './authinput';
import styles from './authform.module.css';
import { useAuth } from '../../context/AuthContext';

const UpdateDisplayName = () => {
  const { updateDisplayName, userData } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });
  const displayNameVal = useWatch({ control, name: 'displayName' });

  const onSubmit = async (data) => {
    let displayName = data.displayName.trim();
    if (displayName === '') return setError('Your new Display Name is required');
    if (displayName.toLowerCase().startsWith('anonymous '))
      return setError('Your display name cannot start with anonymous');
    if (displayName.toLowerCase().includes('maverickcer'))
      return setError('Your display name cannot contain MaverickCER');
    setError('');
    setLoading(true);

    try {
      if (displayName !== userData.displayName) {
        const res = await updateDisplayName(displayName);
      }
    } catch (error) {
      setError(`${error.message}`);
    } finally {
      reset({ displayName: '' });
      setLoading(false);
    }
  };

  return (
    <form className={`${styles.form} updateDisplayNameForm`} onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={styles.fieldset} role="guild" aria-label="Update Display Name">
        {error !== '' && <span className={styles.formTextError}>{error}</span>}
        <AuthInput
          autoComplete="off"
          error={errors.displayName}
          label="Display Name"
          name="displayName"
          placeholder="GamerName"
          register={register('displayName', {
            required: true,
            min: {
              value: 3,
              message: 'Your display name must be at least 3 characters',
            },
            max: 32,
            pattern: {
              value: /^[A-ZÅÄÖa-zåäö0-9]+$/i,
              message: 'Keyboard alphanumeric characters only',
            },
          })}
          pattern="[A-ZÅÄÖa-zåäö0-9]+"
          required="true"
          title="Must be at least 3 characters English alphanumerics only"
          type="text"
          val={displayNameVal}
        />
        <div className={styles.formSubmitWrapper}>
          <button type="submit" className={styles.formSubmit}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default UpdateDisplayName;
