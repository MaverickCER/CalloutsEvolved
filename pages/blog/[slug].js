import ErrorPage from 'next/error';
import Head from 'next/head';
import { get, ref } from 'firebase/database';
import { ref as storageRef, getDownloadURL, listAll } from "firebase/storage";
import { useRouter } from 'next/router';
import PostAuthors from '../../components/PostAuthors';
import PostByline from '../../components/PostByline';
import PostContent from '../../components/PostContent';
import PostFeedback from '../../components/PostFeedback';
import PostHero from '../../components/PostHero';
import PostNavigation from '../../components/PostNavigation';
import PostShare from '../../components/PostShare';
import PostTitle from '../../components/PostTitle';
import { database, storage } from '../../lib/firebase';

export default function Blog({ post }) {
  const router = useRouter();
  if (!router.isFallback && !post.content) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <Head>
            <title>Callouts Evolved | Blog - {post.meta.title}</title>
            <meta property='og:image' content={post.meta.ogImage} />
            <meta property='description' content={post.meta.description} />
          </Head>
          <PostHero src={post.coverImage} title={post.meta.title} />
          <div style={{ width: '90vw', maxWidth: '800px', margin: 'auto' }}>
            <PostTitle title={post.meta.title} />
            <PostByline authors={post.authors} date={post.date} />
            <PostShare honor={post.honor} slug={post.meta.title.toLowerCase().replace(/ /gi, '-')} views={post.views}  />
            <PostContent content={post.content} />
            <PostFeedback authors={post.authors.map((a) => a.userId)} slug={post.meta.title.toLowerCase().replace(/ /gi, '-')} />
            <PostAuthors authors={post.authors} />
            <PostNavigation
              previous={post.previous}
              next={post.next}
            />
          </div>
        </>
      )}
    </>
  );
}

export async function getStaticProps({ params }) {
  let post = await get(ref(database, `blog/${params.slug}`)).then((snapshot) => snapshot?.val());

  // get content
  await getDownloadURL(storageRef(storage, `blog/${params.slug}/content.md`))
  .then(async (url) => {
    if (url) {
      await fetch(url).then((res) => res.text()).then((res) => {
        post.content = res;
      });
    }
  })
  .catch((error) => {
    console.error(error);
  });

  // get cover image
  await getDownloadURL(storageRef(storage, `blog/${params.slug}/coverImage_1920x3840.webp`))
  .then(async (url) => {
    if (url) {
      post.coverImage = url;
    } else {
      post.coverImage = '/blog/default.webp';
    }
  })
  .catch((error) => {
    console.error(error);
    post.coverImage = '/blog/default.webp';
  });

  let authors = await Promise.all(Object.entries(post.authors).map(async (arr) => {
    let data = await get(ref(database, `author/${arr[0]}`)).then((snapshot) => snapshot?.val());
    if (typeof data === "object") {
      data.role = arr[1];
      await getDownloadURL(storageRef(storage, `avatars/${arr[0]}_400x800.webp`))
      .then((url) => {
        if (url) {
          data.picture = url;
        }
      })
      .catch((error) => {
        console.error(error);
        data.picture = '/avatars/default.webp';
      });
      return data;
    }
    return undefined;
  }));
  authors = authors.filter((a) => a !== undefined);

  let previous = null, next = null, previousAuthors, nextAuthors;
  if (post.previous) {
    previous = await get(ref(database, `blogs/${post.language}/${post.previous}`)).then((snapshot) => snapshot?.val());
    await getDownloadURL(storageRef(storage, `blog/${post.previous}/coverImage_400x800.webp`))
    .then(async (url) => {
      if (url) {
        previous.coverImage = url;
      } else {
        previous.coverImage = '/blog/default.webp';
      }
    })
    .catch((error) => {
      console.error(error);
      previous.coverImage = '/blog/default.webp';
    });

    previousAuthors = await Promise.all(Object.entries(previous.authors).map(async (arr) => {
      let data = await get(ref(database, `author/${arr[0]}`)).then((snapshot) => snapshot?.val());
      if (typeof data === "object") {
        data.role = arr[1];
        return data;
      }
      return undefined;
    }));
    previousAuthors = previousAuthors.filter((a) => a !== undefined);

    previous.authors = previousAuthors
  }

  if (post.next) {
    next = await get(ref(database, `blogs/${post.language}/${post.next}`)).then((snapshot) => snapshot?.val());
    await getDownloadURL(storageRef(storage, `blog/${post.next}/coverImage_400x800.webp`))
    .then(async (url) => {
      if (url) {
        next.coverImage = url;
      } else {
        next.coverImage = '/blog/default.webp';
      }
    })
    .catch((error) => {
      console.error(error);
      next.coverImage = '/blog/default.webp';
    });

    nextAuthors = await Promise.all(Object.entries(next.authors).map(async (arr) => {
      let data = await get(ref(database, `author/${arr[0]}`)).then((snapshot) => snapshot?.val());
      if (typeof data === "object") {
        data.role = arr[1];
        return data;
      }
      return undefined;
    }));
    nextAuthors = nextAuthors.filter((a) => a !== undefined);
    next.authors = nextAuthors;
  }

  return {
    props: {
      post: {
        ...post,
        authors,
        previous,
        next
      },
    },
  };
}

export async function getStaticPaths() {
  const slugs = await get(ref(database, `slugs`)).then((snapshot) => snapshot?.val());

  return {
    paths: Object.keys(slugs).map((slug) => {
      return {
        params: { slug },
      };
    }),
    fallback: false,
  };
}
