import { useEffect } from 'react';
import { ref, increment, update } from 'firebase/database';
import { database } from '../lib/firebase';

const PostShare = (props) => {
  useEffect(() => {
    const updates = {};
    updates[`blog/${props.slug}/views`] = increment(1);
    update(ref(database), updates);
  }, [props.slug]);

  return (
    <p>
      Views:&nbsp;{props.views || 1} Honor:&nbsp;{props.honor || 0} Share:&nbsp;
      <a
        href={`https://www.facebook.com/sharer.php?u=https://www.calloutsevolved.com/blog/${props.slug}`}
        target='_blank'
        rel='noreferrer'>
        <svg
          style={{ width: '1em', height: '1em', marginBottom: '-.1em' }}
          xmlns='http://www.w3.org/2000/svg'
          aria-label='Facebook'
          role='img'
          viewBox='0 0 512 512'>
          <rect width='512' height='512' fill='#1877f2' />
          <path
            d='M356 330l11-74h-71v-48q1-40 42-40h32v-63q-34-5-57-5c-60 0-97 36-97 100v56H151v74h65v182h80V330z'
            fill='#fff'
          />
        </svg>
      </a>
      &nbsp;
      <a href={`https://twitter.com/share?url=https://www.calloutsevolved.com/blog/${props.slug}`} target='_blank' rel='noreferrer'>
        <svg
          style={{ width: '1em', height: '1em', marginBottom: '-.1em' }}
          xmlns='http://www.w3.org/2000/svg'
          aria-label='Twitter'
          role='img'
          viewBox='0 0 512 512'>
          <rect width='512' height='512' fill='#1da1f2' />
          <path
            fill='#fff'
            d='M437 152a72 72 0 01-40 12a72 72 0 0032-40a72 72 0 01-45 17a72 72 0 00-122 65a200 200 0 01-145-74a72 72 0 0022 94a72 72 0 01-32-7a72 72 0 0056 69a72 72 0 01-32 1a72 72 0 0067 50a200 200 0 01-105 29a200 200 0 00309-179a200 200 0 0035-37'
          />
        </svg>
      </a>
      &nbsp;
      <a
        href={`https://www.linkedin.com/shareArticle?url=https://www.calloutsevolved.com/blog/${props.slug}`}
        target='_blank'
        rel='noreferrer'>
        <svg
          style={{ width: '1em', height: '1em', marginBottom: '-.1em' }}
          xmlns='http://www.w3.org/2000/svg'
          aria-label='LinkedIn'
          role='img'
          viewBox='0 0 512 512'
          fill='#fff'>
          <rect width='512' height='512' fill='#0077b5' />
          <circle cx='142' cy='138' r='37' />
          <path stroke='#fff' strokeWidth='66' d='M244 194v198M142 194v198' />
          <path d='M276 282c0-20 13-40 36-40 24 0 33 18 33 45v105h66V279c0-61-32-89-76-89-34 0-51 19-59 32' />
        </svg>
      </a>
      &nbsp;
      <a href={`https://reddit.com/submit?url=https://www.calloutsevolved.com/blog/${props.slug}`} target='_blank' rel='noreferrer'>
        <svg
          style={{ width: '1em', height: '1em', marginBottom: '-.1em' }}
          xmlns='http://www.w3.org/2000/svg'
          aria-label='Reddit'
          role='img'
          viewBox='0 0 512 512'>
          <rect width='512' height='512' fill='#f40' />
          <g fill='#fff'>
            <ellipse cx='256' cy='307' rx='166' ry='117' />
            <circle cx='106' cy='256' r='42' />
            <circle cx='407' cy='256' r='42' />
            <circle cx='375' cy='114' r='32' />
          </g>
          <g strokeLinecap='round' strokeLinejoin='round' fill='none'>
            <path d='m256 196 23-101 73 15' stroke='#fff' strokeWidth='16' />
            <path d='m191 359c33 25 97 26 130 0' stroke='#f40' strokeWidth='13' />
          </g>
          <g fill='#f40'>
            <circle cx='191' cy='287' r='31' />
            <circle cx='321' cy='287' r='31' />
          </g>
        </svg>
      </a>
      &nbsp;
      <a
        href={`mailto:?subject='Check out this article'&body='$[${props.slug}]'`}
        target='_blank'
        rel='noreferrer'>
        <svg
          style={{ width: '1em', height: '1em', marginBottom: '-.1em' }}
          xmlns='http://www.w3.org/2000/svg'
          aria-label='Mail'
          role='img'
          viewBox='0 0 512 512'>
          <rect width='512' height='512' fill='#328cff' />
          <path
            d='m250 186c-46 0-69 35-69 74 0 44 29 72 68 72 43 0 73-32 73-75 0-44-34-71-72-71zm-1-37c30 0 57 13 77 33 0-22 35-22 35 1v150c-1 10 10 16 16 9 25-25 54-128-14-187-64-56-149-47-195-15-48 33-79 107-49 175 33 76 126 99 182 76 28-12 41 26 12 39-45 19-168 17-225-82-38-68-36-185 67-248 78-46 182-33 244 32 66 69 62 197-2 246-28 23-71 1-71-32v-11c-20 20-47 32-77 32-57 0-108-51-108-108 0-58 51-110 108-110'
            fill='#fff'
          />
        </svg>
      </a>
    </p>
  );
};

export default PostShare;
