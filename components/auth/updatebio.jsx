import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import FormInput from '../ui/formInput';
import { database } from '../../firebase/firebaseClient';
import styles from './authform.module.css';
import { update } from 'firebase/database';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';

const UpdateBio = () => {
  const { userData } = useAuth();
  const { userIsPremium } = useSettings();
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
  const bioVal = useWatch({ control, name: 'bio' });

  const onSubmit = async (data) => {
    let bio = data.bio.trim();
    setError('');
    setLoading(true);

    try {
      let updates = {};
      if (bio === '') {
        updates[`userData/${userData.userId}/bio`] = null;
      } else {
        updates[`userData/${userData.userId}/bio`] = bio;
      }
      update(ref(database), updates);
    } catch (error) {
      setError(`${error.message}`);
    } finally {
      reset({ bio: '' });
      setLoading(false);
    }
  };

  return (
    <form className={`${styles.form} updateDisplayNameForm`} onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={styles.fieldset} role="guild" aria-label="Update Display Name">
        {error !== '' && <span className={styles.formTextError}>{error}</span>}
        <FormInput
          autoComplete="off"
          error={errors.bio}
          label="Biography"
          name="bio"
          placeholder="Summarize your life as a gamer"
          register={register('bio')}
          required="false"
          maxLength={userIsPremium ? 320 : 160}
          title="What do you want others to know about you?"
          type="text"
          val={bioVal}
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

export default UpdateBio;
