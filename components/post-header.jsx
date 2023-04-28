import Avatar from './avatar';
import CoverImage from './cover-image.jsx';

export default function PostHeader({ title, coverImage, date, author }) {
  return (
    <>
      <div className="mb-8 md:mb-16 sm:mx-0" style={{ maxHeight: '600px', overflow: 'hidden' }}>
        <CoverImage title={title} src={coverImage} height={620} width={1240} />
      </div>
      <div className="max-w-2xl mx-auto" style={{width: '90vw', maxWidth: '800px', margin: 'auto'}}>
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} date={date} />
        </div>
      </div>
    </>
  );
}
