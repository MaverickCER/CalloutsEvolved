import crypto from 'crypto';

const isProd = process.env.NODE_ENV === 'production';

const getCsp = (inlineScriptSource) => {
  const csp = [];
  const hash = crypto.createHash('sha256').update(inlineScriptSource);

  csp.push(`base-uri 'self'`);
  csp.push(
    `connect-src 'self' https://us-central1-calloutsevolved.cloudfunctions.net https://firebaseinstallations.googleapis.com http://static.hotjar.com https://www.googletagmanager.com https://www.google-analytics.com https://firebase.googleapis.com vitals.vercel-insights.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com wss://*.firebaseio.com https://firestore.googleapis.com https://www.paypal.com https://c.paypal.com https://www.sandbox.paypal.com https://b.sbox.stats.paypal.com/ https://id.twitch.tv https://api.igdb.com`
  );
  csp.push(`default-src 'self' data:`);
  csp.push(`font-src 'self' data:`);
  csp.push(`form-action 'self'`);
  csp.push(`frame-src *`);
  csp.push(`img-src * data: blob:`);
  csp.push(`media-src *`);
  csp.push(
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com http://*.hotjar.com https://*.hotjar.com https://www.googletagmanager.com https://www.google-analytics.com https://*.firebaseio.com https://cdn.firebase.com https://www.paypal.com https://www.paypal.com/sdk https://c.paypal.com https://www.sandbox.paypal.com https://b.sbox.stats.paypal.com/`
  );
  csp.push(`style-src 'self' 'unsafe-inline'`);

  return csp.join('; ');
};

module.exports = {
  getCsp,
};
