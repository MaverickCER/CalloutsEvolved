import Link from 'next/link';
import Image from 'next/image';

export default function CoverImage({ title, src, slug, height, width }) {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className='hover:shadow-md transition-shadow duration-200'
      layout='responsive'
      width={width}
      height={height}
    />
  );
  return (
    <div className='sm:mx-0'>
      {slug ? (
        <Link href={`/blog/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
