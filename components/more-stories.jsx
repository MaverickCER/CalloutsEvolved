import PostPreview from './post-preview';

const MoreStories = ({ posts }) => {
  return (
    <section>
      <h2>More Stories</h2>
      <div>
        {posts.map((post) => (
          <div key={post.title + post.date}>
            <PostPreview
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
export default MoreStories;
