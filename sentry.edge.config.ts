// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://07f891fe3d9e2c4ab2c7bc9dbc3de6e7@o17950.ingest.us.sentry.io/4508461097091072",

  // No tracesSampleRate: tracing is off. Every traced request is billed as a Sentry performance unit, and we only use
  // Sentry for errors.

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
