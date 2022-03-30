import crypto from 'crypto';

const isProd = process.env.NODE_ENV === 'production';

const getCsp = (inlineScriptSource) => {
  const csp = [];
  const hash = crypto.createHash('sha256').update(inlineScriptSource);

  csp.push(`base-uri 'self'`);
  csp.push(
    `connect-src 'self' https://firebaseinstallations.googleapis.com https://www.google-analytics.com https://firebase.googleapis.com/v1alpha/projects/-/apps/1:580878402383:web:e352bf5ae81444a58f3b3a/webConfig vitals.vercel-insights.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com wss://*.firebaseio.com   https://firestore.googleapis.com`
  );
  csp.push(`default-src 'self' data:`);
  csp.push(`font-src 'self' data:`);
  csp.push(`form-action 'self'`);
  csp.push(`frame-src *`);
  csp.push(`img-src * data: blob:`);
  csp.push(`media-src *`);
  csp.push(
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com http://*.hotjar.com https://*.hotjar.com https://www.googletagmanager.com https://www.google-analytics.com https://*.firebaseio.com https://cdn.firebase.com https://js.stripe.com 'sha256-${hash.digest(
      'base64'
    )}'`
  );
  csp.push(`style-src 'self' 'unsafe-inline'`);

  return csp.join('; ');
};

module.exports = {
  getCsp,
};
