export const pageview = (url) => {
  window.gtag('config', process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID, {
    page_path: url,
  });
};
export const event = ({ action, params }) => {
  window.gtag('event', action, params);
};
