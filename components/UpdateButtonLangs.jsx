import React, { useEffect, useState } from 'react';
import { ref, set } from 'firebase/database';
import { useForm, useWatch } from 'react-hook-form';

import FormCheckbox from './ui/formcheckbox';
import FormInput from './ui/formInput';
import { PayPalButton } from 'react-paypal-button-v2';
import { database } from '../firebase/firebaseClient';
import defaultData from '../utils/default.json';
import styles from './auth/authform.module.css';
import { useRouter } from 'next/router';
import { useSettings } from '../context/SettingsContext';

const UpdateButton = ({ sessionButtons, setSessionButtons, savedTemplates, isSolo, lang }) => {
  const { audio, ahk, theme } = useSettings();
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(null);
  const [texts, setTexts] = useState(null);
  const [total, setTotal] = useState(0);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });
  const btn = useWatch({ control, name: 'btn', defaultValue: 'a' });
  const newText = useWatch({
    control,
    name: 'newText',
    defaultValue: sessionButtons[btn]['text' + audio.lang],
  });
  const newTexts = useWatch({
    control,
    name: 'newTexts',
    defaultValue: sessionButtons[btn]['texts' + audio.lang],
  });

  useEffect(() => {
    let num = 0;
    for (const [key, val] of sessionButtons) {
      if (val['text' + lang] && !val['text' + audio.lang]) {
        num = num + val['text' + audio.lang].length + 1;
      }
      if (val['texts' + lang] && !val['texts' + audio.lang]) {
        num = num + val['texts' + audio.lang].length + 1;
      }
    }
    setTotal(num);
    getOptions();
  }, [btn, sessionButtons]);

  const submitForm = async (data) => {
    setLoading(true);
    let obj = JSON.parse(JSON.stringify(sessionButtons));
    if (newText && newText !== '') {
      obj[btn]['text' + audio.lang] = newText;
    } else {
      obj[btn]['text' + audio.lang] = null;
    }
    if (newTexts && newTexts !== '') {
      obj[btn]['texts' + audio.lang] = newTexts;
    } else {
      obj[btn]['texts' + audio.lang] = null;
    }
    if (JSON.stringify(obj) !== JSON.stringify(sessionButtons)) {
      set(ref(database, `sessionButtons/${id}`), { ...obj });
    }
    setLoading(false);
  };

  const resetForm = async () => {
    setLoading(true);
    getOptions();
    setLoading(false);
  };

  const getOptions = () => {
    if (sessionButtons[btn]['text' + lang]) {
      setText(sessionButtons[btn]['text' + lang]);
    } else {
      setText('text', null);
    }
    if (sessionButtons[btn]['texts' + lang]) {
      setTexts(sessionButtons[btn]['texts' + lang]);
    } else {
      setTexts('texts', null);
    }
    if (sessionButtons[btn]['text' + audio.lang]) {
      setValue('newText', sessionButtons[btn]['text' + audio.lang]);
    } else {
      setValue('newText', null);
    }
    if (sessionButtons[btn]['texts' + audio.lang]) {
      setValue('newTexts', sessionButtons[btn]['texts' + audio.lang]);
    } else {
      setValue('newTexts', null);
    }
  };

  return (
    <>
      <form
        className={`${styles.form} updateCalloutButtonForm`}
        onSubmit={handleSubmit(submitForm)}>
        <fieldset
          className={styles.fieldset}
          role="guild"
          aria-label={`Update callout button ${btn}`}>
          <div>Legend</div>
          <div>
            {ahk.macroMode.charAt(0).toUpperCase() + ahk.macroMode.slice(1)}:{' '}
            {defaultData.keys[btn][ahk.macroMode]}
          </div>
          {ahk.macroMode !== 'keyboard' && <div>Keyboard: {defaultData.keys[btn].keyboard}</div>}
          {ahk.macroMode !== 'list' && <div>List: {defaultData.keys[btn].list}</div>}
          {ahk.macroMode !== 'number' && <div>Numberpad: {defaultData.keys[btn].numberpad}</div>}
          {ahk.macroMode !== 'touch' && <div>Touch: {defaultData.keys[btn].touch}</div>}
          <br />
          <div style={{ width: '100%', height: '270px', position: 'relative' }}>
            <div className={`${ahk.macroMode}`}>
              <button>
                <b>{total}</b>
              </button>
              {Object.entries(defaultData.keys).map(([key, data]) => (
                <label
                  key={key}
                  style={{
                    backgroundColor: key === btn ? `rgb(${theme.bbc})` : 'transparent',
                    color: key === btn ? `rgb(${theme.bcc})` : `rgb(${theme.mca})`,
                  }}>
                  <input {...register('btn', { value: btn })} type="radio" value={key} />
                  <div>
                    {data[ahk.macroMode]}
                    {key === btn ? '*' : ''}
                  </div>
                </label>
              ))}
            </div>
          </div>
          {`Translate from ${lang} to ${audio.lang}:`}
          <br />
          {text || texts ? (
            <>
              {text && (
                <FormInput
                  autoComplete="off"
                  label={text}
                  name="newText"
                  placeholder="Object Action Location KISS"
                  register={register('newText', {
                    value: sessionButtons[btn]['text' + audio.lang],
                  })}
                  required="true"
                  maxLength={80}
                  title="Object Action Location Keep It Stupid Simple"
                  type="text"
                  val={newText}
                />
              )}
              {texts && (
                <FormInput
                  autoComplete="off"
                  label={texts}
                  name="newTexts"
                  placeholder="Object Action Location KISS"
                  register={register('newTexts', {
                    value: sessionButtons[btn]['texts' + audio.lang],
                  })}
                  required="true"
                  maxLength={80}
                  title="Object Action Location Keep It Stupid Simple"
                  type="text"
                  val={newTexts}
                />
              )}
              <div className={styles.formSubmitWrapper}>
                <button type="submit" className={styles.formSubmit}>
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
                <button
                  type="button"
                  className={styles.formSubmit}
                  onClick={() => {
                    resetForm();
                  }}>
                  {loading ? 'Resetting...' : 'Reset'}
                </button>
              </div>
            </>
          ) : (
            <>!</>
          )}
        </fieldset>
      </form>
      <form
        className={`${styles.form} updateCalloutButtonForm`}
        onSubmit={handleSubmit(submitForm)}>
        <fieldset
          className={styles.fieldset}
          role="guild"
          aria-label={`Update callout button ${btn}`}>
          {touAgree ? (
            <>
              <PayPalButton
                amount={
                  Math.ceil((getChar / 50000 + 0.5 + (getChar / 50000 + 0.5) * 0.06) * 100) / 100
                }
                shippingPreference="NO_SHIPPING"
                style={{ color: theme.mod === 'light' ? 'white' : 'black' }}
                onApprove={async (details, data) => {
                  let updates = {};
                  if (currentUser) {
                    get(child(ref(database), `userData/${currentUser.uid}/sessionId`)).then(
                      (DataSnapshot) => {
                        if (DataSnapshot.exists()) {
                          if (DataSnapshot.val() && DataSnapshot.val() !== '') {
                            updates[`userData/${currentUser.uid}/title`] = 'Donator';
                            updates[`userData/${currentUser.uid}/char`] = getChar;
                            updates[
                              `sessionLists/${DataSnapshot.val()}/whitelist/${currentUser.uid}`
                            ] = 'Donator';
                            update(ref(database), updates).then(() => {
                              setValue(touAgree, false);
                            });
                          }
                        }
                      }
                    );
                  } else {
                    setShow(true);
                  }
                }}
                options={{
                  clientId:
                    'AZzZJns5CjnuIgWxB6ExeKo73EzpDQgTtskAfUBJMgYq5e242WlxvloneLUvGOi6LBTbGzP1RBnvBBWg',
                  disableFunding: 'credit',
                  enableFunding: 'venmo',
                }}
              />
            </>
          ) : (
            <>
              <FormInput
                autoComplete="off"
                label="Get more translation characters"
                name="getChar"
                placeholder="~20000 char / activity"
                register={register('getChar', {
                  value: 20000,
                })}
                required="true"
                maxLength={80}
                title="You can always get more, start small"
                type="number"
                tag={
                  Math.ceil((getChar / 50000 + 0.5 + (getChar / 50000 + 0.5) * 0.05) * 100) / 100
                }
                step={500}
                min={500}
                max={500000}
                val={getChar}
              />
              <FormCheckbox
                autoComplete="off"
                error={errors.touAgree}
                label="Terms of Use"
                name="touAgree"
                required="true"
                register={register('touAgree')}
                type="checkbox"
                val={touAgree}
                valTrue="I agree to below notice"
                valFalse="I disagree with the below notice"
              />
            </>
          )}

          <div>
            NOTICE: Translation characters are non-refundable and attached to this account only.{' '}
            {currentUser.isAnonymous && (
              <>
                As an anonymous user, your account, along with all purchased characters will be
                deleted when you leave or get disconnected from this session. Consider creating an
                account to keep translation credits for future use.
              </>
            )}
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default UpdateButton;
