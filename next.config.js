const path = require("path");
const integrationsRedirects = require("./redirects/integrations");
const blogRedirects = require("./redirects/blog");
const miscellaneousRedirects = require("./redirects/miscellaneous");

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_HERMES_BASE_URL: process.env.NEXT_PUBLIC_HERMES_BASE_URL || "https://hermes.tutorcruncher.com",
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID || "GTM-M6QLN6V3"
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.prismic.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "tutorcruncher.com",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `
    @use "src/styles/abstracts.scss" as *;
    `,
  },
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [...integrationsRedirects, ...blogRedirects, ...miscellaneousRedirects];
  },
  async rewrites() {
    return [
      {
        source: "/.well-known/openapi.yaml",
        destination: "https://secure.tutorcruncher.com/api/schema/",
      },
    ];
  },
};

module.exports = nextConfig;


// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    org: "tutorcruncher",
    project: "aglaea",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Automatically annotate React components to show their full name in breadcrumbs and session replay
    reactComponentAnnotation: {
      enabled: true,
    },

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
