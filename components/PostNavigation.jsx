import Link from 'next/link';
import PostCard from './PostCard';

const PostNavigation = (props) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        maxWidth: '816px',
        margin: 'auto',
      }}>
      <span>
        {props.previous && <PostCard post={props.previous} />}
      </span>
      <span>
        {props.next && <PostCard post={props.next} />}
      </span>
    </div>
  );
};

export default PostNavigation;
