import {
  get,
  ref,
  query,
  orderByChild,
  limitToLast,
  endBefore,
  limitToFirst,
  startAfter,
} from 'firebase/database';
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { database, storage } from '../lib/firebase';

export async function getBlogs(lastResult, direction = 'previous', lang = 'en', results = 6) {
  let queryContraints = [];
  queryContraints.push(orderByChild('date'));
  if (direction === 'next') {
    queryContraints.push(limitToFirst(results));
    if (lastResult) {
      queryContraints.push(startAfter(lastResult));
    }
  } else {
    queryContraints.push(limitToLast(results));
    if (lastResult) {
      queryContraints.push(endBefore(lastResult));
    }
  }

  let blogs = await get(query(ref(database, `blogs/${lang}`), ...queryContraints)).then((snapshot) =>
    snapshot?.val()
  );
  if (blogs === null) return [];
  let posts = await Promise.all(Object.values(blogs).map(async (blog) => {
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

    let authors = await Promise.all(Object.entries(blog.authors).map(async (author) => {
      let authorObj = await get(ref(database, `author/${author[0]}`)).then((snapshot) => snapshot?.val());
      if (authorObj) {
        authorObj.role = author[1];
        return authorObj;
      }
      return undefined;
    }));
    if (Array.isArray(authors)) {
      authors = authors.filter((a) => a !== undefined);
      if (authors.length > 0) {
        return { ...blog, coverImage, authors };
      }
    }
    return undefined;
  }));

  if (Array.isArray(posts)) {
    posts = posts.filter((p) => p !== undefined);
  } else {
    posts = [];
  }

  return posts;
}
