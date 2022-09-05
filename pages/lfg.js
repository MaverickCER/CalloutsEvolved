import React, { useState } from 'react';

import CrossPlatformIcon from '../assets/CrossPlatformIcon';
import Head from 'next/head';
import Link from 'next/link';
import NintendoIcon from '../assets/NintendoIcon';
import OtherPlatformIcon from '../assets/OtherPlatformIcon';
import PlayStationIcon from '../assets/PlayStationIcon';
import SteamIcon from '../assets/SteamIcon';
import XboxIcon from '../assets/XboxIcon';

const preload = {
  0: {
    activity: "Activity: King's Fall",
    description: 'Description: 10+ Clears | KWTD | Challenge | No mics needed!',
    game: 'Game: Destiny 2',
    isDeaf: false,
    isOpen: false,
    isPublic: true,
    lang: 'lang',
    platform: 'xbox',
    sessionPhotoURL: 'https://static-cdn.jtvnw.net/ttv-boxart/497057-144x192.jpg',
    timestamp: 1656859510732,
    usersCount: 2,
    usersMax: 6,
  },
};

const Lfg = (props) => {
  const [sessions, setSessions] = useState(props?.data);

  return (
    <div>
      <Head>
        <title>Callouts Evolved | LFG</title>
        <meta
          name="description"
          content="Join guilds focused on efficiently completing any video game activity."
        />
      </Head>
      <div style={{ textAlign: 'center' }}>
        <h1>Looking For Group</h1>
        <p>
          <Link href={'/sessions'} passHref>
            <a>
              <u>Sessions</u>{' '}
            </a>
          </Link>
          are a core aspect of Callouts Evolved and provide a shared Augmentative and Alternative
          Communication system that allows gamers to communicate in real time without relying on
          mics!
        </p>
        <p>
          This page will automatically show all active sessions that are not full so that users
          don't have to manually indicate that they are looking for more players.
        </p>
        <h2>How does this help us reach our dream?</h2>
        <p>
          A accessibility focused lfg platform is paramount to our success. The reality is that even
          though the platform will only require 3 clicks from the average gamer to unlock all of our
          accessibility features, many gamers will not be willing to do so.
        </p>
        <p>
          Until the site gains more notoriety, we need a system that will automatically fill
          sessions based on what the user needs. In addition, other lfg platforms fail to ensure
          that users are capable of completing the selected activity. To help mitigate this issue,
          subscribers will be able to require a certain number of completions before the user can
          even join the session!
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '280px auto' }}>
        <div>
          <h4>Filter</h4>
          <p>
            Form to filter guilds based on name, description, or laungauge, and sort based on
            repuation, or users
          </p>
          <p>
            Form to filter groups based on game, platform, activity, language, and description.
            Groups are automatically sorted so that the sessions with the most recent activity show
            up first.
          </p>
        </div>

        <div>
          <h4>Groups</h4>
          {Object.entries(sessions).map(([key, data]) => {
            return (
              <Link href={`/sessions`} key={key} passHref>
                <a className={`sessionLink${sessions === { preload } ? ' sr-only' : ''}`}>
                  {data.sessionPhotoURL && (
                    <span className="guildImageWrapper">
                      <img src={data.sessionPhotoURL} alt={data.game} height={192} width={144} />
                    </span>
                  )}
                  <span>
                    <small>{`(${data.lang.toUpperCase()}) ${data.activity}`}</small>
                    <p>{`${data.description}`}</p>
                    <small>
                      {`${data.game}`}&nbsp;
                      <span>
                        {data.platform === 'all' ? (
                          <CrossPlatformIcon width="1em" height="1em" />
                        ) : data.platform === 'nintendo' ? (
                          <NintendoIcon width="1em" height="1em" n />
                        ) : data.platform === 'playstation' ? (
                          <PlayStationIcon width="1em" height="1em" />
                        ) : data.platform === 'steam' ? (
                          <SteamIcon width="1em" height="1em" />
                        ) : data.platform === 'xbox' ? (
                          <XboxIcon width="1em" height="1em" />
                        ) : (
                          <OtherPlatformIcon width="1em" height="1em" />
                        )}
                      </span>
                      &nbsp;
                      {`${data.usersCount}/${data.usersMax}`}
                    </small>
                  </span>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    return {
      props: {
        data: { ...preload },
      },
    };
  } catch (error) {
    console.error(error.message);
    return {
      props: { data: 'error' },
    };
  }
};

export default Lfg;
