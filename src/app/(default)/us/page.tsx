import { SliceZone } from "@prismicio/react";
import { Metadata } from "next/types";
import { notFound } from "next/navigation";
import { components } from "slices";

import { UsLandingHero } from "@/components/features/us-landing-hero";
import { formatMetaData } from "@/helpers/metaData";
import { fetchUsLandingPage } from "@/lib/prismic/us-landing";
import { RenderSchemas } from "@/components/schema";
import { softwareApplicationSchema } from "@/schema/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  const content = await fetchUsLandingPage();

  const url = `https://tutorcruncher.com/us`;

  return formatMetaData(
    content?.meta.title ?? null,
    content?.meta.description ?? null,
    url
  );
}

export default async function UsLandingPage() {
  const content = await fetchUsLandingPage();

  if (!content) {
    return notFound();
  }

  const {
    eyebrow,
    heading,
    intro,
    trustLine,
    primaryCta,
    secondaryCta,
    heroImages,
    slices,
    schemas,
  } = content;

  return (
    <>
      <RenderSchemas schemas={[softwareApplicationSchema, ...(schemas ?? [])]} />
      <UsLandingHero
        eyebrow={eyebrow}
        heading={heading}
        intro={intro}
        trustLine={trustLine}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
        heroImages={heroImages}
      />
      <SliceZone slices={slices} components={components} />
    </>
  );
}
