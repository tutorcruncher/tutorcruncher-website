import { NextRequest, NextResponse } from "next/server";

/**
 * Sends visitors geolocated to the US from the UK homepage to /us.
 *
 * Only the homepage is redirected: /us is the sole US-specific page, so there
 * is nowhere to send anyone browsing /pricing, /features/* or the blog.
 *
 * The redirect is 307 (temporary) rather than 308. A permanent redirect would
 * tell search engines the UK homepage had moved to /us, which is the opposite
 * of what the regional setup wants — REGIONAL_ALTERNATES in src/schema/meta.ts
 * deliberately keeps both URLs indexed as reciprocal hreflang alternates, each
 * with its own self-referencing canonical.
 */

/**
 * Search and AI crawlers are never redirected.
 *
 * This is load-bearing for SEO, not an optimisation. Googlebot crawls almost
 * entirely from US IP addresses, so without this exclusion every crawl of the
 * UK homepage would bounce to /us and the UK page would drop out of the index
 * — taking the hreflang pairing down with it, since hreflang requires both
 * pages to be independently crawlable.
 *
 * Matched case-insensitively as a substring of the User-Agent. The list covers
 * the same crawlers public/robots.txt calls out by name.
 */
const CRAWLER_UA_PATTERNS = [
  "googlebot",
  "google-inspectiontool",
  "bingbot",
  "slurp",
  "duckduckbot",
  "baiduspider",
  "yandexbot",
  "applebot",
  "gptbot",
  "chatgpt-user",
  "oai-searchbot",
  "claudebot",
  "claude-web",
  "anthropic-ai",
  "perplexitybot",
  "perplexity-user",
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "slackbot",
];

const isCrawler = (userAgent: string) => {
  const ua = userAgent.toLowerCase();
  return CRAWLER_UA_PATTERNS.some((pattern) => ua.includes(pattern));
};

export function middleware(request: NextRequest) {
  // Netlify populates `geo` by packaging this middleware into an Edge
  // Function. Two cases leave it undefined:
  //   - local `next dev`, where there is no edge layer at all
  //   - production with NEXT_DISABLE_NETLIFY_EDGE=true, which drops the
  //     middleware to a regular Netlify Function; those have no geo data
  // In both, the redirect silently never fires and every visitor gets the UK
  // homepage. That is the right fallback for an unknown location, but it also
  // means enabling that env var would disable this redirect with no error. If
  // this ever appears "broken" in production, check that flag first.
  //
  // Because geo is unavailable locally, `x-debug-country` allows the redirect
  // to be exercised in development:
  //   curl -I -H "x-debug-country: US" http://localhost:8004/
  // The NODE_ENV guard means the header is inert in production — a visitor
  // cannot send it to force themselves onto /us, and it cannot spoof geo on
  // the live site.
  const country =
    process.env.NODE_ENV === "development"
      ? request.headers.get("x-debug-country") ?? request.geo?.country
      : request.geo?.country;

  if (country !== "US") {
    return NextResponse.next();
  }

  if (isCrawler(request.headers.get("user-agent") ?? "")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/us";

  // 307 preserves the request method and, crucially, is non-permanent — see
  // the note above about keeping the UK homepage indexed.
  return NextResponse.redirect(url, 307);
}

export const config = {
  // Only the homepage. Static assets, /api, images and the /us page itself are
  // all outside this matcher, so the middleware never runs for them — which
  // also means no chance of a redirect loop on /us.
  matcher: "/",
};
