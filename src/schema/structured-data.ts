// Static JSON-LD structured data builders. These complement the per-page schemas
// editable in Prismic by emitting baseline Organization / SoftwareApplication / Product
// data that doesn't change page-to-page and shouldn't depend on a CMS round-trip.

const SITE_URL = "https://tutorcruncher.com";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "TutorCruncher",
  legalName: "TutorCruncher Limited",
  url: SITE_URL,
  logo: `${SITE_URL}/logo_full.png`,
  email: "support@tutorcruncher.com",
  description:
    "TutorCruncher is business-management software for tutoring, coaching and teaching agencies. It handles scheduling, invoicing, payments, CRM, contractor management and integrations.",
  foundingDate: "2014",
  sameAs: [
    "https://www.linkedin.com/company/tutorcruncher/",
    "https://x.com/TutorCruncher",
    "https://www.facebook.com/tutorcruncher",
    "https://www.instagram.com/tutorcruncher/",
    "https://www.youtube.com/@tutorcruncher",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "support@tutorcruncher.com",
    url: `${SITE_URL}/contact`,
    availableLanguage: ["English"],
  },
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: "TutorCruncher",
  url: SITE_URL,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Education Management",
  operatingSystem: "Web",
  description:
    "All-in-one business management platform for tutoring agencies: scheduling, CRM, invoicing, payment processing, contractor management and a documented REST API.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "GBP",
    lowPrice: "0",
    offerCount: "3",
    url: `${SITE_URL}/pricing`,
  },
  featureList: [
    "Lesson scheduling and calendar management",
    "Multi-currency invoicing and proforma invoices",
    "Card payments via Stripe",
    "Direct debit via GoCardless",
    "Contractor (tutor) pay management",
    "CRM with custom fields and pipeline stages",
    "Public REST API with OpenAPI specification",
    "Webhooks for external integrations",
    "Xero and QuickBooks accounting sync",
    "Zapier and 1000+ app integrations",
    "Branded email and SMS communications",
  ],
};

interface PricingTierData {
  name: string;
  basePrice: number | string | null | undefined;
  description: string;
}

const REGION_CURRENCY: Record<string, string> = {
  gb: "GBP",
  us: "USD",
  eu: "EUR",
  au: "AUD",
  ca: "CAD",
};

const ISO_4217 = /^[A-Z]{3}$/;

function toNumericPrice(value: number | string): string | null {
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : null;
  // Prismic base_price is free text — strip currency symbols, commas, "/month" suffixes, etc.
  const match = value.replace(/,/g, "").match(/-?\d+(?:\.\d+)?/);
  return match ? match[0] : null;
}

export function buildProductSchema(
  region: string,
  currency: string | null | undefined,
  tiers: PricingTierData[],
) {
  const fromRegion = REGION_CURRENCY[region.toLowerCase()];
  const fromInput = currency?.toUpperCase();
  const priceCurrency =
    fromRegion ?? (fromInput && ISO_4217.test(fromInput) ? fromInput : "GBP");
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `TutorCruncher (${region.toUpperCase()})`,
    description:
      "Business-management software for tutoring agencies. Three tiers — Pay-as-you-go, Startup and Enterprise — with unlimited users and unlimited lessons on every tier.",
    image: `${SITE_URL}/logo_full.png`,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Education Management",
    operatingSystem: "Web",
    publisher: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/pricing/${region}`,
    offers: tiers
      .map((tier) => {
        if (tier.basePrice == null || tier.basePrice === "") return null;
        const price = toNumericPrice(tier.basePrice);
        if (price === null) return null;
        return {
          "@type": "Offer",
          name: tier.name,
          description: tier.description,
          price,
          priceCurrency,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price,
            priceCurrency,
            unitText: "MONTH",
          },
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/pricing/${region}`,
        };
      })
      .filter((o): o is NonNullable<typeof o> => o !== null),
  };
}
