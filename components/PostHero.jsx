const PostHero = (props) => {
  return (
    <div style={{ height: '400px', overflow: 'hidden', position: 'relative' }}>
      <img
        src={props.src}
        alt={`Cover Image for blog post titled ${props.title} on Callouts Evolved`}
        style={{
          width: '100%',
          height: 'auto',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />
    </div>
  );
}

export default PostHero;