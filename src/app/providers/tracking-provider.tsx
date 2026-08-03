/* 
The following comment outlines the logic for setting the tracking parameters:
If someone comes from direct first, we assign tc_source to Direct and then overwrite it if they come from somewhere else
If utm_source is present, then the user must have come from an ad. tc_source is set to the utm_source and tc_campaign is set to utm_campaign. This is then never changed
If there is no utm_source but the URL has a Google Ads click ID (gclid/gbraid/wbraid, e.g. Performance Max), the user also came from an ad: tc_source is set to google
If utm_source is not present, we set tc_source from the referrer unless tc_source has already been set as a cookie and tc_source is not Direct. tc_campaign should be set to tc-[page-type]-[page-title-slugified] which is based off of the landing page
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

  // Regional landing pages (e.g. /us) label their own traffic. This runs after
  // the UTM branch above, so an ad click keeps its utm_source/utm_campaign and
  // only direct/organic visitors get the page's own source and campaign.
  const regional = getRegionalLandingPage();
  if (regional) {
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

  if (source === "Direct") {
    const referrer = getReferrerDomain();
    if (referrer) {
      source = referrer;
      localStorage.setItem("_tc_source", source);
    }
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
