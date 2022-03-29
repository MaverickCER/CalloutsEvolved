import { useEffect } from 'react';
import { hotjar } from 'react-hotjar';
import Layout from '../components/Layout';
import { AuthProvider } from '../contexts/AuthContext';
import { analytics } from '../firebase/firebaseClient';
import { useRouter } from 'next/router';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const routers = useRouter();

  useEffect(() => {
    hotjar.initialize(2873078, 6);
    const logEvent = (url) => {
      analytics().setCurrentScreen(url);
      analytics().logEvent('screen_view', {
        screen_name: url,
      });
    };

    routers.events.on('routeChangeComplete', logEvent);
    //For First Page
    logEvent(window.location.pathname);

    //Remvove Event Listener after un-mount
    return () => {
      routers.events.off('routeChangeComplete', logEvent);
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
