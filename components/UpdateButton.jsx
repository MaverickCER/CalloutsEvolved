import React, { useEffect, useState } from 'react';
import { ref, set } from 'firebase/database';
import { useForm, useWatch } from 'react-hook-form';

import FormCheckbox from './ui/formcheckbox';
import FormInput from './ui/formInput';
import FormSelect from './ui/formselect';
import { database } from '../firebase/firebaseClient';
import defaultData from '../utils/default.json';
import styles from './auth/authform.module.css';
import { useRouter } from 'next/router';
import { useSettings } from '../context/SettingsContext';

const UpdateButton = ({ sessionButtons, setSessionButtons, savedTemplates, isSolo }) => {
  const { ahk, theme, userIsPremium } = useSettings();
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [shiftBtn, setShiftBtn] = useState(false);
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
  const color = useWatch({ control, name: 'color', defaultValue: sessionButtons[btn].color });
  const colors = useWatch({ control, name: 'colors', defaultValue: null });
  const effect = useWatch({ control, name: 'effect', defaultValue: sessionButtons[btn].effect });
  const effects = useWatch({ control, name: 'effects', defaultValue: null });
  const image = useWatch({ control, name: 'image', defaultValue: sessionButtons[btn].image });
  const images = useWatch({ control, name: 'images', defaultValue: null });
  const temp = useWatch({ control, name: 'temp', defaultValue: sessionButtons[btn].temp });
  const temps = useWatch({ control, name: 'temps', defaultValue: null });
  const text = useWatch({ control, name: 'text', defaultValue: sessionButtons[btn].text });
  const texts = useWatch({ control, name: 'texts', defaultValue: null });
  const time = useWatch({ control, name: 'time', defaultValue: sessionButtons[btn].time });
  const times = useWatch({ control, name: 'times', defaultValue: null });
  const type = useWatch({ control, name: 'type', defaultValue: sessionButtons[btn].type });
  const shiftOption = useWatch({ control, name: 'shiftOption', defaultValue: false });

  useEffect(() => {
    let j = 0;
    for (let i = 1; i < 17; i++) {
      if (j === 0) {
        if (sessionButtons[(i + 9).toString(36)].type === 'shift') {
          setShiftBtn((i + 9).toString(36));
          getShiftOptions();
          j++;
        }
      }
    }
  }, [sessionButtons]);

  useEffect(() => {
    getBtnOptions();
    getShiftOptions();
  }, [btn, sessionButtons]);

  useEffect(() => {
    if (type === sessionButtons[btn].type) {
      getBtnOptions();
      getShiftOptions();
    } else {
      if (sessionButtons[btn].type === 'shift' && type !== 'shift') {
        let j = false;
        for (let i = 1; i < 17; i++) {
          if ((i + 9).toString(36) !== btn && j === false) {
            if (sessionButtons[(i + 9).toString(36)].type === 'shift') {
              j = (i + 9).toString(36);
            }
          }
        }
        setShiftBtn(j);
      }
      if (type !== 'shift' && type !== 'template' && type !== 'timer') {
        setValue('color', 'a');
        if (shiftBtn) {
          setValue('colors', 'a');
        } else {
          setValue('colors', null);
        }
      } else {
        setValue('color', null);
        setValue('colors', null);
      }
      setValue('effect', null);
      setValue('effects', null);
      setValue('image', null);
      setValue('images', null);
      setValue('shiftOption', false);
      if (type === 'template') {
        setValue('temp', Object.keys(savedTemplates)[0]);
        if (shiftBtn) {
          setValue('temps', Object.keys(savedTemplates)[0]);
        } else {
          setValue('temps', null);
        }
      } else {
        setValue('temp', null);
        setValue('temps', null);
      }
      setValue('text', null);
      setValue('texts', null);
    }
  }, [type]);

  const submitForm = async (data) => {
    setLoading(true);
    let obj = JSON.parse(JSON.stringify(sessionButtons));
    switch (data.type) {
      case 'effect':
        if (data.color) {
          obj[btn].color = data.color;
        } else {
          obj[btn].color = 'a';
        }
        obj[btn].dura = null;
        if (data.effect) {
          obj[btn].effect = data.effect;
        } else {
          obj[btn].effect =
            'https://ia800206.us.archive.org/16/items/SilentRingtone/silence_64kb.mp3';
        }
        if (data.image) {
          obj[btn].image = data.image.trim();
        } else {
          obj[btn].image = null;
        }
        obj[btn].temp = null;
        if (data.text) {
          obj[btn].text = data.text.trim();
        } else {
          obj[btn].text = null;
        }
        if (data.time) {
          obj[btn].time = data.time;
        } else {
          obj[btn].time = 2;
        }
        obj[btn].type = data.type;
        if (shiftBtn && shiftOption && data.effects) {
          if (data.colors) {
            obj[btn].colors = data.colors;
          } else {
            obj[btn].colors = 'a';
          }
          obj[btn].effects = data.effects;
          if (data.images) {
            obj[btn].images = data.images.trim();
          } else {
            obj[btn].images = null;
          }
          obj[btn].temps = null;
          if (data.texts) {
            obj[btn].texts = data.texts.trim();
          } else {
            obj[btn].texts = null;
          }
          if (data.times) {
            obj[btn].times = data.times;
          } else {
            obj[btn].times = 2;
          }
        } else {
          obj[btn].colors = null;
          obj[btn].effects = null;
          obj[btn].images = null;
          obj[btn].temps = null;
          obj[btn].texts = null;
          obj[btn].times = null;
          obj[btn].types = null;
        }
        break;
      case 'shift':
        if (data.color) {
          obj[btn].color = data.color;
        } else {
          obj[btn].color = 'a';
        }
        obj[btn].dura = null;
        obj[btn].effect = null;
        obj[btn].image = null;
        obj[btn].temp = null;
        if (data.text) {
          obj[btn].text = data.text.trim();
        } else {
          obj[btn].text = '';
        }
        obj[btn].time = null;
        obj[btn].type = data.type;
        obj[btn].colors = null;
        obj[btn].effects = null;
        obj[btn].images = null;
        obj[btn].temps = null;
        if (data.texts) {
          obj[btn].texts = data.texts.trim();
        } else {
          obj[btn].texts = '';
        }
        if (data.times) {
          obj[btn].times = data.times;
        } else {
          obj[btn].times = 2;
        }
        break;
      case 'template':
        obj[btn].color = null;
        obj[btn].dura = null;
        obj[btn].effect = null;
        obj[btn].image = null;
        if (data.temp) {
          obj[btn].temp = data.temp;
        } else {
          obj[btn].temp = null;
        }
        if (data.text) {
          obj[btn].text = data.text.trim();
        } else {
          if (data.temp) {
            obj[btn].text = data.temp;
          } else {
            obj[btn].text = '';
          }
        }
        obj[btn].time = null;
        obj[btn].type = data.type;
        if (shiftBtn && shiftOption && data.temps) {
          obj[btn].colors = null;
          obj[btn].effects = null;
          obj[btn].images = null;
          obj[btn].temps = data.temps;
          if (data.texts) {
            obj[btn].texts = data.texts.trim();
          } else {
            obj[btn].texts = data.temps;
          }
          obj[btn].times = null;
        } else {
          obj[btn].colors = null;
          obj[btn].effects = null;
          obj[btn].images = null;
          obj[btn].temps = null;
          obj[btn].texts = null;
          obj[btn].times = null;
          obj[btn].types = null;
        }
        break;
      case 'timer':
        obj[btn].color = null;
        obj[btn].effect = null;
        if (data.image) {
          obj[btn].image = data.image.trim();
        } else {
          obj[btn].image = null;
        }
        obj[btn].temp = null;
        if (data.text) {
          obj[btn].text = data.text.trim();
        } else {
          if (data.time) {
            obj[btn].text = data.time;
          } else {
            obj[btn].text = 5;
          }
        }
        if (data.time) {
          obj[btn].dura = data.time;
          obj[btn].time = data.time;
        } else {
          obj[btn].dura = 5;
          obj[btn].time = 5;
        }
        obj[btn].type = data.type;
        if (shiftBtn && shiftOption && data.times) {
          obj[btn].colors = null;
          obj[btn].effects = null;
          if (data.images) {
            obj[btn].images = data.images.trim();
          } else {
            obj[btn].images = null;
          }
          obj[btn].temps = null;
          if (data.texts) {
            obj[btn].texts = data.texts.trim();
          } else {
            obj[btn].texts = data.times;
          }
          obj[btn].times = data.times;
        } else {
          obj[btn].colors = null;
          obj[btn].effects = null;
          obj[btn].images = null;
          obj[btn].temps = null;
          obj[btn].texts = null;
          obj[btn].times = null;
          obj[btn].types = null;
        }
        break;
      default:
        if (data.color) {
          obj[btn].color = data.color;
        } else {
          obj[btn].color = 'a';
        }
        obj[btn].dura = null;
        obj[btn].effect = null;
        if (data.image) {
          obj[btn].image = data.image.trim();
        } else {
          obj[btn].image = null;
        }
        obj[btn].temp = null;
        if (data.text) {
          obj[btn].text = data.text.trim();
        } else {
          obj[btn].text = '';
        }
        if (data.time) {
          obj[btn].time = data.time;
        } else {
          obj[btn].time = 2;
        }
        obj[btn].type = 'alert';
        if (shiftBtn && shiftOption && data.texts) {
          if (data.colors) {
            obj[btn].colors = data.colors;
          } else {
            obj[btn].colors = 'a';
          }
          obj[btn].effects = null;
          if (data.images) {
            obj[btn].images = data.images.trim();
          } else {
            obj[btn].images = null;
          }
          obj[btn].temps = null;
          obj[btn].texts = data.texts.trim();
          if (data.times) {
            obj[btn].times = data.times;
          } else {
            obj[btn].times = 2;
          }
        } else {
          obj[btn].colors = null;
          obj[btn].effects = null;
          obj[btn].images = null;
          obj[btn].temps = null;
          obj[btn].texts = null;
          obj[btn].times = null;
          obj[btn].types = null;
        }
        break;
    }
    if (JSON.stringify(obj) !== JSON.stringify(sessionButtons)) {
      if (isSolo) {
        setSessionButtons({ ...obj });
      } else {
        set(ref(database, `sessionButtons/${id}`), { ...obj });
      }
    }
    setLoading(false);
  };

  const resetForm = async () => {
    setLoading(true);
    getBtnOptions();
    getShiftOptions();
    setLoading(false);
  };

  const getBtnOptions = () => {
    switch (sessionButtons[btn].type) {
      case 'effect':
        if (sessionButtons[btn].color) {
          setValue('color', sessionButtons[btn].color);
        } else {
          setValue('color', 'a');
        }
        setValue('dura', null);
        if (sessionButtons[btn].effect) {
          setValue('effect', sessionButtons[btn].effect);
        } else {
          setValue(
            'effect',
            'https://ia800206.us.archive.org/16/items/SilentRingtone/silence_64kb.mp3'
          );
        }
        if (sessionButtons[btn].image) {
          setValue('image', sessionButtons[btn].image.trim());
        } else {
          setValue('image', null);
        }
        setValue('temp', null);
        if (sessionButtons[btn].text) {
          setValue('text', sessionButtons[btn].text.trim());
        } else {
          setValue('text', null);
        }
        if (sessionButtons[btn].time) {
          setValue('time', sessionButtons[btn].time);
        } else {
          setValue('time', 2);
        }
        setValue('type', sessionButtons[btn].type);
        break;
      case 'shift':
        if (sessionButtons[btn].color) {
          setValue('color', sessionButtons[btn].color);
        } else {
          setValue('color', 'a');
        }
        setValue('dura', null);
        setValue('effect', null);
        setValue('image', null);
        setValue('temp', null);
        if (sessionButtons[btn].text) {
          setValue('text', sessionButtons[btn].text.trim());
        } else {
          setValue('text', '');
        }
        setValue('time', null);
        setValue('type', sessionButtons[btn].type);
        setValue('colors', null);
        setValue('effects', null);
        setValue('images', null);
        setValue('temps', null);
        if (sessionButtons[btn].texts) {
          setValue('texts', sessionButtons[btn].texts.trim());
        } else {
          setValue('texts', '');
        }
        if (sessionButtons[btn].times) {
          setValue('times', sessionButtons[btn].times);
        } else {
          setValue('times', 2);
        }
        break;
      case 'template':
        setValue('color', null);
        setValue('dura', null);
        setValue('effect', null);
        setValue('image', null);
        if (sessionButtons[btn].temp) {
          setValue('temp', sessionButtons[btn].temp);
        } else {
          setValue('temp', null);
        }
        if (sessionButtons[btn].text) {
          setValue('text', sessionButtons[btn].text.trim());
        } else {
          if (sessionButtons[btn].temp) {
            setValue('text', sessionButtons[btn].temp);
          } else {
            setValue('text', '');
          }
        }
        setValue('time', null);
        setValue('type', sessionButtons[btn].type);
        break;
      case 'timer':
        setValue('color', null);
        setValue('effect', null);
        if (sessionButtons[btn].image) {
          setValue('image', sessionButtons[btn].image.trim());
        } else {
          setValue('image', null);
        }
        setValue('temp', null);
        if (sessionButtons[btn].text) {
          setValue('text', sessionButtons[btn].text.trim());
        } else {
          if (sessionButtons[btn].time) {
            setValue('text', sessionButtons[btn].time);
          } else {
            setValue('text', '5');
          }
        }
        if (sessionButtons[btn].time) {
          setValue('dura', sessionButtons[btn].time);
          setValue('time', sessionButtons[btn].time);
        } else {
          setValue('dura', 5);
          setValue('time', 5);
        }
        setValue('type', sessionButtons[btn].type);
      default:
        if (sessionButtons[btn].color) {
          setValue('color', sessionButtons[btn].color);
        } else {
          setValue('color', 'a');
        }
        setValue('dura', null);
        setValue('effect', null);
        if (sessionButtons[btn].image) {
          setValue('image', sessionButtons[btn].image.trim());
        } else {
          setValue('image', null);
        }
        setValue('temp', null);
        if (sessionButtons[btn].text) {
          setValue('text', sessionButtons[btn].text.trim());
        } else {
          setValue('text', '');
        }
        if (sessionButtons[btn].time) {
          setValue('time', sessionButtons[btn].time);
        } else {
          setValue('time', 2);
        }
        setValue('type', 'alert');
        break;
    }
  };

  const getShiftOptions = () => {
    switch (sessionButtons[btn].type) {
      case 'effect':
        if (sessionButtons[btn].effects) {
          if (sessionButtons[btn].colors) {
            setValue('colors', sessionButtons[btn].colors);
          } else {
            setValue('colors', 'a');
          }
          setValue('effects', sessionButtons[btn].effects);
          if (sessionButtons[btn].images) {
            setValue('images', sessionButtons[btn].images.trim());
          } else {
            setValue('images', null);
          }
          setValue('temps', null);
          if (sessionButtons[btn].texts) {
            setValue('texts', sessionButtons[btn].texts.trim());
          } else {
            setValue('texts', null);
          }
          if (sessionButtons[btn].times) {
            setValue('times', sessionButtons[btn].times);
          } else {
            setValue('times', 2);
          }
          setValue('shiftOption', true);
        } else {
          setValue('colors', null);
          setValue('effects', null);
          setValue('images', null);
          setValue('temps', null);
          setValue('texts', null);
          setValue('times', null);
          setValue('types', null);
          setValue('shiftOption', false);
        }
        break;
      case 'shift':
        if (sessionButtons[btn].color) {
          setValue('color', sessionButtons[btn].color);
        } else {
          setValue('color', 'a');
        }
        setValue('dura', null);
        setValue('effect', null);
        setValue('image', null);
        setValue('temp', null);
        if (sessionButtons[btn].text) {
          setValue('text', sessionButtons[btn].text.trim());
        } else {
          setValue('text', '');
        }
        setValue('time', null);
        setValue('type', sessionButtons[btn].type);
        setValue('colors', null);
        setValue('effects', null);
        setValue('images', null);
        setValue('temps', null);
        if (sessionButtons[btn].texts) {
          setValue('texts', sessionButtons[btn].texts.trim());
        } else {
          setValue('texts', '');
        }
        if (sessionButtons[btn].times) {
          setValue('times', sessionButtons[btn].times);
        } else {
          setValue('times', 2);
        }
        break;
      case 'template':
        if (sessionButtons[btn].temps) {
          setValue('colors', null);
          setValue('effects', null);
          setValue('images', null);
          setValue('temps', sessionButtons[btn].temps);
          if (sessionButtons[btn].texts) {
            setValue('texts', sessionButtons[btn].texts.trim());
          } else {
            setValue('texts', sessionButtons[btn].temps);
          }
          setValue('times', null);
          setValue('shiftOption', true);
        } else {
          setValue('colors', null);
          setValue('effects', null);
          setValue('images', null);
          setValue('temps', null);
          setValue('texts', null);
          setValue('times', null);
          setValue('types', null);
          setValue('shiftOption', false);
        }
        break;
      case 'timer':
        if (sessionButtons[btn].times) {
          setValue('colors', null);
          setValue('effects', null);
          if (sessionButtons[btn].images) {
            setValue('images', sessionButtons[btn].images.trim());
          } else {
            setValue('images', null);
          }
          setValue('temps', null);
          if (sessionButtons[btn].texts) {
            setValue('texts', sessionButtons[btn].texts.trim());
          } else {
            setValue('texts', sessionButtons[btn].times);
          }
          setValue('times', sessionButtons[btn].times);
          setValue('shiftOption', true);
        } else {
          setValue('colors', null);
          setValue('effects', null);
          setValue('images', null);
          setValue('temps', null);
          setValue('texts', null);
          setValue('times', null);
          setValue('types', null);
          setValue('shiftOption', false);
        }
        break;
      default:
        if (sessionButtons[btn].texts) {
          if (sessionButtons[btn].colors) {
            setValue('colors', sessionButtons[btn].colors);
          } else {
            setValue('colors', 'a');
          }
          setValue('effects', null);
          if (sessionButtons[btn].images) {
            setValue('images', sessionButtons[btn].images.trim());
          } else {
            setValue('images', null);
          }
          setValue('temps', null);
          setValue('texts', sessionButtons[btn].texts.trim());
          if (sessionButtons[btn].times) {
            setValue('times', sessionButtons[btn].times);
          } else {
            setValue('times', 2);
          }
          setValue('shiftOption', true);
        } else {
          setValue('colors', null);
          setValue('effects', null);
          setValue('images', null);
          setValue('temps', null);
          setValue('texts', null);
          setValue('times', null);
          setValue('types', null);
          setValue('shiftOption', false);
        }
        break;
    }
  };

  return (
    <form className={`${styles.form} updateCalloutButtonForm`} onSubmit={handleSubmit(submitForm)}>
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
          <div className={`${ahk.macroMode === 'list' ? 'touch' : ahk.macroMode}`}>
            <label>
              <b>&times;</b>
            </label>
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
        Callout Type
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', width: '100%' }}>
          <span>
            <label>
              <input
                {...register('type', { value: sessionButtons[btn].type })}
                type="radio"
                value="alert"
              />
              Alert
            </label>
          </span>
          {(userIsPremium || isSolo) && (
            <>
              <span>
                <label>
                  <input
                    {...register('type', { value: sessionButtons[btn].type })}
                    type="radio"
                    value="effect"
                  />
                  Effect
                </label>
              </span>
              <span>
                <label>
                  <input
                    {...register('type', { value: sessionButtons[btn].type })}
                    type="radio"
                    value="shift"
                  />
                  Shift
                </label>
              </span>
            </>
          )}
          {(userIsPremium || isSolo) && savedTemplates && savedTemplates !== {} && (
            <span>
              <label>
                <input
                  {...register('type', { value: sessionButtons[btn].type })}
                  type="radio"
                  value="template"
                />
                Template
              </label>
            </span>
          )}
          <span>
            <label>
              <input
                {...register('type', { value: sessionButtons[btn].type })}
                type="radio"
                value="timer"
              />
              Timer
            </label>
          </span>
        </div>
        {!shiftBtn && (
          <>
            Warning! This is the last shift button. Changing this type before setting another shift
            button will delete all shift options.
          </>
        )}
        {type !== 'timer' && type !== 'template' && (
          <>
            <label>{type === 'effect' ? 'MP3 ' : 'Callout '}Color</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', width: '100%' }}>
              <label
                style={{
                  backgroundColor: `rgb(${theme.cba})`,
                  aspectRatio: '1',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <input
                  {...register('color', { value: sessionButtons[btn].color })}
                  type="radio"
                  value="a"
                />
              </label>
              <label
                style={{
                  backgroundColor: `rgb(${theme.cbb})`,
                  aspectRatio: '1',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <input
                  {...register('color', { value: sessionButtons[btn].color })}
                  type="radio"
                  value="b"
                />
              </label>
              <label
                style={{
                  backgroundColor: `rgb(${theme.cbc})`,
                  aspectRatio: '1',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <input
                  {...register('color', { value: sessionButtons[btn].color })}
                  type="radio"
                  value="c"
                />
              </label>
              <label
                style={{
                  backgroundColor: `rgb(${theme.cbd})`,
                  aspectRatio: '1',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <input
                  {...register('color', { value: sessionButtons[btn].color })}
                  type="radio"
                  value="d"
                />
              </label>
              <label
                style={{
                  backgroundColor: `rgb(${theme.cbe})`,
                  aspectRatio: '1',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <input
                  {...register('color', { value: sessionButtons[btn].color })}
                  type="radio"
                  value="e"
                />
              </label>
              <label
                style={{
                  backgroundColor: `rgb(${theme.cbf})`,
                  aspectRatio: '1',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <input
                  {...register('color', { value: sessionButtons[btn].color })}
                  type="radio"
                  value="f"
                />
              </label>
            </div>
          </>
        )}
        <FormInput
          autoComplete="off"
          label={
            type === 'effect'
              ? 'MP3 Label'
              : type === 'shift'
              ? 'Shift Text'
              : type === 'template'
              ? 'Template Label'
              : type === 'timer'
              ? 'Timer Label'
              : 'Callout Text'
          }
          name="text"
          placeholder="Object Action Location KISS"
          register={register('text', {
            value: sessionButtons[btn].text,
          })}
          required="true"
          maxLength={80}
          title="Object Action Location Keep It Stupid Simple"
          type="text"
          val={text}
        />
        {type !== 'shift' && type !== 'template' && (
          <FormInput
            autoComplete="off"
            label={
              type === 'effect' ? 'MP3 Image' : type === 'timer' ? 'Timer Image' : 'Callout Image'
            }
            name="image"
            placeholder="https://.../image.png"
            register={register('image', {
              value: sessionButtons[btn].image,
              pattern: /^(https?):\/\/(www.)?(.*?)\.(png|jpg)$/i,
            })}
            required="false"
            maxLength={240}
            title="Input link to png file to be displayed."
            type="url"
            val={image}
          />
        )}
        {type === 'template' && (
          <>
            {savedTemplates && savedTemplates !== {} ? (
              sessionButtons[btn].temp ? (
                <FormSelect
                  autoComplete="off"
                  label="Template"
                  name="template"
                  placeholder="Select a Template"
                  title="Select a Template"
                  register={register('temp', {
                    value: sessionButtons[btn].temp,
                  })}>
                  {Object.keys(savedTemplates).map((v, i) => (
                    <option key={i} value={v}>
                      {v}
                    </option>
                  ))}
                </FormSelect>
              ) : (
                <FormSelect
                  autoComplete="off"
                  label="Template"
                  name="template"
                  placeholder="Select a Template"
                  title="Select a Template"
                  register={register('temp', {
                    value: Object.keys(savedTemplates)[0],
                  })}>
                  {Object.keys(savedTemplates).map((v, i) => (
                    <option key={i} value={v}>
                      {v}
                    </option>
                  ))}
                </FormSelect>
              )
            ) : (
              <>
                <p>Please save a template first</p>
              </>
            )}
          </>
        )}
        {type === 'effect' && (
          <FormInput
            autoComplete="off"
            error={errors.effect}
            label="MP3 URL Link"
            name="effect"
            placeholder="https://.../sound.mp3"
            register={register('effect', {
              required: 'Required: https://www.../mp3 link',
              value: sessionButtons[btn].effect,
              pattern: /^(https?):\/\/(www.)?(.*?)\.(mp3)$/i,
            })}
            maxLength={240}
            required="true"
            title="Input link to mp3 file to be played."
            type="url"
            val={effect}
          />
        )}
        {type !== 'template' && type !== 'shift' && (
          <FormInput
            autoComplete="off"
            error={errors.time}
            label={
              type === 'timer'
                ? 'Timer Duration'
                : type === 'effect'
                ? 'MP3 Duration'
                : 'Callout Duration'
            }
            name="time"
            placeholder={type === 'effect' ? 'Length of MP3' : 'Time in seconds'}
            register={register('time', {
              required: 'Required: Time in seconds',
              value: sessionButtons[btn].time,
            })}
            required="true"
            maxLength={3}
            title="Total time of callout in seconds"
            type="number"
            val={time ? time.toString() : '2'}
          />
        )}
        {shiftBtn && type !== 'shift' && (
          <>
            <FormCheckbox
              autoComplete="off"
              error={errors.shiftOption}
              label="Shift Option"
              name="shiftOption"
              placeholder="Enable users to join without an account."
              required="true"
              register={register('shiftOption')}
              title="Enable users to join without an account."
              type="checkbox"
              val={shiftOption}
              valTrue="Enabled"
              valFalse="Disabled"
            />
          </>
        )}
        {(type === 'shift' || (shiftBtn && shiftOption)) && (
          <>
            {type !== 'timer' && type !== 'template' && type !== 'shift' && (
              <>
                <label>{type === 'effect' ? 'Shift MP3 ' : 'Shift '}Color</label>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    width: '100%',
                  }}>
                  <label
                    style={{
                      backgroundColor: `rgb(${theme.cba})`,
                      aspectRatio: '1',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <input
                      {...register('colors', { value: sessionButtons[btn].colors })}
                      type="radio"
                      value="a"
                    />
                  </label>
                  <label
                    style={{
                      backgroundColor: `rgb(${theme.cbb})`,
                      aspectRatio: '1',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <input
                      {...register('colors', { value: sessionButtons[btn].colors })}
                      type="radio"
                      value="b"
                    />
                  </label>
                  <label
                    style={{
                      backgroundColor: `rgb(${theme.cbc})`,
                      aspectRatio: '1',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <input
                      {...register('colors', { value: sessionButtons[btn].colors })}
                      type="radio"
                      value="c"
                    />
                  </label>
                  <label
                    style={{
                      backgroundColor: `rgb(${theme.cbd})`,
                      aspectRatio: '1',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <input
                      {...register('colors', { value: sessionButtons[btn].colors })}
                      type="radio"
                      value="d"
                    />
                  </label>
                  <label
                    style={{
                      backgroundColor: `rgb(${theme.cbe})`,
                      aspectRatio: '1',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <input
                      {...register('colors', { value: sessionButtons[btn].colors })}
                      type="radio"
                      value="e"
                    />
                  </label>
                  <label
                    style={{
                      backgroundColor: `rgb(${theme.cbf})`,
                      aspectRatio: '1',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <input
                      {...register('colors', { value: sessionButtons[btn].colors })}
                      type="radio"
                      value="f"
                    />
                  </label>
                </div>
              </>
            )}
            <FormInput
              autoComplete="off"
              label={
                type === 'effect'
                  ? 'Shift MP3 Label'
                  : type === 'shift'
                  ? 'Unshift Text'
                  : type === 'template'
                  ? 'Shift Template Label'
                  : type === 'timer'
                  ? 'Shift Timer Label'
                  : 'Shift Text'
              }
              name="texts"
              placeholder="Object Action Location KISS"
              register={register('texts', {
                value: sessionButtons[btn].texts,
              })}
              required="true"
              maxLength={80}
              title="Object Action Location Keep It Stupid Simple"
              type="text"
              val={texts}
            />
            {type !== 'shift' && type !== 'template' && (
              <FormInput
                autoComplete="off"
                label={
                  type === 'effect'
                    ? 'Shift MP3 Image'
                    : type === 'timer'
                    ? 'Shift Timer Image'
                    : 'Shift Image'
                }
                name="images"
                placeholder="https://.../image.png"
                register={register('images', {
                  value: sessionButtons[btn].images,
                  pattern: /^(https?):\/\/(www.)?(.*?)\.(png|jpg)$/i,
                })}
                required="false"
                maxLength={240}
                title="Input link to png file to be displayed."
                type="url"
                val={images}
              />
            )}
            {type === 'template' && (
              <>
                {savedTemplates && savedTemplates !== {} ? (
                  sessionButtons[btn].temp ? (
                    <FormSelect
                      autoComplete="off"
                      label="Shift Template"
                      name="temps"
                      placeholder="Select a Template"
                      title="Select a Template"
                      register={register('temps', {
                        value: sessionButtons[btn].temps,
                      })}>
                      {Object.keys(savedTemplates).map((v, i) => (
                        <option key={i} value={v}>
                          {v}
                        </option>
                      ))}
                    </FormSelect>
                  ) : (
                    <FormSelect
                      autoComplete="off"
                      label="Shift Template"
                      name="temps"
                      placeholder="Select a Template"
                      title="Select a Template"
                      register={register('temps', {
                        value: Object.keys(savedTemplates)[0],
                      })}>
                      {Object.keys(savedTemplates).map((v, i) => (
                        <option key={i} value={v}>
                          {v}
                        </option>
                      ))}
                    </FormSelect>
                  )
                ) : (
                  <>
                    <p>Please save a template first</p>
                  </>
                )}
              </>
            )}
            {type === 'effect' && (
              <FormInput
                autoComplete="off"
                error={errors.effects}
                label="Shift MP3 URL Link"
                name="effects"
                placeholder="https://.../sound.mp3"
                register={register('effects', {
                  value: sessionButtons[btn].effects,
                  pattern: /^(https?):\/\/(www.)?(.*?)\.(mp3)$/i,
                })}
                required="false"
                maxLength={240}
                title="Input link to mp3 file to be played."
                type="url"
                val={effects}
              />
            )}
            {type !== 'template' && (
              <FormInput
                autoComplete="off"
                error={errors.times}
                label={
                  type === 'timer'
                    ? 'Shift Timer Duration'
                    : type === 'effect'
                    ? 'Shift MP3 Duration'
                    : 'Shift Duration'
                }
                name="times"
                placeholder={type === 'effect' ? 'Length of MP3' : 'Time in seconds'}
                register={register('times', {
                  value: sessionButtons[btn].times,
                })}
                required="false"
                maxLength={3}
                title="Total time of callout in seconds"
                type="number"
                val={times ? times.toString() : '2'}
              />
            )}
          </>
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
      </fieldset>
    </form>
  );
};

export default UpdateButton;
