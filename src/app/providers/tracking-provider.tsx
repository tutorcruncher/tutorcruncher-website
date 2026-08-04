/*
Attribution model: last non-direct click, to match GA4's session attribution.
Each arrival is classified and any NON-DIRECT arrival overwrites the stored source:
- utm_source present: came from an ad; tc_source = utm_source, tc_campaign = utm_campaign.
- No utm_source but a Google Ads click ID (gclid/gbraid/wbraid, e.g. Performance Max): also an ad; tc_source = google.
- External referrer (own tutorcruncher.com domains excluded): tc_source = referrer domain,
  tc_campaign = tc-[page-type]-[page-title-slugified] from the landing page.
- Direct arrival (no params, no external referrer): NEVER overwrites — we keep the last known
  source, or Direct if we never had one.
*/

"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

type TrackingContextType = {
  queryParams: Record<string, string>;
  updateQueryParams: (newParams: Record<string, string>) => void;
};

const TrackingContext = createContext<TrackingContextType | undefined>(
  undefined
);

export const useTracking = () => {
  const context = useContext(TrackingContext);
  if (!context) {
    throw new Error("useTracking must be used within a TrackingProvider");
  }
  return context;
};

const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getReferrerDomain = () => {
  try {
    const referrer = document.referrer;
    if (referrer) {
      const { hostname } = new URL(referrer);
      // Our own domains (app/secure/www) are internal navigation, not an
      // acquisition source — treat them as direct so they never overwrite.
      if (
        hostname === "tutorcruncher.com" ||
        hostname.endsWith(".tutorcruncher.com")
      ) {
        return null;
      }
      const parts = hostname.split(".");
      return parts.length >= 2 ? parts.slice(-2).join(".") : hostname;
    }
  } catch (e) {
    console.error("Referrer parsing error:", e);
  }
  return null;
};

const getPageInfo = () => {
  const path = window.location.pathname.split("/").filter(Boolean);
  const pageType = path[0] || "home";
  const title = document.title || "untitled";
  return `tc-${pageType}-${slugify(title)}`;
};

/**
 * Regional landing pages that report their own source/campaign instead of the
 * title-derived defaults, so paid and organic traffic to them can be told apart
 * in BigQuery.
 *
 * Keyed by pathname. `source` is only applied when the visitor did NOT arrive
 * from an ad — a `utm_source` always wins, otherwise we would overwrite Google
 * Ads attribution and break the "US Search" campaign mapping.
 */
const REGIONAL_LANDING_PAGES: Record<
  string,
  { source: string; campaign: string }
> = {
  "/us": { source: "tutorcruncher.com/us", campaign: "tc-home-US" },
};

const getRegionalLandingPage = () => {
  // Ignore any trailing slash so "/us/" matches "/us".
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  return REGIONAL_LANDING_PAGES[path];
};

// Google Click ID (GCLID) storage helpers (90-day expiry)
// Use consistent key "_tc_gclid" and ISO datetime expiry
const GCLID_KEY = "_tc_gclid";
const GCLID_EXPIRY_MS = 90 * 24 * 60 * 60 * 1000;

const storeGclid = (value: string): {gclid: string, expiryDate: string} => {
    const expiryIso = new Date(Date.now() + GCLID_EXPIRY_MS).toISOString();
    const record = { gclid: value, expiryDate: expiryIso };
    localStorage.setItem(GCLID_KEY, JSON.stringify(record));
    return record;
};

const getTrackingParams = (): Record<string, string> => {
  const params: Record<string, string> = {};
  if (typeof window === "undefined") return params;

  const urlParams = new URLSearchParams(window.location.search);
  const storedSource = localStorage.getItem("_tc_source") || null;
  const storedCampaign = localStorage.getItem("_tc_campaign") || null;

  // Capture and persist Google Click ID (GCLID) with 90-day expiry
  // Google documentation suggests validating gclsrc contains "aw" (e.g. aw.ds)
  // to ensure the GCLID comes from Google Ads before storing/using it.
  const gclidParam = urlParams.get("gclid");
  const gclsrcParam = urlParams.get("gclsrc");
  const isGclsrcValid = !gclsrcParam || gclsrcParam.includes("aw");
  if (gclidParam && isGclsrcValid) {
    const {gclid, expiryDate} = storeGclid(gclidParam);
    if (gclid) {
      params.gclid = gclid;
      params.gclid_expiry_dt = expiryDate;
    }
  } else {
    try {
      const raw = localStorage.getItem(GCLID_KEY);
      if (raw) {
        const record = JSON.parse(raw) as { gclid: string; expiryDate: string };
        const expiryMs = new Date(record.expiryDate).getTime();
        if (Number.isFinite(expiryMs) && Date.now() < expiryMs) {
          params.gclid = record.gclid;
          params.gclid_expiry_dt = record.expiryDate;
        }
      }
      } catch {
        // ignore parse/storage errors
      }
  }

  const hasUTM = urlParams.has("utm_source");
  const utmSource = urlParams.get("utm_source");
  const utmCampaign = urlParams.get("utm_campaign");

  if (hasUTM && utmSource) {
    localStorage.setItem("_tc_source", utmSource);
    if (utmCampaign) localStorage.setItem("_tc_campaign", utmCampaign);

    params.tc_source = utmSource;
    if (utmCampaign) params.tc_campaign = utmCampaign;
    return params;
  }

  // Google Ads auto-tagging (Performance Max in particular) lands with a
  // gclid/gbraid/wbraid but no UTM parameters, so the referrer logic below
  // would label the visit organic (google.com). A click ID in the URL means a
  // paid Google click, so label it like a utm_source=google ad click.
  const freshClickId =
    (gclidParam && isGclsrcValid ? gclidParam : null) ||
    urlParams.get("gbraid") ||
    urlParams.get("wbraid");
  if (freshClickId) {
    const campaign = storedCampaign || getPageInfo();
    localStorage.setItem("_tc_source", "google");
    localStorage.setItem("_tc_campaign", campaign);

    params.tc_source = "google";
    params.tc_campaign = campaign;
    return params;
  }

  // Last non-direct click: a new external referrer always overwrites the stored
  // source (matching GA4), with the campaign refreshed to the new landing page.
  const referrer = getReferrerDomain();
  if (referrer) {
    const campaign = getPageInfo();
    localStorage.setItem("_tc_source", referrer);
    localStorage.setItem("_tc_campaign", campaign);

    params.tc_source = referrer;
    params.tc_campaign = campaign;
    return params;
  }

  // From here on the arrival is direct. Regional landing pages (e.g. /us) label
  // otherwise-unattributed traffic with their own source/campaign; a known prior
  // source is kept, since a direct arrival never overwrites (matching GA4).
  const regional = getRegionalLandingPage();
  if (
    regional &&
    (!storedSource || storedSource === "Direct" || storedSource === regional.source)
  ) {
    localStorage.setItem("_tc_source", regional.source);
    localStorage.setItem("_tc_campaign", regional.campaign);

    params.tc_source = regional.source;
    params.tc_campaign = regional.campaign;
    return params;
  }

  let source = storedSource;
  let campaign = storedCampaign;

  if (!source) {
    source = "Direct";
    localStorage.setItem("_tc_source", source);
  }

  if (!campaign || source === "Direct") {
    campaign = getPageInfo();
    localStorage.setItem("_tc_campaign", campaign);
  }

  params.tc_source = source;
  params.tc_campaign = campaign;

  return params;
};

export const TrackingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [queryParams, setQueryParams] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = getTrackingParams();
    setQueryParams(params);
  }, []);

  const updateQueryParams = useCallback((newParams: Record<string, string>) => {
    setQueryParams((prev) => ({ ...prev, ...newParams }));
  }, []);

  return (
    <TrackingContext.Provider value={{ queryParams, updateQueryParams }}>
      {children}
    </TrackingContext.Provider>
  );
};
