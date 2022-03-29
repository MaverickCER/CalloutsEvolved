import crypto from "crypto";

const isProd = process.env.NODE_ENV === "production";

const getCsp = (inlineScriptSource) => {
  const csp = [];
  const hash = crypto.createHash("sha256").update(inlineScriptSource);

  csp.push(`base-uri 'self'`);
  csp.push(`form-action 'self'`);
  csp.push(`default-src 'self'`);
  csp.push(
    `script-src 'self'${
      isProd ? "" : ` 'unsafe-eval'`
    }  https://*.firebaseio.com https://cdn.firebase.com https://js.stripe.com 'sha256-${hash.digest(
      "base64"
    )}'`
  );
  csp.push(`style-src 'self'  'unsafe-inline'`);
  csp.push(
    `connect-src 'self' vitals.vercel-insights.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com wss://*.firebaseio.com   https://firestore.googleapis.com`
  );
  csp.push(`img-src * data: blob:`);
  csp.push(`font-src 'self' data:`);
  csp.push(`frame-src *`);
  csp.push(`media-src *`);

  return csp.join("; ");
};

module.exports = {
  getCsp,
};
