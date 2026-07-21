"use client";

import { useTracking } from "app/providers/tracking-provider";

/**
 * Pages whose internal CTAs carry tracking params. Scoped deliberately: the
 * rest of the site keeps clean internal URLs, and only the regional landing
 * pages propagate attribution across internal navigation.
 */
const TRACKED_INTERNAL_LINK_PATHS = ["/us"];

const isTrackedPath = () => {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  return TRACKED_INTERNAL_LINK_PATHS.includes(path);
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
  if (!isTrackedPath()) return href;
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
