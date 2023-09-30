import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push(`/user/${currentUser.uid}`);
    } else {
      router.push('/lfg');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <></>;
};

export default Index;
