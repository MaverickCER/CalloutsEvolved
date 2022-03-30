import { useEffect } from 'react';
import { hotjar } from 'react-hotjar';
import { getAnalytics, logEvent, isSupported } from 'firebase/analytics';
import Layout from '../components/Layout';
import { AuthProvider } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    hotjar.initialize(2873078, 6);

    const routerEvent = (url) => {
      if (isSupported()) {
        const analytics = getAnalytics();
        logEvent(analytics, 'screen_view', {
          screen_name: url,
        });
      }
    };
    routerEvent(window.location.pathname);

    router.events.on('routeChangeComplete', routerEvent);
    return () => {
      router.events.off('routeChangeComplete', routerEvent);
    };
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
