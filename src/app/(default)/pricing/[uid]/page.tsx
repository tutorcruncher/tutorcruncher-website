import { Metadata } from "next/types";

import { PricingTiers } from "@/components/features/pricing-tiers";
import { Hero } from "@/components/ui/hero";
import { formatMetaData } from "@/helpers/metaData";
import { fetchPricingPageByUid } from "@/lib/prismic/pricing";
import { RenderSchemas } from "@/components/schema";
import { buildProductSchema } from "@/schema/structured-data";
import { SliceZone } from "@prismicio/react";
import { components } from "slices";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }): Promise<Metadata> {
  try {
    const { meta } = await fetchPricingPageByUid(params.uid);
    const url = `https://tutorcruncher.com/pricing`;

    return formatMetaData(meta.title, meta.description, url);
  } catch {
    return null;
  }
}

const PricingPage = async ({ params }) => {
  try {
    const { heading, schemas, slices, pricing } = await fetchPricingPageByUid(
      params.uid
    );
    const region = params.uid;
    const productSchema = buildProductSchema(region, pricing.currency, [
      {
        name: "Pay-as-you-go",
        basePrice: pricing.payg.base_price,
        description:
          "Low monthly base plus a per-completed-lesson fee. Best for new or low-volume agencies.",
      },
      {
        name: "Startup",
        basePrice: pricing.startup.base_price,
        description:
          "Higher monthly base with reduced per-lesson fees. Best for established agencies running 100+ lessons per month.",
      },
      {
        name: "Enterprise",
        basePrice: pricing.enterprise.base_price,
        description:
          "Flat fee for very large agencies. Includes dedicated account management.",
      },
    ]);
    return (
      <>
        <RenderSchemas schemas={[productSchema, ...(schemas ?? [])]} />
        <Hero heading={heading} headingVariant="div" />
        <PricingTiers region={region} pricing={pricing} />
        <SliceZone slices={slices} components={components} />
      </>
    );
  } catch {
    return notFound();
  }
};

export default PricingPage;
