import crypto from 'crypto';

const isProd = process.env.NODE_ENV === 'production';

const getCsp = (inlineScriptSource) => {
  const csp = [];
  const hash = crypto.createHash('sha256').update(inlineScriptSource);

  csp.push(`base-uri 'self'`);
  csp.push(`form-action 'self'`);
  csp.push(`default-src 'self'`);
  csp.push(
    `script-src 'self' https://*.firebaseio.com https://cdn.firebase.com https://js.stripe.com https://ajax.googleapis.com/ajax/ https://cdnjs.cloudflare.com/ajax/ https://activity-project-unit.herokuapp.com'sha256-${hash.digest(
      'base64'
    )}'`
  );
  csp.push(
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net/npm/ https://cdnjs.cloudflare.com/ajax/`
  );
  csp.push(
    `connect-src 'self' vitals.vercel-insights.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com wss://*.firebaseio.com   https://firestore.googleapis.com`
  );
  csp.push(`img-src * data: blob:`);
  csp.push(`font-src 'self' data:`);
  csp.push(`frame-src *`);
  csp.push(`media-src *`);

  return csp.join('; ');
};

module.exports = {
  getCsp,
};
