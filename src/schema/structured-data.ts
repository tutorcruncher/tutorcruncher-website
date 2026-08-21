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
  description:
    "The most comprehensive software for tutoring companies. Trusted by the leading names in tutoring for more than 10 years to run their business and their lessons from one place.",
  foundingDate: "2013",
  sameAs: [
    "https://www.linkedin.com/company/tutorcruncher/",
    "https://x.com/TutorCruncher",
    "https://www.facebook.com/tutorcruncher",
    "https://www.instagram.com/tutorcruncher/",
    "https://www.youtube.com/@tutorcruncher",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "The Food Exchange, New Covent Garden Market",
    addressLocality: "London",
    postalCode: "SW8 5EL",
    addressCountry: "GB",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+44-20-4572-8106",
      contactType: "customer support",
      email: "info@tutorcruncher.com",
      url: `${SITE_URL}/contact`,
      areaServed: "GB",
      availableLanguage: ["English"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+1-646-859-2047",
      contactType: "sales",
      areaServed: "US",
      availableLanguage: ["English"],
    },
  ],
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
    "Tutoring management software for scheduling, billing, payments, payroll and lesson delivery — all in one platform built specifically for tutoring companies.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "GBP",
    lowPrice: "25",
    highPrice: "200",
    offerCount: "3",
    url: `${SITE_URL}/pricing/gb`,
    offers: [
      {
        "@type": "Offer",
        name: "Pay as you go",
        price: "25",
        priceCurrency: "GBP",
        url: `${SITE_URL}/pricing/gb`,
      },
      {
        "@type": "Offer",
        name: "Startup",
        price: "60",
        priceCurrency: "GBP",
        url: `${SITE_URL}/pricing/gb`,
      },
      {
        "@type": "Offer",
        name: "Enterprise",
        price: "200",
        priceCurrency: "GBP",
        url: `${SITE_URL}/pricing/gb`,
      },
    ],
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

interface FaqEntry {
  question: string | null | undefined;
  answer: string | null | undefined;
}

// Built from the page's actual FAQ content — emitted by the Faqs slice.
export function buildFaqSchema(faqs: FaqEntry[]) {
  const mainEntity = faqs
    .filter((faq) => faq.question && faq.answer)
    .map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    }));

  if (!mainEntity.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

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
