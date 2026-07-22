"use client";

import { useTracking } from "app/providers/tracking-provider";

/**
 * Pages whose internal CTAs carry tracking params, mapped to which hrefs get
 * them: "all", or an allowlist of pathnames. Scoped deliberately: the rest of
 * the site keeps clean internal URLs. The homepage only tracks its book-a-call
 * CTAs — its "Find out more" / "See full pricing" links stay clean so signups
 * from those pages attribute to the page they happened on, not the homepage.
 */
const TRACKED_INTERNAL_LINKS: Record<string, "all" | string[]> = {
  "/us": "all",
  "/": ["/book-a-call"],
};

const normalisePath = (path: string) => path.replace(/\/+$/, "") || "/";

const isTrackedHref = (href: string) => {
  const tracked =
    TRACKED_INTERNAL_LINKS[normalisePath(window.location.pathname)];
  if (!tracked) return false;
  if (tracked === "all") return true;

  try {
    const { pathname } = new URL(href, window.location.origin);
    return tracked.includes(normalisePath(pathname));
  } catch {
    return false;
  }
};

/**
 * Appends the current tracking params (tc_source / tc_campaign / gclid) to an
 * internal href, but only on the pages listed above.
 *
 * `TrackingLink` already does this for the external signup links. This hook
 * covers internal CTAs (`/solutions/*`, `/pricing/*`, `/book-a-call`) that need
 * to carry the same attribution, so a click from /us stays attributable to the
 * US landing page.
 *
 * Returns the href unchanged during SSR and whenever there are no params yet,
 * so links are always valid even before the tracking provider has hydrated.
 */
export const useTrackedHref = (href: string): string => {
  const { queryParams } = useTracking();

  if (typeof window === "undefined") return href;
  if (!isTrackedHref(href)) return href;
  if (!queryParams || Object.keys(queryParams).length === 0) return href;

  try {
    const url = new URL(href, window.location.origin);
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
    // Keep internal links relative so they don't turn into absolute URLs.
    return href.startsWith("http")
      ? url.toString()
      : `${url.pathname}${url.search}`;
  } catch {
    return href;
  }
};
