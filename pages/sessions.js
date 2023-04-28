import React, { useEffect, useRef, useState } from 'react';

import CrossPlatformIcon from '../assets/CrossPlatformIcon';
import Head from 'next/head';
import Image from 'next/image';
import Input from '../components/ui/input';
import ManageSub from '../components/ManageSub';
import NintendoIcon from '../assets/NintendoIcon';
import OfflineBtn from '../components/offlineBtn';
import OfflineChat from '../components/offlineChat';
import OtherPlatformIcon from '../assets/OtherPlatformIcon';
import PlayStationIcon from '../assets/PlayStationIcon';
import Select from '../components/ui/select';
import SteamIcon from '../assets/SteamIcon';
import UpdateButton from '../components/UpdateButton';
import UserCaptions from '../components/UserCaptions';
import XboxIcon from '../assets/XboxIcon';
import defaultData from '../utils/default.json';
import jsonData from '../utils/templateData.json';
import { useAuth } from '../context/AuthContext';
import useKeydown from '../utils/useKeypress';
import { useSettings } from '../context/SettingsContext';

const Sessions = () => {
  const isSolo = true;
  const calloutGrid = useRef(null);
  const effect = useRef({});
  const timer = useRef({});
  const { userData } = useAuth();
  const { audio, theme, ahk, speak, synth } = useSettings();
  const [history, setHistory] = useState([]);
  const [isShift, setIsShift] = useState(false);
  const [portrait, setPortrait] = useState();
  const [loading, setLoading] = useState('');
  const [savedTemplates, setSavedTemplates] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState('LW 5 Riven');
  const [sessionActions, setSessionActions] = useState(defaultData.actions);
  const [sessionButtons, setSessionButtons] = useState(defaultData.buttons);
  const [templateName, setTemplateName] = useState('');
  const sessionData = {
    activity: 'Any Activity',
    description: 'Communication Solutions',
    game: 'Any Game',
    isDeaf: false,
    isOpen: false,
    isPublic: false,
    lang: audio.sttDialect.split('-')[0],
    platform: 'other',
    sessionPhotoURL: 'https://static-cdn.jtvnw.net/ttv-boxart/498566-144x192.jpg',
    timestamp: Date.now(),
    usersCount: 1,
    usersMax: 1,
  };

  useKeydown(
    [
      'NumpadDivide',
      'Digit7',
      'NumpadMultiply',
      'Digit8',
      'NumpadSubtract',
      'Digit9',
      'Numpad7',
      'KeyY',
      'Numpad8',
      'KeyU',
      'Numpad9',
      'KeyI',
      'KeyO',
      'NumpadAdd',
      'KeyL',
      'Numpad4',
      'KeyH',
      'Numpad5',
      'KeyJ',
      'Numpad6',
      'KeyK',
      'Numpad1',
      'KeyN',
      'Numpad2',
      'KeyM',
      'Numpad3',
      'Comma',
      'NumpadEnter',
      'Period',
      'Numpad0',
      'Space',
      'AltRight',
      'NumpadDecimal',
    ],
    (event) => {
      if (ahk.macroMode === 'keyboard') {
        switch (event.code) {
          case 'Digit7': // 7
            triggerAction('a', isShift);
            break;
          case 'Digit8': // 8
            triggerAction('b', isShift);
            break;
          case 'Digit9': // 9
            triggerAction('c', isShift);
            break;
          case 'KeyO': // O
            triggerAction('c', isShift);
            break;
          case 'KeyY': // Y
            triggerAction('d', isShift);
            break;
          case 'KeyU': // U
            triggerAction('e', isShift);
            break;
          case 'KeyI': // I
            triggerAction('f', isShift);
            break;
          case 'KeyL': // L
            triggerAction('g', isShift);
            break;
          case 'KeyH': // H
            triggerAction('h', isShift);
            break;
          case 'KeyJ': // J
            triggerAction('i', isShift);
            break;
          case 'KeyK': // K
            triggerAction('j', isShift);
            break;
          case 'KeyN': // N
            triggerAction('k', isShift);
            break;
          case 'KeyM': // M
            triggerAction('l', isShift);
            break;
          case 'Comma': // ,<
            triggerAction('m', isShift);
            break;
          case 'Period': // .>
            triggerAction('n', isShift);
            break;
          case 'Space': // spacebar
            triggerAction('o', isShift);
            break;
          case 'AltRight': // right alt
            triggerAction('p', isShift);
            break;
          default:
            break;
        }
      } else if (ahk.macroMode === 'numberpad') {
        switch (event.code) {
          case 'NumpadDivide': // /
            triggerAction('a', isShift);
            break;
          case 'NumpadMultiply': // *
            triggerAction('b', isShift);
            break;
          case 'NumpadSubtract': // -
            triggerAction('c', isShift);
            break;
          case 'Numpad7': // 7
            triggerAction('d', isShift);
            break;
          case 'Numpad8': // 8
            triggerAction('e', isShift);
            break;
          case 'Numpad9': // 9
            triggerAction('f', isShift);
            break;
          case 'NumpadAdd': // +
            triggerAction('g', isShift);
            break;
          case 'Numpad4': // 4
            triggerAction('h', isShift);
            break;
          case 'Numpad5': // 5
            triggerAction('i', isShift);
            break;
          case 'Numpad6': // 6
            triggerAction('j', isShift);
            break;
          case 'Numpad1': // 1
            triggerAction('k', isShift);
            break;
          case 'Numpad2': // 2
            triggerAction('l', isShift);
            break;
          case 'Numpad3': // 3
            triggerAction('m', isShift);
            break;
          case 'NumpadEnter':
            triggerAction('n', isShift);
            break;
          case 'Numpad0': // 0
            triggerAction('o', isShift);
            break;
          case 'NumpadDecimal': // .
            triggerAction('p', isShift);
            break;
          default:
            break;
        }
      }
    }
  );

  const exportButtons = () => {
    let dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(sessionButtons));
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'callouts-evolved-template.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const createTemplate = () => {
    if (templateName) {
      setLoading(true);
      let obj = {
        ...savedTemplates,
        [templateName]: { ...sessionButtons },
      };
      localStorage.setItem('ce-session-templates', JSON.stringify(obj));
      setSavedTemplates({ ...obj });
      setSelectedTemplate(templateName);
      setTemplateName('');
      setLoading(false);
    }
  };

  const updateTemplate = () => {
    let obj = {
      ...savedTemplates,
      [selectedTemplate]: { ...sessionButtons },
    };
    localStorage.setItem('ce-session-templates', JSON.stringify(obj));
    setSavedTemplates({ ...obj });
  };

  const deleteTemplate = () => {
    let obj = Object.fromEntries(
      Object.entries(savedTemplates).filter(([key]) => key !== selectedTemplate)
    );
    localStorage.setItem('ce-session-templates', JSON.stringify(obj));
    setSavedTemplates({ ...obj });
  };

  const onReaderLoad = (event, fileName) => {
    let template = JSON.parse(event.target.result);
    console.error({ ...template }, fileName);
    let keys = Object.keys(template);
    let invalidKeys = keys.filter(
      (x) =>
        x !== 'a' &&
        x !== 'b' &&
        x !== 'c' &&
        x !== 'd' &&
        x !== 'e' &&
        x !== 'f' &&
        x !== 'g' &&
        x !== 'h' &&
        x !== 'i' &&
        x !== 'j' &&
        x !== 'k' &&
        x !== 'l' &&
        x !== 'm' &&
        x !== 'n' &&
        x !== 'o' &&
        x !== 'p'
    );
    if (invalidKeys.length > 0) return alert('Invalid file!');
    setSessionButtons({ ...template });
    let obj = {
      ...savedTemplates,
      [fileName]: { ...template },
    };
    setSavedTemplates({ ...obj });
    localStorage.setItem('ce-session-templates', JSON.stringify(obj));
  };

  const handleImport = (event) => {
    let name = event.target.files[0].name.slice(0, -5);
    let reader = new FileReader();
    reader.onload = (e) => onReaderLoad(e, name);
    reader.readAsText(event.target.files[0]);
  };

  const triggerAction = (btn, shift, auto) => {
    clearTimeout(timer.current[btn]);
    effect.current[btn]?.pause();
    let duration,
      actionObj = sessionActions;
    if (sessionButtons[btn].type === 'shift' && isShift === false) {
      setIsShift(true);
      let timer = setTimeout(() => {
        setIsShift(false);
      }, sessionButtons[btn].times * 1000);
      return () => {
        clearTimeout(timer);
      };
    } else if (sessionButtons[btn].type === 'shift' && isShift === true) {
      setIsShift(false);
    } else {
      if (auto) {
        if (sessionButtons[btn].type === 'timer' && sessionActions[btn].dura > 0) {
          actionObj[btn].dura = sessionActions[btn].dura - 1;
          duration = 1000;
          timer.current[btn] = setTimeout(() => {
            triggerAction(btn, shift, true);
          }, duration);
          if (audio.ttsCalloutsI || audio.ttsCalloutsO) {
            if (sessionActions[btn]?.dura === 10) {
              speak(sessionActions[btn]?.dura, 2.6, true);
            } else if (sessionActions[btn]?.dura > 3 && sessionActions[btn]?.dura < 10) {
              if (!synth.current.speaking) {
                speak(sessionActions[btn]?.dura, 2.6);
              }
            } else if (sessionActions[btn]?.dura > -1 && sessionActions[btn]?.dura < 4) {
              speak(sessionActions[btn]?.dura, 2.6, true);
            } else if (
              sessionActions[btn]?.dura ===
              (shift ? sessionButtons[btn]?.times : sessionButtons[btn]?.time) / 2.6
            ) {
              if (!synth.current.speaking) {
                speak(sessionActions[btn]?.dura / 2, 2);
              }
            }
          }
        } else {
          actionObj[btn].displayName = '';
          actionObj[btn].isShift = false;
          actionObj[btn].timestamp = 0;
          actionObj[btn].userId = '';
        }
      } else if (sessionActions[btn].displayName === 'Anonymous') {
        actionObj[btn].displayName = '';
        actionObj[btn].dura = 0;
        actionObj[btn].isShift = false;
        actionObj[btn].timestamp = 0;
        actionObj[btn].userId = '';
      } else if (sessionActions[btn].displayName === '') {
        addHistory(btn);
        if (sessionButtons[btn].type === 'template') {
          handleTemplate(shift ? sessionButtons[btn]?.temps : sessionButtons[btn]?.temp);
        } else if (sessionButtons[btn].type === 'timer') {
          actionObj[btn].displayName = userData ? userData.displayName : 'Anonymous';
          actionObj[btn].dura = shift ? sessionButtons[btn].times : sessionButtons[btn].time;
          actionObj[btn].isShift = shift;
          actionObj[btn].timestamp = Date.now();
          actionObj[btn].userId = userData ? userData.userId : '0';
          if (audio.ttsCalloutsI || audio.ttsCalloutsO) {
            speak(
              sessionActions[btn]?.isShift ? sessionButtons[btn]?.texts : sessionButtons[btn]?.text,
              2
            );
          }
          duration = 1000;
          timer.current[btn] = setTimeout(() => {
            triggerAction(btn, shift, true);
          }, duration);
        } else {
          duration = shift ? sessionButtons[btn].times : sessionButtons[btn].time;
          actionObj[btn].displayName = userData ? userData.displayName : 'Anonymous';
          actionObj[btn].isShift = shift;
          actionObj[btn].timestamp = Date.now();
          actionObj[btn].userId = userData ? userData.userId : '0';
          if (audio.ttsCalloutsI || audio.ttsCalloutsO) {
            if (sessionButtons[btn]?.type === 'effect') {
              effect.current[btn] = new Audio(
                shift ? sessionButtons[btn]?.effects : sessionButtons[btn]?.effect
              );
              effect.current[btn].volume = 0.8;
              effect.current[btn].play();
            } else {
              speak(shift ? sessionButtons[btn]?.texts : sessionButtons[btn]?.text, 1);
            }
          }
          timer.current[btn] = setTimeout(() => {
            effect.current[btn]?.pause();
            triggerAction(btn, sessionActions[btn].isShift);
          }, duration * 1000);
        }
      }

      setSessionActions({ ...actionObj });
      setIsShift(false);
    }
  };

  const handleTemplate = (template) => {
    if (!savedTemplates[template]) return;
    let obj = {};
    for (let i = 1; i < 17; i++) {
      let char = (i + 9).toString(36).toLowerCase();
      obj = {
        ...obj,
        [char]: {
          displayName: '',
          isShift: false,
          timestamp: 0,
          userId: '',
        },
      };
    }
    setSessionActions(obj);
    setSessionButtons({ ...savedTemplates[template] });
    setSelectedTemplate(template);
  };

  const addHistory = (btn, shift) => {
    let milliseconds;
    let msVal =
      sessionActions[btn].timestamp - Math.floor(sessionActions[btn].timestamp / 1000) * 1000;
    if (msVal.toString().length === 1) {
      milliseconds = `00${msVal}`;
    } else if (msVal.toString().length === 2) {
      milliseconds = `0${msVal}`;
    } else if (msVal.toString().length === 3) {
      milliseconds = `${msVal}`;
    }
    let obj = {
      [Object.keys(history).length]: {
        btn: btn,
        color:
          sessionButtons[btn].type === 'timer' || sessionButtons[btn].type === 'template'
            ? 'A'
            : shift
            ? sessionButtons[btn].colors.toUpperCase()
            : sessionButtons[btn].color.toUpperCase(),
        displayName: sessionActions[btn].displayName,
        image: shift ? sessionButtons[btn].images : sessionButtons[btn].image,
        text: shift ? sessionButtons[btn].texts : sessionButtons[btn].text,
        time: shift ? sessionButtons[btn].times : sessionButtons[btn].time,
        timestamp: `${Date(sessionActions[btn].timestamp)
          .toString()
          .split(' ')
          .slice(4, 5)
          .join(' ')}:${milliseconds}`,
        type: sessionButtons[btn].type,
        userId: sessionActions[btn].userId,
      },
    };
    let newObj = { ...history, ...obj };
    setHistory({ ...newObj });
  };

  return (
    <>
      <Head>
        <title>Callouts Evolved | Sessions</title>
        <meta
          name='description'
          content='Free online virtual microphone or augmentative and alternative communicateion (AAC) to improve call outs in video games.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div style={{ textAlign: 'center' }}>
        <h1>Sessions</h1>
        <p>
          The environment below is locally hosted and cannot be shared. The next release will allow
          you to invite gamers to the session so that you can see what they say in voice, type in
          chat, and which buttons they click!
        </p>
        <p>
          A free local version like this will also be available in the new site! Unfortunately, many
          of these features will require a subscription to be used in a shared environment due to
          the high database and computational overhead of an unthrottled real time communication
          interface.
        </p>
        <h2>How does this help us reach our dream?</h2>
        <p>
          Sessions are the core component of Callouts Evolved and are what will make video game
          communication more accessible. There will be a video explaining how the sessions are used,
          the different callout types, and how the system can be used for any multiplayer game. For
          now, please test to your heart&apos;s content and feel free to ask about specific
          scenarios.
        </p>
        <p>
          If you would like to provide feedback, get in touch, or if you were previously using a
          shared environment and still require it, please reach out via discord. MaverickCER#8626
        </p>
      </div>
      <div
        className='session-wrapper'
        style={{
          display: 'grid',
          gridTemplateColumns: portrait ? '1fr' : '280px auto',
        }}>
        {!portrait && (
          <span className='session-menu-wrapper'>
            <div className='session-menu'>
              <div>
                <div className='guildBadge'>
                  <span className='guildImageWrapper'>
                    <Image
                      src={sessionData.sessionPhotoURL}
                      alt={sessionData.game}
                      height={192}
                      width={144}
                    />
                  </span>
                  <span>
                    <p className='guildName' style={{ margin: '0' }}>
                      {audio.sttDialect.split('-')[0] !== sessionData.lang && (
                        <span title='Language'>({sessionData.lang.toUpperCase()})&nbsp;</span>
                      )}
                      <span title='Platform'>
                        {sessionData.platform === 'all' ? (
                          <CrossPlatformIcon width='1em' height='1em' />
                        ) : sessionData.platform === 'nintendo' ? (
                          <NintendoIcon width='1em' height='1em' n />
                        ) : sessionData.platform === 'playstation' ? (
                          <PlayStationIcon width='1em' height='1em' />
                        ) : sessionData.platform === 'steam' ? (
                          <SteamIcon width='1em' height='1em' />
                        ) : sessionData.platform === 'xbox' ? (
                          <XboxIcon width='1em' height='1em' />
                        ) : sessionData.platform === 'other' ? (
                          <OtherPlatformIcon width='1em' height='1em' />
                        ) : (
                          <CrossPlatformIcon width='1em' height='1em' />
                        )}
                        &nbsp;
                      </span>
                      {sessionData.game}
                    </p>
                    <small className='guildReputation'>{sessionData.activity}</small>
                    <br />
                    <small className='guildUsers'>
                      Users: {sessionData.usersCount}/{sessionData.usersMax}
                    </small>
                  </span>
                </div>
                <p className='guildDescription'>{sessionData.description}</p>
              </div>
              <UserCaptions
                triggerAction={triggerAction}
                sessionButtons={sessionButtons}
                isDeaf={sessionData.isDeaf}
              />
              <OfflineChat isSolo={isSolo} />
              {history && (
                <>
                  <h3>History</h3>
                  {Object.values(history).map((data, i, array) => {
                    if (i < array.length - 10) return;
                    return (
                      <details key={i}>
                        <summary>
                          {defaultData.keys[data.btn][ahk.macroMode]} ({data.color}): {data.text}
                        </summary>
                        {data.displayName}
                        <br />
                        {data.timestamp}
                        <br />
                        {data.type}
                      </details>
                    );
                  })}
                </>
              )}
              <br />
              <h3>Templates</h3>
              {savedTemplates && savedTemplates !== {} ? (
                <Select
                  autoComplete='off'
                  name='template'
                  placeholder='Select a Template'
                  title='Select a Template'
                  val={selectedTemplate}
                  change={(e) => {
                    handleTemplate(e.target.value);
                  }}>
                  {Object.keys(savedTemplates).map((v, i) => (
                    <option key={i} value={v}>
                      {v}
                    </option>
                  ))}
                </Select>
              ) : (
                <>
                  <p>Please save a template first</p>
                </>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '16px' }}>
                <div>
                  <label style={{ background: 'red' }}>
                    <input
                      value=''
                      type='file'
                      accept='application/json'
                      style={{ display: 'none' }}
                      onChange={(e) => handleImport(e)}
                    />
                    <div style={{ cursor: 'pointer', textAlign: 'center' }}>Import</div>
                  </label>
                </div>
                <div>
                  <div style={{ cursor: 'pointer', textAlign: 'center' }} onClick={exportButtons}>
                    Export
                  </div>
                </div>
                <div>
                  <div style={{ cursor: 'pointer', textAlign: 'center' }} onClick={updateTemplate}>
                    Save
                  </div>
                </div>
                <div>
                  <div style={{ cursor: 'pointer', textAlign: 'center' }} onClick={deleteTemplate}>
                    Delete
                  </div>
                </div>
              </div>
              <br />
              <div style={{ cursor: 'pointer', textAlign: 'center' }}>
                <Input
                  autoComplete='off'
                  btn={loading ? 'Loading...' : 'Create'}
                  btnAction={() => {
                    createTemplate();
                  }}
                  change={(e) => {
                    setTemplateName(e.target.value);
                  }}
                  error=''
                  name='createTemplate'
                  placeholder='Name of new template'
                  title='Name of new template'
                  type='text'
                  val={templateName}
                />
              </div>
              <br />
              <h3>Callouts</h3>
              <UpdateButton
                sessionButtons={sessionButtons}
                setSessionButtons={setSessionButtons}
                savedTemplates={savedTemplates}
                isSolo={isSolo}
              />
              <ManageSub />
            </div>
          </span>
        )}
        <span className='session-grid-wrapper'>
          <div className='session-grid' ref={calloutGrid}>
            <div
              className={`${ahk.macroMode}`}
              style={{ /* set width/height dynamically with css only */ }}>
              <button disabled className='session-btn-example'>
                <span
                  style={{
                    color: `rgb(${theme.mca})`,
                  }}>
                  <section
                    style={{
                      color: `rgb(${theme.mca})`,
                    }}>
                    <small>Legend: User Name</small>
                    <p>Callout Example</p>
                  </section>
                </span>
              </button>
              {Object.entries(defaultData.keys).map(([key, data]) => (
                <OfflineBtn
                  key={key}
                  btn={key}
                  label={data[ahk.macroMode]}
                  isShift={isShift}
                  sessionAction={sessionActions[key]}
                  sessionButton={sessionButtons[key]}
                  theme={theme}
                  triggerAction={triggerAction}
                  userData={userData}
                />
              ))}
            </div>
          </div>
        </span>
        {portrait && (
          <span className='session-menu-wrapper'>
            <div className='session-menu'>
              <div>
                <div className='guildBadge'>
                  <span className='guildImageWrapper'>
                    <Image
                      src={sessionData.sessionPhotoURL}
                      alt={sessionData.game}
                      height={192}
                      width={144}
                    />
                  </span>
                  <span>
                    <p className='guildName' style={{ margin: '0' }}>
                      {audio.sttDialect.split('-')[0] !== sessionData.lang && (
                        <span title='Language'>({sessionData.lang.toUpperCase()})&nbsp;</span>
                      )}
                      <span title='Platform'>
                        {sessionData.platform === 'all' ? (
                          <CrossPlatformIcon width='1em' height='1em' />
                        ) : sessionData.platform === 'nintendo' ? (
                          <NintendoIcon width='1em' height='1em' n />
                        ) : sessionData.platform === 'playstation' ? (
                          <PlayStationIcon width='1em' height='1em' />
                        ) : sessionData.platform === 'steam' ? (
                          <SteamIcon width='1em' height='1em' />
                        ) : sessionData.platform === 'xbox' ? (
                          <XboxIcon width='1em' height='1em' />
                        ) : sessionData.platform === 'other' ? (
                          <OtherPlatformIcon width='1em' height='1em' />
                        ) : (
                          <CrossPlatformIcon width='1em' height='1em' />
                        )}
                        &nbsp;
                      </span>
                      {sessionData.game}
                    </p>
                    <small className='guildReputation'>{sessionData.activity}</small>
                    <br />
                    <small className='guildUsers'>
                      Users: {sessionData.usersCount}/{sessionData.usersMax}
                    </small>
                  </span>
                </div>
                <p className='guildDescription'>{sessionData.description}</p>
              </div>
              <UserCaptions
                triggerAction={triggerAction}
                sessionButtons={sessionButtons}
                isDeaf={sessionData.isDeaf}
              />
              <OfflineChat isSolo={isSolo} />
              {history && (
                <>
                  <h3>History</h3>
                  {Object.values(history).map((data, i, array) => {
                    if (i < array.length - 10) return;
                    return (
                      <details key={i}>
                        <summary>
                          {defaultData.keys[data.btn][ahk.macroMode]} ({data.color}): {data.text}
                        </summary>
                        {data.displayName}
                        <br />
                        {data.timestamp}
                        <br />
                        {data.type}
                      </details>
                    );
                  })}
                </>
              )}
              <br />
              <h3>Templates</h3>
              {savedTemplates && savedTemplates !== {} ? (
                <Select
                  autoComplete='off'
                  name='template'
                  placeholder='Select a Template'
                  title='Select a Template'
                  val={selectedTemplate}
                  change={(e) => {
                    setSelectedTemplate(e.target.value);
                    handleTemplate(e.target.value);
                  }}>
                  {Object.keys(savedTemplates).map((v, i) => (
                    <option key={i} value={v}>
                      {v}
                    </option>
                  ))}
                </Select>
              ) : (
                <>
                  <p>Please save a template first</p>
                </>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '16px' }}>
                <div>
                  <label style={{ background: 'red' }}>
                    <input
                      value=''
                      type='file'
                      accept='application/json'
                      style={{ display: 'none' }}
                      onChange={(e) => handleImport(e)}
                    />
                    <div style={{ cursor: 'pointer', textAlign: 'center' }}>Import</div>
                  </label>
                </div>
                <div>
                  <div style={{ cursor: 'pointer', textAlign: 'center' }} onClick={exportButtons}>
                    Export
                  </div>
                </div>
                <div>
                  <div style={{ cursor: 'pointer', textAlign: 'center' }} onClick={updateTemplate}>
                    Save
                  </div>
                </div>
                <div>
                  <div style={{ cursor: 'pointer', textAlign: 'center' }} onClick={deleteTemplate}>
                    Delete
                  </div>
                </div>
              </div>
              <br />
              <div style={{ cursor: 'pointer', textAlign: 'center' }}>
                <Input
                  autoComplete='off'
                  btn={loading ? 'Loading...' : 'Create'}
                  btnAction={() => {
                    createTemplate();
                  }}
                  change={(e) => {
                    setTemplateName(e.target.value);
                  }}
                  error=''
                  name='createTemplate'
                  placeholder='Name of new template'
                  title='Name of new template'
                  type='text'
                  val={templateName}
                />
              </div>
              <br />
              <h3>Callouts</h3>
              <UpdateButton
                sessionButtons={sessionButtons}
                setSessionButtons={setSessionButtons}
                savedTemplates={savedTemplates}
                isSolo={isSolo}
              />
              <ManageSub />
            </div>
          </span>
        )}
      </div>
      <form style={{ display: 'none' }}>
        <input disabled id='gameChatClose' value={ahk.gameChatClose} type='text' />
        <input disabled id='gameChatDelay' value={ahk.gameChatDelay} type='number' />
        <input disabled id='gameChatOpen' value={ahk.gameChatOpen} type='text' />
        <input disabled id='gameChatSend' value={ahk.gameChatSend} type='text' />
        <input disabled id='sendGameChat' value={ahk.sendGameChat} type='text' />
        <input disabled id='macroMode' value={ahk.macroMode} type='text' />
        <input disabled id='macroToggle' value={ahk.macroToggle} type='text' />
      </form>
    </>
  );
};

export default Sessions;
