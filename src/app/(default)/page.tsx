import { SliceZone } from "@prismicio/react";
import { Metadata } from "next/types";
import { components } from "slices";

import { BobbinSignupPopup } from "@/components/features/bobbin-signup-popup";
import { HomePageHero } from "@/components/features/home-page-hero";
import { formatMetaData } from "@/helpers/metaData";
import { fetchHomePage } from "@/lib/prismic/home";
import { RenderSchemas } from "@/components/schema";
import { softwareApplicationSchema } from "@/schema/structured-data";
import { REGIONAL_ALTERNATES, REGIONAL_URLS } from "@/schema/meta";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await fetchHomePage();

  const url = REGIONAL_URLS.uk;

  // hreflang must be reciprocal — the US page points here, so this page must
  // point back, or search engines ignore the pairing entirely.
  return formatMetaData(
    meta.title,
    meta.description,
    url,
    undefined,
    REGIONAL_ALTERNATES
  );
}

export default async function Index() {
  const { heading, intro, slices, heroImages, schemas } = await fetchHomePage();

  return (
    <>
      <RenderSchemas
        schemas={[softwareApplicationSchema, ...(schemas ?? [])]}
      />
      <HomePageHero heading={heading} intro={intro} heroImages={heroImages} />
      <SliceZone slices={slices} components={components} />
      <BobbinSignupPopup />
    </>
  );
}
