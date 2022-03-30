import Container from './container';

export default function Alert({ preview }) {
  return (
    <div className='border-b bg-accent-7 border-accent-7 text-white'>
      <Container>
        <div className='py-2 text-center text-sm'>
          {preview ? (
            <>
              This page is a preview.{' '}
              <a
                href='/api/exit-preview'
                className='underline hover:text-cyan duration-200 transition-colors'>
                Click here
              </a>{' '}
              to exit preview mode.
            </>
          ) : (
            <>
              The source code for this blog is{' '}
              <a
                href={`https://www.github.com`}
                className='underline hover:text-success duration-200 transition-colors'>
                available on GitHub
              </a>
              .
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
