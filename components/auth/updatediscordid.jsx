import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import FormInput from '../ui/formInput';
import { database } from '../../firebase/firebaseClient';
import styles from './authform.module.css';
import { update } from 'firebase/database';
import { useAuth } from '../../context/AuthContext';

const UpdateDiscordId = () => {
  const { currentUser } = useAuth();
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
  const discordIdVal = useWatch({ control, name: 'discordId' });

  const onSubmit = async (data) => {
    let discordId = data.discordId.trim();
    setError('');
    setLoading(true);

    try {
      if (discordId === '') {
        let updates = {};
        updates[`userData/${currentUser.uid}/discordId`] = discordId;
        update(ref(database), updates);
      }
    } catch (error) {
      setError(`${error.message}`);
    } finally {
      reset({ discordId: '' });
      setLoading(false);
    }
  };

  return (
    <form className={`${styles.form} updateDisplayNameForm`} onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={styles.fieldset} role="guild" aria-label="Update Display Name">
        {error !== '' && <span className={styles.formTextError}>{error}</span>}
        <FormInput
          autoComplete="off"
          error={errors.discordId}
          label="discordIdgraphy"
          name="discordId"
          placeholder="Summarize your life as a gamer"
          register={register('discordId', {
            required: true,
          })}
          required="true"
          maxLength={userIsPremium ? 960 : 240}
          title="What do you want others to know about you?"
          type="text"
          val={discordIdVal}
        />
        <div className={styles.formSubmitWrapper}>
          <button type="submit" className={styles.formSubmit}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </fieldset>
      {!userIsPremium && <p>Become an MVP to get 4x the character limit!</p>}
    </form>
  );
};

export default UpdateDiscordId;
