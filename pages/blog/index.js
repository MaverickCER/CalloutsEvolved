import React, { useEffect, useState } from 'react';

import ChevronIcon from '../../assets/ChevronIcon';
import Head from 'next/head';
import Link from 'next/link';
import { getAllPosts } from '../../lib/getPosts';
import { useSettings } from '../../context/SettingsContext';

const Blog = (props) => {
  const [blog, setBlog] = useState(props?.data);
  const [filteredBlogs, setFilteredBlogs] = useState(blog);
  const [lang, setLang] = useState('all')
  const { theme } = useSettings();

  useEffect(() => {
    if (lang === 'all') {
      setFilteredBlogs(blog);
    } else {
      setFilteredBlogs([...Object.values(blog).filter((b) => b.language === lang)]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  return (
    <>
      <Head>
        <title>Callouts Evolved | Blog</title>
      </Head>
      <div style={{ textAlign: 'center' }}>
        <h1>Blog</h1>
        <p>Anyone will be able to contribute to the Callouts Evolved blog in Markdown format.</p>
        <p>
          All posts will be peer reviewed, and should focus on accessibility within video games.
        </p>
        <p>
          Each blog post will have it&apos;s own author group to store all legal requirements, research,
          and collaboration tools.
        </p>

        <h2>How does this help us reach our dream?</h2>
        <p>
          A blog will help us reach a larger audience and at least get them thinking about video
          game communication from an accessibility standpoint. In addition, it will be the only part
          of the site that serves advertising content to help subsidize the development and use of
          new features.
        </p>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <label>
            <input type="text" placeholder="Search" />
          </label>
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="all">All</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
        </div>

        <div>
          <h4>Blog</h4>
          {Object.entries(filteredBlogs)
            .slice(0, 20)
            .map(([key, data]) => (
              <span key={key}>
                <Link href={`/blog/${data.slug}`} passHref>
                  <a className={`guildLink`}>
                    <div className="guildBadge">
                      <span className="guildImageWrapper">
                        <img src={data.coverImage} alt={data?.title} height={192} width={144} />
                      </span>
                      <span>
                        <p className="guildName">{`(${data?.language?.toUpperCase()}) ${
                          data.title
                        }`}</p>
                        <small className="guildReputation">{`Date ${data.date}`}</small>
                        <small className="guildUsers">{`Author ${data.author.name}`}</small>
                      </span>
                    </div>
                    <p className="guildDescription">{`${data.excerpt}`}</p>
                  </a>
                </Link>
                <div className="guildFooter">
                  <span>
                    <Link href={`/blog/${data.slug}`} key={key} passHref>
                      Read Post
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

export async function getStaticProps() {
  const allPosts = getAllPosts(['language', 'title', 'date', 'slug', 'author', 'coverImage', 'excerpt']);

  return {
    props: {
      data: { ...allPosts },
    },
  };
}

export default Blog;
