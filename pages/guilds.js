import React, { useEffect, useState } from 'react';

import ChevronIcon from '../assets/ChevronIcon';
import Head from 'next/head';
import Link from 'next/link';
import { useSettings } from '../context/SettingsContext';

const preload = {
  '-N4G80rHunWzLf1IMz4n': {
    defaultRoom: 'about',
    description: 'Short and sweet description',
    displayName: 'Name',
    guildId: '-N4G80rHunWzLf1IMz4n',
    guildPhotoURL: 'https://pbs.twimg.com/profile_images/1100553496124887040/0hf7Nd-g_400x400.jpg',
    isPublic: true,
    lang: 'lang',
    reputation: 0,
    timestamp: 1654933730433,
    users: 300,
  },
};

const Guilds = (props) => {
  const [guilds, setGuilds] = useState(props?.data);
  const [portrait, setPortrait] = useState();
  const { theme } = useSettings();

  useEffect(() => {
    function handleResize() {
      setPortrait(window.innerWidth < window.innerHeight);
    }

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [portrait]);

  return (
    <>
      <Head>
        <title>Callouts Evolved | Guilds</title>
        <meta
          name="description"
          content="Join guilds focused on efficiently completing any video game activity."
        />
      </Head>

      <div style={{ textAlign: 'center' }}>
        <h1>Guilds</h1>
        <p>
          Callouts Evolved will feature a public social system that allows users to form permanent
          groups
        </p>
        <p>
          Each blog post will have a unique guild that any other author can join. These guilds will
          allow authors to write blog posts that meet all legal requirements, provide proof that
          requirements are met, and allow for peer review of articles.
        </p>
        <p>
          Normal groups will have access to rooms dedicated to announcements, chat, discord, events,
          faq, rules, support, and a markdown based custom introduction screen.
        </p>
        <h2>How does this help us reach our dream?</h2>
        <p>
          Firstly, we need to provide an in house solution for our authors to properly produce,
          research, cite, and address legal concerns for each blog post. Such a platform is not far
          off from a dedicated social area and we believe that a first party gamer centric approach
          with a focus on accessibility will allow our audience to find more like minded individuals
          to complete end game activities with.
        </p>
      </div>
      {portrait}
      <div style={{ display: 'grid', gridTemplateColumns: portrait ? '1fr' : '280px auto' }}>
        <div>
          <h4>Filter</h4>
          <p>
            Form to filter guilds based on name, description, laungauge, or blog post (authors
            only), and sort based on activity, repuation, or users
          </p>
        </div>

        <div>
          <h4>Guilds</h4>

          {Object.entries(guilds)
            .slice(0, 20)
            .map(([key, data]) => (
              <span key={key}>
                <Link href={`/guild/${key}?room=${data.defaultRoom}`} key={key} passHref>
                  <a className={`guildLink${guilds === { preload } ? ' sr-only' : ''}`}>
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
                <div className="guildFooter">
                  <span>
                    <Link href={`/guild/${key}?room=${data.defaultRoom}`} key={key} passHref>
                      Join Guild
                    </Link>
                  </span>
                  <span className="btn-like-wrapper">
                    <button>
                      <ChevronIcon
                        width="1em"
                        height="1em"
                        style={{ width: '1rem', height: '1rem' }}
                        title="Dislike Icon"
                        fill={data.like === false ? `rgb(${theme.bbc})` : `rgb(${theme.mca})`}
                      />
                    </button>
                    <button>
                      <ChevronIcon
                        height="1em"
                        style={{ transform: 'rotate(180deg)', width: '1rem', height: '1rem' }}
                        title="Like Icon"
                        width="1em"
                        fill={data.like ? `rgb(${theme.bbc})` : `rgb(${theme.mca})`}
                      />
                    </button>
                  </span>
                </div>
              </span>
            ))}
        </div>
      </div>
    </>
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

export default Guilds;
