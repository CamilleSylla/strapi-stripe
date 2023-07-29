module.exports = ({env}) => [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            process.env.MEDIA_BUCKET,
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            `https://${env("MEDIA_BUCKET")}`,
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:3333', 'http://localhost:1337'],
      methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
      headers: '*',
      keepHeaderOnError: true,

    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
