import '../styles/globals.css';

import { getAnalytics, isSupported, logEvent } from 'firebase/analytics';

import { AuthProvider } from '../context/AuthContext';
import Layout from '../components/Layout';
import { SettingsProvider } from '../context/SettingsContext';
import { hotjar } from 'react-hotjar';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// import PushNotificationsProvider from '../context/PushContext';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    hotjar.initialize(2873078, 6);

    const routerEvent = () => {
      if (isSupported()) {
        const analytics = getAnalytics();
        logEvent(analytics, 'screen_view', {
          screen_name: router.pathname,
        });
      }
    };
    routerEvent();

    router.events.on('routeChangeComplete', routerEvent);
    return () => {
      router.events.off('routeChangeComplete', routerEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events]);

  return (
    <>
    {/* <PushNotificationsProvider> */}
      <AuthProvider>
        <SettingsProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SettingsProvider>
      </AuthProvider>
    {/* </PushNotificationsProvider> */}
    </>
  );
}

export default MyApp;
