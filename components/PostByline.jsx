import DateFormatter from './DateFormatter';
import Link from 'next/link';

const PostByline = (props) => {
  const author = props.authors.length === 1 ? props.authors[0] : props.authors.slice(-1);
  const authors = props.authors.length === 1 ? null : props.authors.slice(0, -1);

  return (
    <>
      By{' '}
      {authors ? (
        <>
          {authors.map((a) => (
            <>
              <Link href={`/user/${a.userId}`}>
                <u>{a.name}</u>
              </Link>
              {', '}
            </>
          ))}
          and{' '}
          <Link href={`/user/${author.userId}`}>
            <u>{author.name}</u>
          </Link>
        </>
      ) : (
        <Link href={`/user/${author.userId}`}>
          <u>{author.name}</u>
        </Link>
      )}{' '}
      on <DateFormatter dateNumber={props.date} />
    </>
  );
};

export default PostByline;
