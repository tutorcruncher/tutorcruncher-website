/** Canonical URLs for the regional variants of the homepage. */
export const REGIONAL_URLS = {
  uk: "https://tutorcruncher.com",
  us: "https://tutorcruncher.com/us",
} as const;

/**
 * hreflang alternates linking the UK homepage and the US landing page.
 *
 * Both pages emit this SAME complete set (each including a reference to
 * itself) — that is what hreflang requires, and search engines ignore the
 * pairing unless it is reciprocal. What differs per page is the `canonical`,
 * which each page derives from `REGIONAL_URLS` (see the `generateMetadata` of
 * the homepage and /us).
 *
 * `x-default` points at the UK homepage as the global fallback.
 */
export const REGIONAL_ALTERNATES = {
  "en-GB": REGIONAL_URLS.uk,
  "en-US": REGIONAL_URLS.us,
  "x-default": REGIONAL_URLS.uk,
};

export const BASE_META = {
  twitter: {
    card: "summary",
    site: "@TutorCruncher",
    creator: "@TutorCruncher",
    images:
      "https://tutorcruncher.com/assets/rectangle-dino-name-description-titillium.0d28e72.png",
  },
  openGraph: {
    type: "website",
    images:
      "https://tutorcruncher.com/assets/rectangle-dino-name-description-titillium.0d28e72.png",
  },
};
