import React, { useEffect, useState } from 'react';

import { get, set, ref, query, orderByChild, limitToLast } from 'firebase/database';
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { database, storage } from '../../lib/firebase';
import Head from 'next/head';
import { useSettings } from '../../context/SettingsContext';
import { getBlogs } from '../../utils/blogs';
import PostCard from '../../components/PostCard';

const Blog = (props) => {
  const { theme, userData } = useSettings();
  const [blogs, setBlogs] = useState(props.posts);
  const [total, setTotal] = useState(props.total);
  const [page, setPage] = useState(1);
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const refreshBlogs = async (lang) => {
      const newBlogs = await getBlogs(undefined, 'previous', lang);
      if (newBlogs.length > 0) {
        setBlogs(newBlogs);
      }
      let count = await get(query(ref(database, `blogs/${lang}Count`))).then((snapshot) =>
        snapshot?.val()
      );
      setTotal(Math.ceil(count / 6));
    };
    refreshBlogs(lang);
    if (userData?.userId) {
      set(ref(database, `userData/${userData.userId}/language`), lang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    if (userData?.language) {
      setLang(userData?.language);
    }
  }, [userData?.langauge]);

  const next = async () => {
    const newBlogs = await getBlogs(blogs[blogs.length - 1].date, 'next', lang);
    if (newBlogs.length > 0) {
      setBlogs(newBlogs);
      setPage((prev) => prev + 1);
    }
  };

  const previous = async () => {
    const newBlogs = await getBlogs(blogs[0].date, 'previous', lang);
    if (newBlogs.length > 0) {
      setBlogs(newBlogs);
      setPage((prev) => prev - 1);
    }
  };

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
          Each blog post will have it&apos;s own author Guild to store all legal requirements,
          research, and collaboration tools.
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
            <input type='text' placeholder='Search' />
          </label>
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value='all'>All</option>
            <option value='en'>English</option>
            <option value='es'>Spanish</option>
          </select>
        </div>

        <div>
          <h4>Blog</h4>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {blogs.map((data, i) => (
              <PostCard key={i} post={data} />
            ))}
          </div>
          <div>
            {page}/{total}
          </div>
          <div>
            {page !== total && <span onClick={previous}>Previous</span>}
            {page !== 1 && <span onClick={next}>Next</span>}
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  let blogs = await get(
    query(ref(database, `blogs/en`), orderByChild('date'), limitToLast(6))
  ).then((snapshot) => snapshot?.val());
  let blogCount = await get(query(ref(database, `blogs/enCount`))).then((snapshot) =>
    snapshot?.val()
  );
  let posts = await Promise.all(
    Object.values(blogs).map(async (blog) => {
      let coverImage;
      await getDownloadURL(storageRef(storage, `blog/${blog.slug}/coverImage_400x800.webp`))
      .then(async (url) => {
        if (url) {
          coverImage = url;
        } else {
          coverImage = '/blog/default.webp';
        }
      })
      .catch((error) => {
        console.error(error);
        coverImage = '/blog/default.webp';
      });

      let authors = await Promise.all(
        Object.entries(blog.authors).map(async (author) => {
          let authorObj = await get(ref(database, `author/${author[0]}`)).then((snapshot) =>
            snapshot?.val()
          );
          if (authorObj) {
            authorObj.role = author[1];
            return authorObj;
          }
          return undefined;
        })
      );
      if (Array.isArray(authors)) {
        authors = authors.filter((a) => a !== undefined);
        if (authors.length > 0) {
          return { ...blog, coverImage, authors };
        }
      }
      return undefined;
    })
  );

  if (Array.isArray(posts)) {
    posts = posts.filter((p) => p !== undefined);
  } else {
    posts = [];
  }

  return {
    props: {
      posts: posts,
      total: Math.ceil(blogCount / 6),
    },
  };
}

export default Blog;
