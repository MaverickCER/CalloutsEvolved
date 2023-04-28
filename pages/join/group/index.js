import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/guilds');
  }, [router]);

  return <></>;
};

export default Index;
