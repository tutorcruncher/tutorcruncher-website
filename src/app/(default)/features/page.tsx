import { Metadata } from "next/types";

import { Hero } from "@/components/ui/hero";
import { HeroActions } from "@/components/features/hero/hero-actions";
import { formatMetaData } from "@/helpers/metaData";
import { CallToAction } from "@/components/features/call-to-action";
import { fetchFeaturesLandingPage } from "@/lib/prismic/features";
import { FeaturesList } from "@/components/features/features-list";
import { RenderSchemas } from "@/components/schema";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await fetchFeaturesLandingPage();
  const url = `https://tutorcruncher.com/features`;

  return formatMetaData(meta.title, meta.description, url);
}

export default async function FeaturesPage() {
  const { heading, subheading, features, schemas } =
    await fetchFeaturesLandingPage();
  return (
    <>
      <RenderSchemas schemas={schemas} />
      <Hero
        heading={heading}
        headingVariant="h1"
        intro={subheading}
        actions={<HeroActions />}
      />
      <FeaturesList features={features} />
      <CallToAction background="blue" />
    </>
  );
}
