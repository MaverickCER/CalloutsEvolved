import { child, get, ref, update } from 'firebase/database';
import { useEffect, useState } from 'react';

import Input from '../../components/ui/input';
import Link from 'next/link';
import ManageSub from '../../components/ManageSub';
import { RgbStringColorPicker } from 'react-colorful';
import Select from '../../components/ui/select';
import UpdateBio from '../../components/auth/updatebio';
import UpdateColor from '../../components/auth/updatecolor';
import UpdateDisplayName from '../../components/auth/updatedisplayname';
import UpdateEmail from '../../components/auth/updateemail';
import UpdatePassword from '../../components/auth/updatepassword';
import UserSocial from '../../components/UserSocial';
import { database } from '../../firebase/firebaseClient';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import { useSettings } from '../../context/SettingsContext';

const Index = () => {
  const {
    audio,
    ahk,
    theme,
    setAudioData,
    setAhkData,
    setThemeData,
    allDialectsArr,
    allVoicesObj,
    userIsPremium,
    originalThemeData,
  } = useSettings();
  const { currentUser } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [bio, setBio] = useState('This user is not available');
  const [color, setColor] = useState('a');
  const [guilds, setGuilds] = useState([]);
  const [guildsObj, setGuildsObj] = useState([]);
  const [blacklist, setBlacklist] = useState({});
  const [blacklistObj, setBlacklistObj] = useState({});
  const [infamylist, setInfamylist] = useState({});
  const [infamylistObj, setInfamylistObj] = useState({});
  const [whitelist, setWhitelist] = useState({});
  const [whitelistObj, setWhitelistObj] = useState({});
  const [isStatusPublic, setIsStatusPublic] = useState(true);
  const [isBlacklisted, setIsBlacklisted] = useState(true);
  const [status, setStatus] = useState({});
  const [lastActive, setLastActive] = useState(0);
  const [displayName, setDisplayName] = useState('Unknown');
  const [honor, setHonor] = useState(0);
  const [infamy, setInfamy] = useState(0);
  const [title, setTitle] = useState('Gamer');
  const [isSessionIdPublic, setIsSessionIdPublic] = useState(false);
  const [sessionId, setSessionId] = useState('Uknown');
  const [userPhotoURL, setUserPhotoURL] = useState('https://i.imgur.com/yk5wTiF.png');
  const [themeFsz, setThemeFsz] = useState(theme.fsz);
  const [ahkToggle, setAhkToggle] = useState(ahk.macroToggle);
  const [ahkOpenChat, setAhkOpenChat] = useState(ahk.gameChatOpen);
  const [ahkCloseChat, setAhkCloseChat] = useState(ahk.gameChatClose);
  const [ahkSendChat, setAhkSendChat] = useState(ahk.gameChatSend);
  const [ahkDelayChat, setAhkDelayChat] = useState(ahk.gameChatDelay);
  const [customClr, setCustomClr] = useState('cba');
  const [customTar, setCustomTar] = useState('a');

  useEffect(() => {
    if (currentUser && currentUser.uid === id) {
      setIsBlacklisted(false);
    } else if (currentUser) {
      get(child(ref(database), `userLists/${id}/blacklist/${currentUser.uid}`)).then(
        (DataSnapshot) => {
          if (DataSnapshot.exists()) {
            if (isBlacklisted !== DataSnapshot.val()) {
              setIsBlacklisted(DataSnapshot.val());
            }
          } else {
            if (isBlacklisted !== false) {
              setIsBlacklisted(false);
            }
          }
        }
      );
    } else {
      get(child(ref(database), `userData/${id}/isOpen`)).then((DataSnapshot) => {
        if (DataSnapshot.exists()) {
          if (DataSnapshot.val() === true && isBlacklisted !== false) {
            setIsBlacklisted(false);
          } else if (
            isBlacklisted !== 'This profile is private. Please login to view more information.'
          ) {
            setIsBlacklisted('This profile is private. Please login to view more information.');
          }
        } else {
          if (isBlacklisted !== 'This user does not exist.') {
            setIsBlacklisted('This user does not exist.');
          }
        }
      });
    }
    if (isBlacklisted === false) {
      get(child(ref(database), `userData/${id}`)).then((DataSnapshot) => {
        if (DataSnapshot.exists()) {
          setBio(DataSnapshot.val().bio);
          setColor(DataSnapshot.val().color);
          setDisplayName(DataSnapshot.val().displayName);
          setHonor(DataSnapshot.val().honor);
          setInfamy(DataSnapshot.val().infamy);
          setIsSessionIdPublic(DataSnapshot.val().isSessionIdPublic);
          setIsStatusPublic(DataSnapshot.val().isSessionIdPublic);
          setLastActive(DataSnapshot.val().timestamp);
          setSessionId(DataSnapshot.val().sessionId);
          setStatus(DataSnapshot.val().status);
          setTitle(DataSnapshot.val().title ? DataSnapshot.val().title : 'Gamer');
          setUserPhotoURL(DataSnapshot.val().userPhotoURL);
          get(child(ref(database), `userGuilds/${id}`)).then((DataSnapshot1) => {
            if (DataSnapshot1.exists()) {
              setGuildsObj(DataSnapshot1.val());
            }
          });
          get(child(ref(database), `userLists/${id}`)).then((DataSnapshot2) => {
            if (DataSnapshot2.exists()) {
              if (DataSnapshot2.val().blacklist) {
                setBlacklistObj(DataSnapshot2.val().blacklist);
              }
              if (DataSnapshot2.val().infamylist) {
                setInfamylistObj(DataSnapshot2.val().infamylist);
              }
              if (DataSnapshot2.val().whitelist) {
                setWhitelistObj(DataSnapshot2.val().whitelist);
              }
            }
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBlacklisted, id]);

  useEffect(() => {
    async function getGuilds() {
      let obj = {};
      let tempArr = [];
      if (!guildsObj) return;
      for (const [key, value] of Object.entries(guildsObj)) {
        let tempArr0 = [];
        await get(child(ref(database), `guildAliases/${key}`)).then((content) => {
          if (content.exists()) {
            obj = {
              ...obj,
              [key]: content.val(),
            };

            tempArr = [...tempArr0, value];
          }
        });
      }

      Promise.allSettled(tempArr).then(() => {
        setGuilds(obj);
      });
    }

    getGuilds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guildsObj]);

  useEffect(() => {
    async function getBlacklist() {
      let obj = {};
      let tempArr = [];
      if (!blacklistObj) return console.error('No blacklist');
      for (const [key, value] of Object.entries(blacklistObj)) {
        await get(child(ref(database), `userData/${key}`)).then((contents) => {
          if (contents.exists()) {
            obj = {
              ...obj,
              [key]: {
                ...contents.val(),
                note: value,
              },
            };

            tempArr = [...tempArr, contents.val()];
          }
        });
      }

      Promise.allSettled(tempArr).then(() => {
        setBlacklist(obj);
      });
    }

    getBlacklist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blacklistObj]);

  useEffect(() => {
    async function getInfamylist() {
      let obj = {};
      let tempArr = [];
      if (!infamylistObj) return console.error('No infamylist');
      for (const [key, value] of Object.entries(infamylistObj)) {
        await get(child(ref(database), `userData/${key}`)).then((contents) => {
          if (contents.exists()) {
            obj = {
              ...obj,
              [key]: {
                ...contents.val(),
                note: value,
              },
            };

            tempArr = [...tempArr, contents.val()];
          }
        });
      }

      Promise.allSettled(tempArr).then(() => {
        setInfamylist(obj);
      });
    }

    getInfamylist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infamylistObj]);

  useEffect(() => {
    async function getWhitelist() {
      let obj = {};
      let tempArr = [];
      if (!whitelistObj) return console.error('No whitelist');
      for (const [key, value] of Object.entries(whitelistObj)) {
        await get(child(ref(database), `userData/${key}`)).then((contents) => {
          if (contents.exists()) {
            obj = {
              ...obj,
              [key]: {
                ...contents.val(),
                note: value,
              },
            };

            tempArr = [...tempArr, contents.val()];
          }
        });
      }

      Promise.allSettled(tempArr).then(() => {
        setWhitelist(obj);
      });
    }

    getWhitelist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whitelistObj]);

  return (
    <>
      <span className="guildLink">
        <div className="guildBadge">
          <span className="guildImageWrapper">
            <img src={userPhotoURL} alt={displayName} height={192} width={144} />
          </span>
          <span>
            <p className="guildName">{`${displayName}`}</p>
            <small className="guildReputation">{`${title} - Honor: ${honor} - Infamy: ${infamy}`}</small>
            <small className="guildUsers">{`${
              isSessionIdPublic
                ? `Session: ${sessionId && sessionId !== '' ? sessionId : 'None'}`
                : 'Session: Unknown'
            }`}</small>
          </span>
        </div>
        {bio && <p className="guildDescription">{bio}</p>}
      </span>
      {currentUser && id === currentUser.uid && userIsPremium ? (
        <>
          <p>
            Thank you for being a loyal subscriber! Your contribution helps thousands of gamers
            around the world get into, stay in, complete, and compete in end game activities that
            they otherwise would not have access to.
          </p>
          <ManageSub />
        </>
      ) : (
        currentUser &&
        id === currentUser.uid &&
        !userIsPremium && (
          <>
            <p>
              You don&apos;t need a premium plan to communicate effectively, but a premium plan price is
              based on the break even resource costs for our most active users.
              <br />
              The premium plan will enhance your experience, label you as an MVP, and allow you
              contribute to the community by adding games, activities, encounters, and templates.
              <br />
              In addition to the social recognition, you&apos;ll be able to customize your text to speech
              experience to better fit your needs, create private guilds or sessions, send mp3 based
              callouts, and integrate with discord!
              <br />
              All of these features are locked down or unavailable in an effort to reduce trolling
              in the community and to reduce resource costs.
              <br />
              Callouts Evolved aims to be transparent in our pricing structure while providing free
              to play users with everything they need and premium users the most robust experience.
              <br />
              <ManageSub />
            </p>
          </>
        )
      )}
      {currentUser && id === currentUser.uid && (
        <>
          <Input
            autoComplete="off"
            change={(e) => {
              setAudioData('threshold', parseInt(e.target.value));
            }}
            error=""
            label="Speech Commands Threshold"
            name="threshold"
            placeholder="Sensitivity for speech commands"
            required="true"
            title="Adjust the sensitivity for speech commands"
            type="number"
            val={audio.threshold}
            valMax={90}
            valMin={50}
            valStep={10}
          />
          <Select
            autoComplete="off"
            label="Speech Recognition Language"
            name="sttLang"
            placeholder="Select a Language"
            title="Select a Language"
            val={audio.sttDialect}
            change={(e) => {
              setThemeData('sttDialect', e.target.value);
            }}>
            <option value={audio.sttDialect}>
              {
                allDialectsArr.filter((o) => {
                  return o.code === audio.sttDialect;
                })[0].dialect
              }
            </option>
            {allDialectsArr.map((v, i) => (
              <option key={i} value={v.code}>
                {v.dialect}
              </option>
            ))}
          </Select>
          Speech Synthesis:
          <div>
            <button
              onClick={() => {
                if (audio.ttsCalloutsI && audio.ttsCalloutsO) {
                  if (userIsPremium) {
                    setAudioData('ttsCalloutsI', true);
                    setAudioData('ttsCalloutsO', false);
                  } else {
                    setAudioData('ttsCalloutsI', false);
                    setAudioData('ttsCalloutsO', false);
                  }
                } else if (audio.ttsCalloutsI) {
                  setAudioData('ttsCalloutsI', false);
                  setAudioData('ttsCalloutsO', true);
                } else if (audio.ttsCalloutsO) {
                  setAudioData('ttsCalloutsI', false);
                  setAudioData('ttsCalloutsO', false);
                } else {
                  setAudioData('ttsCalloutsI', true);
                  setAudioData('ttsCalloutsO', true);
                }
              }}>
              {audio.ttsCalloutsI && audio.ttsCalloutsO
                ? 'Callouts: Enabled'
                : audio.ttsCalloutsI
                ? 'Callouts: Incoming'
                : audio.ttsCalloutsO
                ? 'Callouts: Outgoing'
                : 'Callouts: Disabled'}
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                if (audio.ttsChatI && audio.ttsChatO) {
                  if (userIsPremium) {
                    setAudioData('ttsChatI', true);
                    setAudioData('ttsChatO', false);
                  } else {
                    setAudioData('ttsChatI', false);
                    setAudioData('ttsChatO', false);
                  }
                } else if (audio.ttsChatI) {
                  setAudioData('ttsChatI', false);
                  setAudioData('ttsChatO', true);
                } else if (audio.ttsChatO) {
                  setAudioData('ttsChatI', false);
                  setAudioData('ttsChatO', false);
                } else {
                  setAudioData('ttsChatI', true);
                  setAudioData('ttsChatO', true);
                }
              }}>
              {audio.ttsChatI && audio.ttsChatO
                ? 'Chat: Enabled'
                : audio.ttsChatI
                ? 'Chat: Incoming'
                : audio.ttsChatO
                ? 'Chat: Outgoing'
                : 'Chat: Disabled'}
            </button>
          </div>
          <Select
            autoComplete="off"
            label="Speech Synthesis Voice"
            name="ttsVoice"
            placeholder="Select a Voice"
            title="Select a Voice"
            val={audio.ttsVoice}
            change={(e) => {
              setThemeData('ttsVoice', e.target.value);
            }}>
            {allVoicesObj &&
              allVoicesObj !== {} &&
              Object.values(allVoicesObj).map((v, i) => (
                <option key={i} value={v.name}>
                  {v.name}
                </option>
              ))}
          </Select>
          {!userIsPremium && <>Get access to better synthesis controls by becoming an MVP</>}
          <div style={{ backgroundColor: `rgb(${theme.mba})`, color: `rgb(${theme.mca})` }}>
            <p>Color Mode</p>
            <button
              onClick={() => {
                setThemeData('mod', 'light');
              }}>
              Light
            </button>
            <button
              onClick={() => {
                setThemeData('mod', 'dark');
              }}>
              Dark
            </button>
            <button
              onClick={() => {
                setThemeData('mod', 'contrast');
              }}>
              Contrast
            </button>
          </div>
          <div>
            <p>Button Layout</p>
            <button
              onClick={() => {
                setAhkData('macroMode', 'keyboard');
              }}>
              Keyboard
            </button>
            <button
              onClick={() => {
                setAhkData('macroMode', 'numberpad');
              }}>
              Number Pad
            </button>
            <button
              onClick={() => {
                setAhkData('macroMode', 'touch');
              }}>
              Touch
            </button>
            <button
              onClick={() => {
                setAhkData('macroMode', 'list');
              }}>
              List
            </button>
          </div>
          <Input
            autoComplete="off"
            blur={(e) => {
              setThemeData('fsz', e.target.value);
            }}
            change={(e) => {
              setThemeFsz(e.target.value);
            }}
            error=""
            label="Font Size"
            name="fontsize"
            placeholder="What should be the base font size?"
            required="true"
            title="What should be the base font size?"
            type="number"
            val={themeFsz}
          />
          <div>
            <p>Color Customization</p>
            <button
              style={{
                backgroundColor: `rgb(${theme.cba})`,
                color: `rgb(${theme.cca})`,
                borderRadius: '8px',
                padding: '8px',
              }}
              onClick={() => {
                setCustomClr('cba');
                setCustomTar('a');
              }}>
              a
            </button>
            <button
              style={{
                backgroundColor: `rgb(${theme.cbb})`,
                color: `rgb(${theme.ccb})`,
                borderRadius: '8px',
                padding: '8px',
              }}
              onClick={() => {
                setCustomClr('cbb');
                setCustomTar('b');
              }}>
              b
            </button>
            <button
              style={{
                backgroundColor: `rgb(${theme.cbc})`,
                color: `rgb(${theme.ccc})`,
                borderRadius: '8px',
                padding: '8px',
              }}
              onClick={() => {
                setCustomClr('cbc');
                setCustomTar('c');
              }}>
              c
            </button>
            <button
              style={{
                backgroundColor: `rgb(${theme.cbd})`,
                color: `rgb(${theme.ccd})`,
                borderRadius: '8px',
                padding: '8px',
              }}
              onClick={() => {
                setCustomClr('cbd');
                setCustomTar('d');
              }}>
              d
            </button>
            <button
              style={{
                backgroundColor: `rgb(${theme.cbe})`,
                color: `rgb(${theme.cce})`,
                borderRadius: '8px',
                padding: '8px',
              }}
              onClick={() => {
                setCustomClr('cbe');
                setCustomTar('e');
              }}>
              e
            </button>
            <button
              style={{
                backgroundColor: `rgb(${theme.cbf})`,
                color: `rgb(${theme.ccf})`,
                borderRadius: '8px',
                padding: '8px',
              }}
              onClick={() => {
                setCustomClr('cbf');
                setCustomTar('f');
              }}>
              f
            </button>
            <RgbStringColorPicker
              color={`rgb(${theme[customClr]})`}
              onChange={(e) => {
                setThemeData(customTar, e);
              }}
            />
            <button
              onClick={() => {
                setThemeData(customTar, `rgb(${originalThemeData['cb' + customTar]})`);
              }}>
              Reset Color
            </button>
          </div>
          <UpdateColor />
          <UpdateDisplayName />
          <UpdateBio />
          <UpdateEmail />
          <UpdatePassword />
          <div>
            <p>Send In-Game Messages</p>
            <button
              onClick={() => {
                setAhkData('sendGameChat', !ahk.sendGameChat);
              }}>
              {ahk.sendGameChat ? 'Enabled' : 'Disabled'}
            </button>
          </div>
          <div>
            <p>Macro Layout</p>
            <button
              onClick={() => {
                setAhkData('macroMode', ahk.macroMode === 'keyboard' ? 'numberpad' : 'keyboard');
              }}>
              {ahk.macroMode === 'numberpad'
                ? 'Number Pad'
                : ahk.macroMode.charAt(0).toUpperCase() + ahk.macroMode.slice(1)}
            </button>
          </div>
          <Input
            autoComplete="off"
            blur={(e) => {
              setAhkData('macroToggle', e.target.value);
            }}
            change={(e) => {
              setAhkToggle(e.target.value);
            }}
            error=""
            label="Macro Toggle"
            name="macroToggle"
            placeholder="How do you wish to enable/disable the app?"
            title="How do you wish to enable/disable the app?"
            type="text"
            val={ahkToggle}
            maxLength={5}
          />
          <Input
            autoComplete="off"
            blur={(e) => {
              setAhkData('gameChatOpen', e.target.value);
            }}
            change={(e) => {
              setAhkOpenChat(e.target.value);
            }}
            error=""
            label="Open Game Chat"
            name="gameChatOpen"
            placeholder="What key opens the chat in your game?"
            title="What key opens the chat in your game?"
            type="text"
            val={ahkOpenChat}
            maxLength={5}
          />
          <Input
            autoComplete="off"
            blur={(e) => {
              setAhkData('gameChatClose', e.target.value);
            }}
            change={(e) => {
              setAhkCloseChat(e.target.value);
            }}
            error=""
            label="Close Game Chat"
            name="gameChatClose"
            placeholder="What key closes the chat in your game?"
            title="What key closes the chat in your game?"
            type="text"
            val={ahkCloseChat}
            maxLength={5}
          />
          <Input
            autoComplete="off"
            blur={(e) => {
              setAhkData('gameChatSend', e.target.value);
            }}
            change={(e) => {
              setAhkSendChat(e.target.value);
            }}
            error=""
            label="Send Game Chat Message"
            name="gameChatSend"
            placeholder="Enter is the correct key 99% of the time"
            title="What key sends the chat message in your game?"
            type="text"
            val={ahkSendChat}
            maxLength={5}
          />
          <Input
            autoComplete="off"
            blur={(e) => {
              setAhkData('gameChatDelay', e.target.value);
            }}
            change={(e) => {
              setAhkDelayChat(e.target.value);
            }}
            error=""
            label="Delay Game Chat"
            name="gameChatDelay"
            placeholder="Increase so that message is send reliably."
            title="Increase so that message is send reliably."
            type="number"
            val={ahkDelayChat}
            maxLength={4}
          />
        </>
      )}
      {currentUser && id !== currentUser.uid && <UserSocial userId={id} />}
      {isBlacklisted !== false ? (
        <>Reason: {isBlacklisted}</>
      ) : (
        <>
          <br />
          <Link href="/user/userId">View UserId</Link>
          <br />
          Guilds:
          {Object.entries(guilds).map(([key, data]) => (
            <span key={key}>
              <Link href={`/join/guild/${key}`} passHref>
                <a className="guildLink">
                  <div className="guildBadge">
                    <span className="guildImageWrapper">
                      <img
                        src={data.guildPhotoURL}
                        alt={data.displayName}
                        height={192}
                        width={144}
                      />
                    </span>
                    <span>
                      <p className="guildName">{`(${data.lang.toUpperCase()}) ${
                        data.displayName
                      }`}</p>
                      <small className="guildReputation">{`Reputation ${data.reputation}`}</small>
                      <small className="guildUsers">{`Users ${data.users}`}</small>
                    </span>
                  </div>
                  <p className="guildDescription">{`${data.description}`}</p>
                </a>
              </Link>
            </span>
          ))}
          <div>
            Friends:
            {Object.entries(whitelist).map(([key, data]) => (
              <span key={key}>
                <div className="guildBadge">
                  <span className="guildImageWrapper">
                    <img src={data.userPhotoURL} alt={data.displayName} height={192} width={144} />
                  </span>
                  <span>
                    <p className="guildName">{`${data.displayName}`}</p>
                    <small className="guildReputation">{`${
                      data.title ? data.title : 'Gamer'
                    } - Honor: ${data.honor} - Infamy: ${data.infamy}`}</small>
                    <br />
                    <small className="guildUsers">{`${
                      data.isSessionIdPublic
                        ? `Session: ${
                            data.sessionId && data.sessionId !== '' ? data.sessionId : 'None'
                          }`
                        : 'Session: Unknown'
                    }`}</small>
                  </span>
                </div>
                {currentUser && id === currentUser.uid && (
                  <>
                    {data.note && data.note !== '' && data.note !== true && (
                      <p className="guildDescription">{`Note: ${data.note}`}</p>
                    )}
                    <div className="guildFooter">
                      <span>
                        <Link href={`user/${key}`} passHref>
                          <a>View</a>
                        </Link>
                      </span>
                    </div>
                  </>
                )}
              </span>
            ))}
          </div>
          <div>
            Foes:
            {Object.entries(blacklist).map(([key, data]) => (
              <span key={key}>
                <div className="guildBadge">
                  <span className="guildImageWrapper">
                    <img src={data.userPhotoURL} alt={data.displayName} height={192} width={144} />
                  </span>
                  <span>
                    <p className="guildName">{`${data.displayName}`}</p>
                    <small className="guildReputation">{`${
                      data.title ? data.title : 'Gamer'
                    } - Honor: ${data.honor} - Infamy: ${data.infamy}`}</small>
                    <br />
                    <small className="guildUsers">{`${
                      data.isSessionIdPublic
                        ? `Session: ${
                            data.sessionId && data.sessionId !== '' ? data.sessionId : 'None'
                          }`
                        : 'Session: Unknown'
                    }`}</small>
                  </span>
                </div>
                {currentUser && id === currentUser.uid && (
                  <>
                    {data.note && data.note.reason !== '' && data.note.reason !== true && (
                      <p className="guildDescription">{`${
                        data.note.isInfamous ? 'Report: ' : 'Note: '
                      }${data.note.reason}`}</p>
                    )}
                    <div className="guildFooter">
                      <span>
                        <Link href={`/user/${key}`} passHref>
                          <a>View</a>
                        </Link>
                      </span>
                    </div>
                  </>
                )}
              </span>
            ))}
          </div>
          <div>
            Reports List:
            {Object.entries(infamylist).map(([key, data]) => (
              <span key={key}>
                <div className="guildBadge">
                  <span className="guildImageWrapper">
                    <img src={data.userPhotoURL} alt={data.displayName} height={192} width={144} />
                  </span>
                  <span>
                    <p className="guildName">{`${data.displayName}`}</p>
                    <small className="guildReputation">{`${
                      data.title ? data.title : 'Gamer'
                    } - Honor: ${data.honor} - Infamy: ${data.infamy}`}</small>
                    <br />
                    <small className="guildUsers">{`${
                      data.isSessionIdPublic
                        ? `Session: ${
                            data.sessionId && data.sessionId !== '' ? data.sessionId : 'None'
                          }`
                        : 'Session: Unknown'
                    }`}</small>
                  </span>
                </div>
                <p className="guildDescription">{`Reason: ${data.note}`}</p>
              </span>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Index;
