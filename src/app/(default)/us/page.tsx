import { SliceZone } from "@prismicio/react";
import { Metadata } from "next/types";
import { notFound } from "next/navigation";
import { components } from "slices";

import { UsLandingHero } from "@/components/features/us-landing-hero";
import { formatMetaData } from "@/helpers/metaData";
import { fetchUsLandingPage } from "@/lib/prismic/us-landing";
import { RenderSchemas } from "@/components/schema";
import { softwareApplicationSchema } from "@/schema/structured-data";
import { REGIONAL_ALTERNATES, REGIONAL_URLS } from "@/schema/meta";

export async function generateMetadata(): Promise<Metadata> {
  const content = await fetchUsLandingPage();

  // Self-referencing canonical — deliberately NOT pointing back at the UK
  // homepage, so this page ranks on its own for US queries. Shares its source
  // with REGIONAL_ALTERNATES so the two can never disagree about this URL.
  const url = REGIONAL_URLS.us;

  return formatMetaData(
    content?.meta.title ?? null,
    content?.meta.description ?? null,
    url,
    undefined,
    REGIONAL_ALTERNATES
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
