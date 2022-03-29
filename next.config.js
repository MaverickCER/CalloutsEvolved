const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const headers = async () => {
  return [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
      ],
    },
  ];
};

module.exports = withPWA({
  images: {
    domains: [
      "console.firebase.google.com",
      "firebasestorage.googleapis.com",
      "miro.medium.com",
      "files.stripe.com",
    ],
  },
  reactStrictMode: true,
  env: {
    FIREBASE_PROJECT_ID: "calloutsevolved",
  },
  pwa: {
    dest: "public",
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
  },
  headers,
});
