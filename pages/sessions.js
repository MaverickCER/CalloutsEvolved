import Head from 'next/head';
import Link from 'next/link';
import DisplayData from '../components/DisplayData';
import ManageSub from '../components/ManageSub';

const Sessions = () => {
  return (
    <div>
      <Head>
        <title>Callouts Evolved | Session</title>
        <meta
          name='description'
          content='Free online virtual microphone or augmentative and alternative communicateion (AAC) to improve call outs in video games.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Session</h1>
      <DisplayData />
      <Link href={'/updateProfile'}>
        <a>update profile</a>
      </Link>
      <ManageSub />
    </div>
  );
};

export default Sessions;
