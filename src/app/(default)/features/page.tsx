import { Metadata } from "next/types";

import { Action } from "@/components/ui/action";
import { Hero } from "@/components/ui/hero";
import TrackingLink from "@/components/ui/tracking-link/tracking-link";
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
        actions={
          <>
            <TrackingLink
              url="https://app.tutorcruncher.com/start/1/"
              text="Start a free trial"
              variant="solid"
            />
            <Action href="/book-a-call" variant="outline">
              Book a call
            </Action>
          </>
        }
      />
      <FeaturesList features={features} />
      <CallToAction background="blue" />
    </>
  );
}
