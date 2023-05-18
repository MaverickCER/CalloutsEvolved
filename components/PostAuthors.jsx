import Link from 'next/link';

const PostAuthors = (props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {props.authors.map((author, index) => (
        <Link href={`/user/${author.userId}`} style={{ display: 'block', maxWidth: '388px',  }} key={index}>
          <div style={{ height: '225px', overflow: 'hidden', position: 'relative' }}>
            <img
              src={author.picture || ''}
              alt={`Profile picture of ${author.name}`}
              style={{
                width: '100%',
                height: 'auto',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
          </div>
          <p><strong>{author.name}</strong> <small style={{ display: 'inline-block', padding: '4px', backgroundColor: 'skyblue', borderRadius: '4px' }}>{author.role}</small></p>
          <p>{author.brief}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <span>Characters: {author.characters}</span>
            <span style={{ textAlign: 'right' }}>
              <strong>See Posts</strong>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostAuthors;
