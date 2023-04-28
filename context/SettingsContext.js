import React, { useContext, useEffect, useRef, useState } from 'react';
import { child, get, ref, set, update } from 'firebase/database';

import { database } from '../firebase/firebaseClient';
import { useAuth } from './AuthContext';

const SettingsContext = React.createContext();

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const SettingsProvider = ({ children }) => {
  // helper constants for language / stt managment
  const allLanguagesArr = [
    { lang: 'Afrikaans', code: 'af' },
    { lang: 'Azərbaycanca', code: 'az' },
    { lang: 'Bahasa Indonesia', code: 'id' },
    { lang: 'Bahasa Melayu', code: 'ms' },
    { lang: 'Basa Jawa', code: 'jv' },
    { lang: 'Basa Sunda', code: 'su' },
    { lang: 'Català', code: 'ca' },
    { lang: 'Čeština', code: 'cs' },
    { lang: 'Dansk', code: 'da' },
    { lang: 'Deutsch', code: 'de' },
    { lang: 'English', code: 'en' },
    { lang: 'Español', code: 'es' },
    { lang: 'Euskara', code: 'eu' },
    { lang: 'Filipino', code: 'fi' },
    { lang: 'Français', code: 'fr' },
    { lang: 'Galego', code: 'gl' },
    { lang: 'Hrvatski', code: 'hr' },
    { lang: 'IsiZulu', code: 'zu' },
    { lang: 'Íslenska', code: 'is' },
    { lang: 'Italiano', code: 'it' },
    { lang: 'Kiswahili', code: 'sw' },
    { lang: 'Latviešu', code: 'lv' },
    { lang: 'Lietuvių', code: 'lt' },
    { lang: 'Magyar', code: 'hu' },
    { lang: 'Nederlands', code: 'nl' },
    { lang: 'Norsk bokmål', code: 'nb' },
    { lang: 'Polski', code: 'pl' },
    { lang: 'Português', code: 'pt' },
    { lang: 'Pусский', code: 'ru' },
    { lang: 'Română', code: 'ro' },
    { lang: 'Slovenčina', code: 'sk' },
    { lang: 'Slovenščina', code: 'sl' },
    { lang: 'Suomi', code: 'fi' },
    { lang: 'Svenska', code: 'sv' },
    { lang: 'Tiếng Việt', code: 'vi' },
    { lang: 'Türkçe', code: 'tr' },
    { lang: 'Ελληνικά', code: 'el' },
    { lang: 'български', code: 'bg' },
    { lang: 'Српски', code: 'sr' },
    { lang: 'Українська', code: 'uk' },
    { lang: 'ქართული', code: 'ka' },
    { lang: 'Հայերեն', code: 'hy' },
    { lang: 'اُردُو', code: 'ur' },
    { lang: 'አማርኛ', code: 'am' },
    { lang: 'नेपाली भाषा', code: 'ne' },
    { lang: 'मराठी', code: 'mr' },
    { lang: 'हिन्दी', code: 'hi' },
    { lang: 'বাংলা', code: 'bn' },
    { lang: 'ગુજરાતી', code: 'gu' },
    { lang: 'தமிழ்', code: 'ta' },
    { lang: 'తెలుగు', code: 'te' },
    { lang: 'ಕನ್ನಡ', code: 'kn' },
    { lang: 'മലയാളം', code: 'ml' },
    { lang: 'සිංහල', code: 'si' },
    { lang: 'ภาษาไทย', code: 'th' },
    { lang: 'ລາວ', code: 'lo' },
    { lang: 'ភាសាខ្មែរ', code: 'km' },
    { lang: '한국어', code: 'ko' },
    { lang: '中文', code: 'cmn' },
    { lang: '日本語', code: 'ja' },
  ];

  const allDialectsArr = [
    { dialect: 'Afrikaans', code: 'af-ZA' },
    { dialect: 'Azərbaycanca', code: 'az-AZ' },
    { dialect: 'Bahasa Indonesia', code: 'id-ID' },
    { dialect: 'Bahasa Melayu', code: 'ms-MY' },
    { dialect: 'Basa Jawa', code: 'jv-ID' },
    { dialect: 'Basa Sunda', code: 'su-ID' },
    { dialect: 'Català', code: 'ca-ES' },
    { dialect: 'Čeština', code: 'cs-CZ' },
    { dialect: 'Dansk', code: 'da-DK' },
    { dialect: 'Deutsch', code: 'de-DE' },
    { dialect: 'English (Australia)', code: 'en-AU' },
    { dialect: 'English (Canada)', code: 'en-CA' },
    { dialect: 'English (Ghana)', code: 'en-GH' },
    { dialect: 'English (India)', code: 'en-IN' },
    { dialect: 'English (Kenya)', code: 'en-KE' },
    { dialect: 'English (New Zealand)', code: 'en-NZ' },
    { dialect: 'English (Nigeria)', code: 'en-NG' },
    { dialect: 'English (Philippines)', code: 'en-PH' },
    { dialect: 'English (South Africa)', code: 'en-ZA' },
    { dialect: 'English (Tanzania)', code: 'en-TZ' },
    { dialect: 'English (UK)', code: 'en-GB' },
    { dialect: 'English (United States)', code: 'en-US' },
    { dialect: 'Español (Argentina)', code: 'es-AR' },
    { dialect: 'Español (Bolivia)', code: 'es-BO' },
    { dialect: 'Español (Chile)', code: 'es-CL' },
    { dialect: 'Español (Colombia)', code: 'es-CO' },
    { dialect: 'Español (Costa Rica)', code: 'es-CR' },
    { dialect: 'Español (Ecuador)', code: 'es-EC' },
    { dialect: 'Español (El Salvador)', code: 'es-SV' },
    { dialect: 'Español (España)', code: 'es-ES' },
    { dialect: 'Español (US)', code: 'es-US' },
    { dialect: 'Español (Guatemala)', code: 'es-GT' },
    { dialect: 'Español (Honduras)', code: 'es-HN' },
    { dialect: 'Español (México)', code: 'es-MX' },
    { dialect: 'Español (Nicaragua)', code: 'es-NI' },
    { dialect: 'Español (Panamá)', code: 'es-PA' },
    { dialect: 'Español (Paraguay)', code: 'es-PY' },
    { dialect: 'Español (Perú)', code: 'es-PE' },
    { dialect: 'Español (Puerto Rico)', code: 'es-PR' },
    { dialect: 'Español (RD)', code: 'es-DO' },
    { dialect: 'Español (Uruguay)', code: 'es-UY' },
    { dialect: 'Español (Venezuela)', code: 'es-VE' },
    { dialect: 'Euskara', code: 'eu-ES' },
    { dialect: 'Filipino', code: 'fil-PH' },
    { dialect: 'Français', code: 'fr-FR' },
    { dialect: 'Galego', code: 'gl-ES' },
    { dialect: 'Hrvatski', code: 'hr-HR' },
    { dialect: 'IsiZulu', code: 'zu-ZA' },
    { dialect: 'Íslenska', code: 'is-IS' },
    { dialect: 'Italiano (Italia)', code: 'it-IT' },
    { dialect: 'Italiano (Svizzera)', code: 'it-CH' },
    { dialect: 'Kiswahili (Kenya)', code: 'sw-KE' },
    { dialect: 'Kiswahili (Tanzania)', code: 'sw-TZ' },
    { dialect: 'Latviešu', code: 'lv-LV' },
    { dialect: 'Lietuvių', code: 'lt-LT' },
    { dialect: 'Magyar', code: 'hu-HU' },
    { dialect: 'Nederlands', code: 'nl-NL' },
    { dialect: 'Norsk bokmål', code: 'nb-NO' },
    { dialect: 'Polski', code: 'pl-PL' },
    { dialect: 'Português (Brasil)', code: 'pt-BR' },
    { dialect: 'Português (Portugal)', code: 'pt-PT' },
    { dialect: 'Pусский', code: 'ru-RU' },
    { dialect: 'Română', code: 'ro-RO' },
    { dialect: 'Slovenčina', code: 'sk-SK' },
    { dialect: 'Slovenščina', code: 'sl-SI' },
    { dialect: 'Suomi', code: 'fi-FI' },
    { dialect: 'Svenska', code: 'sv-SE' },
    { dialect: 'Tiếng Việt', code: 'vi-VN' },
    { dialect: 'Türkçe', code: 'tr-TR' },
    { dialect: 'Ελληνικά', code: 'el-GR' },
    { dialect: 'български', code: 'bg-BG' },
    { dialect: 'Српски', code: 'sr-RS' },
    { dialect: 'Українська', code: 'uk-UA' },
    { dialect: 'ქართული', code: 'ka-GE' },
    { dialect: 'Հայերեն', code: 'hy-AM' },
    { dialect: 'اُردُو (بھارت)', code: 'ur-IN' },
    { dialect: 'اُردُو (پاکستان)', code: 'ur-PK' },
    { dialect: 'አማርኛ', code: 'am-ET' },
    { dialect: 'नेपाली भाषा', code: 'ne-NP' },
    { dialect: 'मराठी', code: 'mr-IN' },
    { dialect: 'हिन्दी', code: 'hi-IN' },
    { dialect: 'বাংলা (বাংলাদেশ)', code: 'bn-BD' },
    { dialect: 'বাংলা (ভারত)', code: 'bn-IN' },
    { dialect: 'ગુજરાતી', code: 'gu-IN' },
    { dialect: 'தமிழ் (இந்தியா)', code: 'ta-IN' },
    { dialect: 'தமிழ் (இலங்கை)', code: 'ta-LK' },
    { dialect: 'தமிழ் (சிங்கப்பூர்)', code: 'ta-SG' },
    { dialect: 'தமிழ் (மலேசியா)', code: 'ta-MY' },
    { dialect: 'తెలుగు', code: 'te-IN' },
    { dialect: 'ಕನ್ನಡ', code: 'kn-IN' },
    { dialect: 'മലയാളം', code: 'ml-IN' },
    { dialect: 'සිංහල', code: 'si-LK' },
    { dialect: 'ภาษาไทย', code: 'th-TH' },
    { dialect: 'ລາວ', code: 'lo-LA' },
    { dialect: 'ភាសាខ្មែរ', code: 'km-KH' },
    { dialect: '한국어', code: 'ko-KR' },
    { dialect: '中文 (台灣)', code: 'cmn-Hant-TW' },
    { dialect: '中文 (中国大陆)', code: 'cmn-Hans-CN' },
    { dialect: '中文 (香港)', code: 'cmn-Hans-HK' },
    { dialect: '日本語', code: 'ja-JP' },
  ];

  // helper constants for changing between 3 different themes
  const contrast = {
    mba: '0, 0, 0',
    mbb: '0, 0, 0',
    mbc: '0, 0, 0',
    mbd: '0, 0, 0',
    mca: '255, 255, 255',
    mcb: '255, 255, 255',
    mod: 'contrast',
  };

  const dark = {
    mba: '38, 41, 44',
    mbb: '47, 51, 55',
    mbc: '56, 61, 66',
    mbd: '66, 71, 77',
    mca: '200, 204, 208',
    mcb: '211, 214, 217',
    mod: 'dark',
  };

  const light = {
    mba: '249, 249, 249',
    mbb: '225, 225, 225',
    mbc: '201, 201, 201',
    mbd: '180, 180, 180',
    mca: '32, 32, 32',
    mcb: '64, 64, 64',
    mod: 'light',
  };

  // helper constants that help reset user settings to default values
  const originalAhkData = {
    sendGameChat: true,
    gameChatClose: '',
    gameChatDelay: 250,
    gameChatOpen: 'Enter',
    gameChatSend: 'Enter',
    macroMode: 'touch',
    macroToggle: '`',
  };

  const originalAudioData = {
    lang: 'EN',
    sttDialect: 'en-US',
    threshold: 70,
    ttsVoice: 'Microsoft David - English (United States)',
    ttsCalloutsI: true,
    ttsCalloutsO: true,
    ttsChatI: true,
    ttsChatO: true,
    ttsPitch: 1,
    ttsRate: 1,
    ttsVolume: 0.8,
  };

  const originalThemeData = {
    bbc: '0, 61, 165',
    bcc: '255, 255, 255',
    cba: '238, 0, 0',
    cbb: '122, 122, 0',
    cbc: '0, 138, 0',
    cbd: '0, 132, 132',
    cbe: '97, 97, 255',
    cbf: '209, 0, 209',
    cca: '255, 255, 255',
    ccb: '255, 255, 255',
    ccc: '255, 255, 255',
    ccd: '255, 255, 255',
    cce: '255, 255, 255',
    ccf: '255, 255, 255',
    fsz: 20,
    hrs: true,
    lyt: 'touch',
    mba: '249, 249, 249',
    mbb: '225, 225, 225',
    mbc: '201, 201, 201',
    mbd: '180, 180, 180',
    mca: '32, 32, 32',
    mcb: '64, 64, 64',
    mod: 'light',
  };

  // states that hold the data currently in use
  const synth = useRef(null);
  const utter = useRef(null);
  const { currentUser, userData, userIsPremium } = useAuth();
  const [ahk, setAhk] = useState(originalAhkData);
  const [audio, setAudio] = useState(originalAudioData);
  const [theme, setTheme] = useState(originalThemeData);
  const [allVoicesObj, setAllVoicesObj] = useState({});

  // updates the localstorage for each setting
  const updateLocalStorage = (data, key, val) => {
    const str = localStorage.getItem(data);
    let obj, newObj, newStr;
    if (val) {
      if (val === originalThemeData[key]) {
        if (str) {
          obj = JSON.parse(str);
          if (obj[key]) {
            delete obj[key];
            newStr = JSON.stringify(obj);
            localStorage.setItem(data, newStr);
          }
        }
      }
      obj = JSON.parse(str);
      newObj = {
        ...obj,
        [key]: val,
      };
      newStr = JSON.stringify(newObj);
      if (str !== newStr) {
        localStorage.setItem(data, newStr);
      }
    } else {
      if (str) {
        obj = JSON.parse(str);
        if (obj[key]) {
          delete obj[key];
          newStr = JSON.stringify(obj);
          localStorage.setItem(data, newStr);
        }
      }
    }
  };

  // updates localStorage from firebase for premium users to sync settings across devices
  const getFirebaseSettings = (val = 'all') => {
    if (val !== 'all' && val !== 'ahkData' && val !== 'audioData' && val !== 'themeData')
      return console.error(`Invalid getFirebaseSettings (all ahkData audioData themeData): ${val}`);
    if (currentUser && !currentUser.isAnonymous && userIsPremium) {
      get(child(ref(database), `userSettings/${currentUser.uid}`)).then((dataSnapshot) => {
        if (dataSnapshot.exists()) {
          if (dataSnapshot.val().ahkData && (val === 'all' || val === 'ahkData')) {
            let ahkObj, newAhkObj;
            localStorage.setItem('ceAhkData', dataSnapshot.val().ahkData);
            ahkObj = JSON.parse(dataSnapshot.val().ahkData);
            newAhkObj = {
              ...originalAhkData,
              ...ahkObj,
            };
            setAhk(newAhkObj);
          } else if (val === 'all' || val === 'ahkData') {
            const localAhkData = localStorage.getItem('ceAhkData');
            let obj1, newObj1;
            if (localAhkData) {
              obj1 = JSON.parse(localAhkData);
              newObj1 = {
                ...originalAhkData,
                ...obj1,
              };
              setAhk(newObj1);
            } else {
              setAhk(originalAhkData);
            }
          }

          if (dataSnapshot.val().audioData && (val === 'all' || val === 'audioData')) {
            let audioObj, newAudioObj;
            localStorage.setItem('ceAudioData', dataSnapshot.val().audioData);
            audioObj = JSON.parse(dataSnapshot.val().audioData);
            newAudioObj = {
              ...originalAudioData,
              ...audioObj,
            };
            setAudio(newAudioObj);
          } else if (val === 'all' || val === 'audioData') {
            const localAudioData = localStorage.getItem('ceAudioData');
            let obj2, newObj2;
            if (localAudioData) {
              obj2 = JSON.parse(localAudioData);
              newObj2 = {
                ...originalAudioData,
                ...obj2,
              };
              document.documentElement.style.fontSize = `${newObj2.fsz}px`;
              setAudio(newObj2);
            } else {
              setAudio(originalAudioData);
            }
          }

          if (dataSnapshot.val().themeData && (val === 'all' || val === 'themeData')) {
            let themeObj, newThemeObj;
            localStorage.setItem('ceThemeData', dataSnapshot.val().themeData);
            themeObj = JSON.parse(dataSnapshot.val().themeData);
            newThemeObj = {
              ...originalThemeData,
              ...themeObj,
            };
            document.documentElement.style.fontSize = `${newThemeObj.fsz}px`;
            setTheme(newThemeObj);
          } else if (val === 'all' || val === 'themeData') {
            const localThemeData = localStorage.getItem('ceThemeData');
            let obj3, newObj3;
            if (localThemeData) {
              obj3 = JSON.parse(localThemeData);
              newObj3 = {
                ...originalThemeData,
                ...obj3,
              };
              document.documentElement.style.fontSize = `${newObj3.fsz}px`;
              setTheme(newObj3);
            } else {
              setTheme(originalThemeData);
            }
          }
        } else {
          if (val === 'all' || val === 'ahkData') {
            const localAhkData = localStorage.getItem('ceAhkData');
            let obj1, newObj1;
            if (localAhkData) {
              obj1 = JSON.parse(localAhkData);
              newObj1 = {
                ...originalAhkData,
                ...obj1,
              };
              setAhk(newObj1);
            } else {
              setAhk(originalAhkData);
            }
          }

          if (val === 'all' || val === 'audioData') {
            const localAudioData = localStorage.getItem('ceAudioData');
            let obj2, newObj2;
            if (localAudioData) {
              obj2 = JSON.parse(localAudioData);
              newObj2 = {
                ...originalAudioData,
                ...obj2,
              };
              document.documentElement.style.fontSize = `${newObj2.fsz}px`;
              setAudio(newObj2);
            } else {
              setAudio(originalAudioData);
            }
          }

          if (val === 'all' || val === 'themeData') {
            const localThemeData = localStorage.getItem('ceThemeData');
            let obj3, newObj3;
            if (localThemeData) {
              obj3 = JSON.parse(localThemeData);
              newObj3 = {
                ...originalThemeData,
                ...obj3,
              };
              document.documentElement.style.fontSize = `${newObj3.fsz}px`;
              setTheme(newObj3);
            } else {
              setTheme(originalThemeData);
            }
          }
        }
      });
    }
  };

  // saves localStorage to firebase for premium users to sync settings across devices
  const saveFirebaseSettings = (val = 'all') => {
    const localAhkData = localStorage.getItem('ceAhkData');
    const localAudioData = localStorage.getItem('ceAudioData');
    const localThemeData = localStorage.getItem('ceThemeData');
    if (val !== 'all' && val !== 'ahkData' && val !== 'audioData' && val !== 'themeData')
      return console.error(
        `Invalid saveFirebaseSettings (all ahkData audioData themeData): ${val}`
      );
    if (currentUser && !currentUser.isAnonymous && userIsPremium) {
      if (localAhkData && (val === 'all' || val === 'ahkData')) {
        set(ref(database, `userSettings/${currentUser.uid}/ahkData`), localAhkData);
      }
      if (localAudioData && (val === 'all' || val === 'audioData')) {
        set(ref(database, `userSettings/${currentUser.uid}/audioData`), localAudioData);
      }
      if (localThemeData && (val === 'all' || val === 'themeData')) {
        set(ref(database, `userSettings/${currentUser.uid}/themeData`), localThemeData);
      }
    }
  };

  // helper functions that validate input before updating localStorage and current state
  const setAhkData = (key, val) => {
    const target = key.trim();
    switch (target) {
      case 'gameChatClose':
        if (typeof val === 'string') {
          updateLocalStorage('ceAhkData', target, val);
          setAhk((ahk) => ({
            ...ahk,
            [target]: val,
          }));
        } else {
          console.error(`Invalid setAhkData.gameChatClose (string): ${val} ${typeof val}`);
        }
        break;
      case 'gameChatDelay':
        if (typeof val === 'number') {
          updateLocalStorage('ceAhkData', target, val);
          setAhk((ahk) => ({
            ...ahk,
            [target]: val,
          }));
        } else {
          console.error(`Invalid setAhkData.gameChatDelay (number): ${val} ${typeof val}`);
        }
        break;
      case 'gameChatOpen':
        if (typeof val === 'string') {
          updateLocalStorage('ceAhkData', target, val);
          setAhk((ahk) => ({
            ...ahk,
            [target]: val,
          }));
        } else {
          console.error(`Invalid setAhkData.gameChatOpen (string): ${val} ${typeof val}`);
        }
        break;
      case 'gameChatSend':
        if (typeof val === 'string') {
          updateLocalStorage('ceAhkData', target, val);
          setAhk((ahk) => ({
            ...ahk,
            [target]: val,
          }));
        } else {
          console.error(`Invalid setAhkData.gameChatSend (string): ${val} ${typeof val}`);
        }
        break;
      case 'sendGameChat':
        if (typeof val === 'boolean') {
          updateLocalStorage('ceAhkData', target, val);
          setAhk((ahk) => ({
            ...ahk,
            [target]: val,
          }));
        } else {
          console.error(`Invalid setAhkData.sendGameChat (boolean): ${val} ${typeof val}`);
        }
        break;
      case 'macroMode':
        if (val === 'keyboard' || val === 'list' || val === 'numberpad' || val === 'touch') {
          updateLocalStorage('ceAhkData', target, val);
          setAhk((ahk) => ({
            ...ahk,
            [target]: val,
          }));
        } else {
          console.error(`Invalid setAhkData.macroMode (keyboard, list, numberpad, touch): ${val}`);
        }
        break;
      case 'macroToggle':
        if (typeof val === 'string') {
          updateLocalStorage('ceAhkData', target, val);
          setAhk((ahk) => ({
            ...ahk,
            [target]: val,
          }));
        } else {
          console.error(`Invalid setAhkData.macroToggle (string): ${val} ${typeof val}`);
        }
        break;
      default:
        console.error(
          `Invalid setAhkData key (sendGameChat, gameChatClose, gameChatDelay, gameChatOpen, gameChatSend, macroMode, macroToggle): ${key}`
        );
        break;
    }
  };

  const setAudioData = (key, val) => {
    const target = key.trim();
    switch (target) {
      case 'sttDialect':
        if (typeof val === 'string') {
          updateLocalStorage('ceAudioData', target, val);
          setAudio((audio) => ({
            ...audio,
            lang: val.split('-')[0].toUpperCase(),
            [target]: val,
          }));
        } else {
          console.error(`Invalid setAudioData.sttDialect (string): ${val} ${typeof val}`);
        }
        break;
      case 'threshold':
        if (typeof val === 'number') {
          updateLocalStorage('ceAudioData', target, val);
          setAudio((audio) => ({
            ...audio,
            [target]: val,
          }));
        } else {
          console.error(`Invalid setAudioData.threshold (number): ${val} ${typeof val}`);
        }
        break;
      case 'ttsCalloutsI':
        if (typeof val === 'boolean') {
          updateLocalStorage('ceAudioData', target, val);
          setAudio((audio) => ({
            ...audio,
            [target]: val,
          }));
        } else {
          console.error(`Invalid setAudioData.ttsCalloutsI (boolean): ${val} ${typeof val}`);
        }
        break;
      case 'ttsCalloutsO':
        if (typeof val === 'boolean') {
          updateLocalStorage('ceAudioData', target, val);
          setAudio((audio) => ({
            ...audio,
            [target]: val,
          }));
        } else {
          console.error(`Invalid setAudioData.ttsCalloutsO (boolean): ${val} ${typeof val}`);
        }
        break;
      case 'ttsChatI':
        if (typeof val === 'boolean') {
          updateLocalStorage('ceAudioData', target, val);
          setAudio((audio) => ({
            ...audio,
            [target]: val,
          }));
        } else {
          console.error(`Invalid setAudioData.ttsChatI (boolean): ${val} ${typeof val}`);
        }
        break;
      case 'ttsChatO':
        if (typeof val === 'boolean') {
          updateLocalStorage('ceAudioData', target, val);
          setAudio((audio) => ({
            ...audio,
            [target]: val,
          }));
        } else {
          console.error(`Invalid setAudioData.ttsChatO (boolean): ${val} ${typeof val}`);
        }
        break;
      case 'ttsPitch':
        if (typeof val === 'number') {
          updateLocalStorage('ceAudioData', target, val);
          setAudio((audio) => ({
            ...audio,
            [target]: val,
          }));
        } else {
          console.error(`Invalid setAudioData.ttsPitch (number): ${val} ${typeof val}`);
        }
        break;
      case 'ttsRate':
        if (typeof val === 'number') {
          updateLocalStorage('ceAudioData', target, val);
          setAudio((audio) => ({
            ...audio,
            [target]: val,
          }));
        } else {
          console.error(`Invalid setAudioData.ttsRate (number): ${val} ${typeof val}`);
        }
        break;
      case 'ttsVoice':
        if (typeof val === 'string') {
          updateLocalStorage('ceAudioData', target, val);
          setAudio((audio) => ({
            ...audio,
            [target]: val,
          }));
        } else {
          console.error(`Invalid setAudioData.ttsVoice (string): ${val} ${typeof val}`);
        }
        break;
      case 'ttsVolume':
        if (typeof val === 'number') {
          updateLocalStorage('ceAudioData', target, val);
          setAudio((audio) => ({
            ...audio,
            [target]: val,
          }));
        } else {
          console.error(`Invalid setAudioData.ttsVolume (number): ${val} ${typeof val}`);
        }
        break;
      default:
        console.error(
          `Invalid setAudioData key (sttDialect, threshold, ttsVoice, ttsCalloutsI, ttsCalloutsO, ttsChatI, ttsChatO, ttsPitch, ttsRate, ttsVolume): ${key}`
        );
        break;
    }
  };

  // returns white or black rgb values based on highest contrast with provided color
  const maxContrast = (col) => {
    if (col) {
      let rgb = hexToRgb(col);
      if (rgb === 'invalid') return 'invalid';
      let arr = rgb.split(', ');
      let r = parseInt(arr[0], 10);
      let g = parseInt(arr[1], 10);
      let b = parseInt(arr[2], 10);
      let v = Math.min(Math.max(((r * 299 + g * 587 + b * 144) / 1000 - 128) * -1000, 0), 255);
      return `${v}, ${v}, ${v}`;
    }
  };

  // converts hex to rgb or rgb to formatted rgb
  const hexToRgb = (col) => {
    if (col) {
      let r, b, g;
      let hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(col);
      if (hex === null) {
        let rgb = col.split(',');
        if (rgb.length === 3) {
          r = parseInt(rgb[0].replace(/[{()}]/g, '').trim(), 10);
          g = parseInt(rgb[1].replace(/[{()}]/g, '').trim(), 10);
          b = parseInt(rgb[2].replace(/[{()}]/g, '').trim(), 10);
        } else {
          return 'invalid';
        }
      } else {
        r = parseInt(hex[1], 16);
        g = parseInt(hex[2], 16);
        b = parseInt(hex[3], 16);
      }
      return `${r}, ${g}, ${b}`;
    }
  };

  const setThemeClr = (key, value) => {
    let val = value;
    if (value.includes('rgb')) {
      val = value.slice(4, -1);
    }
    let bkg = `cb${key}`;
    let clr = `cc${key}`;
    let rgb = hexToRgb(val);
    let inv = maxContrast(rgb);
    if (rgb === 'invalid' || val === 'invalid')
      return console.error(`Invalid setThemeClr ('#000000' or '0, 0, 0'): ${hex}`);
    updateLocalStorage('ceThemeData', bkg, rgb);
    updateLocalStorage('ceThemeData', clr, inv);
    setTheme((theme) => ({
      ...theme,
      [bkg]: rgb,
      [clr]: inv,
    }));
  };

  const setThemeData = (key, val) => {
    const target = key.toLowerCase().trim();
    const clr = val.toLowerCase().trim();
    switch (target) {
      case 'a':
        setThemeClr(target, clr);
        break;
      case 'b':
        setThemeClr(target, clr);
        break;
      case 'c':
        setThemeClr(target, clr);
        break;
      case 'd':
        setThemeClr(target, clr);
        break;
      case 'e':
        setThemeClr(target, clr);
        break;
      case 'f':
        setThemeClr(target, clr);
        break;
      case 'fsz':
        const size = parseInt(val, 10);
        if (typeof size === 'number') {
          document.documentElement.style.fontSize = `${size}px`;
          updateLocalStorage('ceThemeData', 'fsz', size);
          setTheme((theme) => ({
            ...theme,
            fsz: size,
          }));
        } else {
          console.error(`Invalid setThemeData.fsz (number): ${val} ${typeof val}`);
        }
        break;
      case 'hrs':
        if (typeof val === 'boolean') {
          updateLocalStorage('ceThemeData', 'fsz', val);
          setTheme((theme) => ({
            ...theme,
            hrs: val,
          }));
        } else {
          console.error(`Invalid setThemeData.hrs (boolean): ${val} ${typeof val}`);
        }
        break;
      case 'mod':
        const mode = val.toLowerCase().trim();
        if (mode === 'contrast' || mode === 'dark' || mode === 'light') {
          let obj;
          switch (mode) {
            case 'contrast':
              obj = contrast;
              break;
            case 'dark':
              obj = dark;
              break;
            default:
              obj = light;
              break;
          }
          for (const [key, val] of Object.entries(obj)) {
            updateLocalStorage('ceThemeData', key, val);
          }
          setTheme((theme) => ({
            ...theme,
            ...obj,
          }));
        } else {
          console.error(`Invalid setThemeData.mod (contrast dark light): ${mode}`);
        }
        break;
      default:
        console.error(`Invalid setThemeDatan key (a-f fsz hrs mod): ${key}`);
        break;
    }
  };

  const speak = (text, rate, priority = false) => {
    if (priority) {
      synth.current.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = audio.ttsVolume;
    utterance.voice = speechSynthesis
      .getVoices()
      .filter((voice) => voice.name === audio.ttsVoice)[0];
    utterance.pitch = audio.ttsPitch;
    utterance.rate = rate ? rate : audio.ttsRate;
    synth.current.speak(utterance);
  };

  // fetches user settings from localhost, then firebase, then uses defaults.
  useEffect(() => {
    async function fetchData() {
      const localAhkData = localStorage.getItem('ceAhkData');
      let obj1, newObj1;
      if (localAhkData) {
        obj1 = JSON.parse(localAhkData);
        newObj1 = {
          ...originalAhkData,
          ...obj1,
        };
        setAhk(newObj1);
      } else {
        setAhk(originalAhkData);
      }

      const localAudioData = localStorage.getItem('ceAudioData');
      let obj2, newObj2;
      if (localAudioData) {
        obj2 = JSON.parse(localAudioData);
        newObj2 = {
          ...originalAudioData,
          ...obj2,
        };
        setAudio(newObj2);
      } else {
        setAudio(originalAudioData);
      }

      const localThemeData = localStorage.getItem('ceThemeData');
      let obj3, newObj3;
      if (localThemeData) {
        obj3 = JSON.parse(localThemeData);
        newObj3 = {
          ...originalThemeData,
          ...obj3,
        };
        document.documentElement.style.fontSize = `${newObj3.fsz}px`;
        setTheme(newObj3);
      } else {
        setTheme(originalThemeData);
      }

      if (!localAhkData && !localAudioData && !localThemeData) {
        getFirebaseSettings('all');
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (typeof window !== 'object' || !window.speechSynthesis) return;
    synth.current = window.speechSynthesis;
    synth.current.onvoiceschanged = setAllVoicesObj(synth.current.getVoices());
    setTimeout(() => {
      setAllVoicesObj(synth.current.getVoices());
    }, 1000);

    utter.current = new SpeechSynthesisUtterance();

    return () => {
      synth.current.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    async function setTitle() {
      if (!currentUser) return;
      if (currentUser.isAnonymous) return;

      let updates = {};
      if (userIsPremium) {
        if (userData.title === 'Gamer') {
          updates[`userData/${currentUser.uid}/title`] = 'MVP';
        }
      } else {
        if (userData.title === 'MVP') {
          updates[`userData/${currentUser.uid}/title`] = 'Gamer';
        }
      }
      if (updates !== {}) {
        update(ref(database), updates);
      }
    }

    setTitle();
  }, [userIsPremium]);

  const value = {
    ahk,
    audio,
    theme,
    speak,
    synth,
    allVoicesObj,
    allDialectsArr,
    allLanguagesArr,
    originalAhkData,
    originalAudioData,
    originalThemeData,
    getFirebaseSettings,
    saveFirebaseSettings,
    setAhkData,
    setAudioData,
    setThemeData,
    userIsPremium,
  };
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
