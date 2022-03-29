import { useEffect } from 'react';
import { hotjar } from 'react-hotjar';
import Layout from '../components/Layout';
import { AuthProvider } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import * as gtag from '../gtag/gtag';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    hotjar.initialize(2873078, 6);
  }, []);

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
