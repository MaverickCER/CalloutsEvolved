import React, { useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import ChevronIcon from '../../assets/ChevronIcon';
import FormInput from '../../components/ui/formInput';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../components/auth/authform.module.css';
import { useRouter } from 'next/router';
import { useSettings } from '../../context/SettingsContext';

const GuildId = (props) => {
  const inputRef = useRef(null);
  const messageRef = useRef(null);
  const { theme } = useSettings();
  const { query } = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });
  const messageInputValue = useWatch({ control, name: 'messageInputValue', defaultValue: '' });

  const onSubmit = (data) => {
    alert('Messages are disabled at this time');
  };

  return (
    <>
      <Head>
        <title>Callouts Evolved | Guild</title>
        <meta
          name="description"
          content="Join guilds focused on efficiently completing any video game activity."
        />
      </Head>

      <div style={{ display: 'flex', flexDirection: 'row', maxWidth: '100%' }}>
        {query.room !== 'about' && (
          <span
            style={{
              width: '33vw',
              maxWidth: '315px',
              overflowX: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 'calc(100vh - 2rem)',
            }}>
            <div>
              <div>
                <div className="guildBadge">
                  <span className="guildImageWrapper">
                    <img
                      src="https://pbs.twimg.com/profile_images/1100553496124887040/0hf7Nd-g_400x400.jpg"
                      alt="Name"
                      height={192}
                      width={144}
                    />
                  </span>
                  <span>
                    <p className="guildName" style={{ padding: '0', margin: '0' }}>
                      (LANG) Name
                    </p>
                    <small className="guildReputation">Reputation 0</small>
                    <br />
                    <small className="guildUsers">Users 300</small>
                  </span>
                </div>
                <p className="guildDescription">Short and sweet description</p>
              </div>
              <div>
                <Link href={`/guild/-N4G80rHunWzLf1IMz4n?room=about`} passHref>
                  <a className="guildLink">About</a>
                </Link>
                <br />
                <Link href={`/guild/-N4G80rHunWzLf1IMz4n?room=announcements`} passHref>
                  <a className="guildLink">Announcements</a>
                </Link>
                <br />
                <Link href={`/guild/-N4G80rHunWzLf1IMz4n?room=chat`} passHref>
                  <a className="guildLink">Chat</a>
                </Link>
                <br />
                <Link href={`/guild/-N4G80rHunWzLf1IMz4n?room=discord`} passHref>
                  <a className="guildLink">Discord</a>
                </Link>
                <br />
                <Link href={`/guild/-N4G80rHunWzLf1IMz4n?room=events`} passHref>
                  <a className="guildLink">Events</a>
                </Link>
                <br />
                <Link href={`/guild/-N4G80rHunWzLf1IMz4n?room=faq`} passHref>
                  <a className="guildLink">FAQ</a>
                </Link>
                <br />
                <Link href={`/guild/-N4G80rHunWzLf1IMz4n?room=rules`} passHref>
                  <a className="guildLink">Rules</a>
                </Link>
                <br />
                <Link href={`/guild/-N4G80rHunWzLf1IMz4n?room=support`} passHref>
                  <a className="guildLink">Support</a>
                </Link>
              </div>
            </div>
            <div style={{ marginBottom: '30px' }}>
              <Link href={`/guild/-N4G80rHunWzLf1IMz4n?room=settings`} passHref>
                <a className="guildLink">Settings</a>
              </Link>
              <br />
              <Link href={`/guild`} passHref>
                <a className="guildLink">More Guilds...</a>
              </Link>
            </div>
          </span>
        )}
        <span style={{ display: 'flex', flex: '1 1 auto', width: '100%' }}>
          {query.room === 'about' && (
            <div style={{ textAlign: 'center' }}>
              <h1>ABOUT NAME</h1>
              <p>
                Callouts Evolved will feature a public social system that allows users to form
                permanent groups
              </p>
              <p>
                Each blog post will have a unique guild that any other author can join. These guilds
                will allow authors to write blog posts that meet all legal requirements, provide
                proof that requirements are met, and allow for peer review of articles.
              </p>
              <p>
                Normal groups will have access to rooms dedicated to announcements, chat, discord,
                events, faq, rules, support, and a markdown based custom introduction screen.
              </p>
              <p>
                <Link href={`/guild/-N4G80rHunWzLf1IMz4n?room=announcements`} passHref>
                  <a className="guildLink">
                    Click HERE to check out the guild announcements room and see what we have to
                    offer
                  </a>
                </Link>
              </p>
              <br />
              <br />
              <br />
              <p>
                Note: for author blog post guilds, this room will display the blog post in compiled
                format for reviewers and allow the author to switch between edit mode and preview
                mode.
              </p>
            </div>
          )}
          {query.room === 'announcements' && (
            <div>
              Only guild members with announcement privelages will be able to send messages to these
              rooms. All guild members will be able to read these messages and will recieve a
              notification for each. This is in contrast to the other rooms where guild members can
              unsubscribe from notifications.
            </div>
          )}
          {query.room === 'chat' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100vh - 2rem)',
                width: '100%',
              }}>
              <div
                className="messageWrapper"
                ref={messageRef}
                style={{
                  overflowY: 'scroll',
                  overscrollBehaviorY: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: '1',
                  width: 'inherit',
                }}>
                <span>
                  <div className="guildBadge">
                    <span className="guildImageWrapper">
                      <img
                        src="https://i.imgur.com/nUhgJXq.png"
                        alt="Guild Member's Name"
                        height={192}
                        width={144}
                      />
                    </span>
                    <span>
                      <p className="guildName" style={{ margin: '0' }}>
                        Guild Member's Name
                      </p>
                      <small className="guildReputation">Title timestamp</small>
                      <br />
                      <small className="guildFooter" style={{ padding: '0', position: 'relative' }}>
                        <small>Honor: 0</small>
                        <span
                          className="btn-like-wrapper"
                          style={{ position: 'absolute', bottom: '0', right: '0' }}>
                          <button>
                            <ChevronIcon
                              width="1em"
                              height="1em"
                              style={{ width: '1rem', height: '1rem' }}
                              title="Dislike Icon"
                              fill={`rgb(${theme.mca})`}
                            />
                          </button>
                          <button>
                            <ChevronIcon
                              height="1em"
                              style={{ transform: 'rotate(180deg)', width: '1rem', height: '1rem' }}
                              title="Like Icon"
                              width="1em"
                              fill={`rgb(${theme.mca})`}
                            />
                          </button>
                        </span>
                      </small>
                    </span>
                  </div>
                  <p style={{ overflowWrap: 'break-word', marginTop: '0' }}>
                    Message sent by Guild Member's Name
                  </p>
                </span>
                <span>
                  <div className="guildBadge">
                    <span className="guildImageWrapper">
                      <img
                        src="https://i.imgur.com/FPLubfR.png"
                        alt="Guild Member's Name"
                        height={192}
                        width={144}
                      />
                    </span>
                    <span>
                      <p className="guildName" style={{ margin: '0' }}>
                        Guild Member
                      </p>
                      <small className="guildReputation">Owner 11:28 AM</small>
                      <br />
                      <small className="guildFooter" style={{ padding: '0', position: 'relative' }}>
                        <small>Honor: 9</small>
                        <span
                          className="btn-like-wrapper"
                          style={{ position: 'absolute', bottom: '0', right: '0' }}>
                          <button>
                            <ChevronIcon
                              width="1em"
                              height="1em"
                              style={{ width: '1rem', height: '1rem' }}
                              title="Dislike Icon"
                              fill={`rgb(${theme.mca})`}
                            />
                          </button>
                          <button>
                            <ChevronIcon
                              height="1em"
                              style={{ transform: 'rotate(180deg)', width: '1rem', height: '1rem' }}
                              title="Like Icon"
                              width="1em"
                              fill={`rgb(${theme.mca})`}
                            />
                          </button>
                        </span>
                      </small>
                    </span>
                  </div>
                  <p style={{ overflowWrap: 'break-word', marginTop: '0' }}>
                    Members can choose to recieve notications for all messages, direct mentions, or
                    title pings on a per room or per guild basis. Each chat room can have custom
                    participants/viewers. Participants have read and write access, viewers only have
                    read access.
                  </p>
                </span>
              </div>
              <form
                className={`${styles.form} sendMessageInputValue`}
                onSubmit={handleSubmit(onSubmit)}>
                <fieldset className={styles.fieldset} role="guild" aria-label="Update Display Name">
                  <FormInput
                    autoComplete="off"
                    btn="Send"
                    btnAction="submit"
                    error={errors.messageInputValue}
                    label=""
                    name="messageInputValue"
                    placeholder="Compose message"
                    ref={inputRef}
                    register={register('messageInputValue')}
                    maxLength={80}
                    required="false"
                    title="Say what you want to say..."
                    type="text"
                    val={messageInputValue}
                  />
                </fieldset>
              </form>
            </div>
          )}
          {query.room === 'discord' && (
            <div>
              Callouts Evolved will integrate with discord and allow you to connect the platforms.
              Any message sent on the selected discord channel will appear in this room and vice
              versa!
            </div>
          )}
          {query.room === 'events' && (
            <div>
              Members with events permissions will be able to create edit and delete any event from
              the calendar. Participants will be able to create, edit, and delete their own events,
              and join any event that doesn't contain a blacklist player. Viewers will only be able
              to attend events that do not contain a blacklist player. Blacklist players are players
              that have blocked you or that you have blocked. You cannot join sessions with players
              you cannot communicate with.
            </div>
          )}
          {query.room === 'faq' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100vh - 2rem)',
                width: '100%',
              }}>
              <div>
                <details>
                  <summary>What will this room be use for?</summary>
                  FAQ Channels can answer common questions posted by guild members and are guild
                  specific.
                </details>
              </div>
              <br />
              <div>
                <details>
                  <summary>What types of questions should be answered?</summary>
                  If your guild has requirments to stay in, your motto, mission statement, contest
                  rules etc.
                </details>
              </div>
              <br />
            </div>
          )}
          {query.room === 'rules' && (
            <div>
              Only guild members with rule privelages will be able to edit this room. Just like the
              about room, this page is written with markdown and can be customized to better fit the
              guild's needs. For author blog post guilds, this room will be uneditable and provide
              guidelines for writing / reviewing new blog posts.
            </div>
          )}
          {query.room === 'settings' && (<div>This room will display different settings per user. Guild Masters will be able to change the settings for every room and hall in the guild. Guild Members will be able to change their personal noticiation settings. Guild Members with special privelages will be able to change the settings granted.</div>)}
          {query.room === 'support' && (
            <div>
              This room will be used to generate support tickets or suggest new features. Each
              message sent will be converted into a private support ticket between guild members
              with support privelages and the member who created the ticket. The person making the
              ticket and the individuals responding will remain anonymous to everyone involved.
            </div>
          )}
        </span>
      </div>
    </>
  );
};

export default GuildId;
