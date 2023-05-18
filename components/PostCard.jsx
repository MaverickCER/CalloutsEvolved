import Link from 'next/link';
import PostByline from './PostByline';

const PostCard = (props) => {
  return (
    <span style={{ maxWidth: '400px' }}>
      <div className='guildBadge'>
        <Link href={`/blog/${props.post?.slug}`} className={`guildImageWrapper`}>
          <img src={props.post?.coverImage} alt={props.post?.title} height={192} width={144} />
        </Link>
        <span>
          <Link href={`/blog/${props.post?.slug}`} className={`guildLink`}>
            <p className='guildName'>{`(${props.post?.language?.toUpperCase()}) ${
              props.post?.title
            }`}</p>
          </Link>
          <small className='guildReputation' style={{ paddingLeft: '8px' }}>
            <PostByline authors={props.post?.authors} date={props.post?.date} />
          </small>
        </span>
      </div>

      <Link href={`/blog/${props.post?.slug}`} className={`guildLink`}>
        <p className='guildDescription'>{`${props.post?.excerpt}`}</p>
        <div className='guildFooter'>
          <strong>Read Post</strong>
        </div>
      </Link>
    </span>
  );
};

export default PostCard;
