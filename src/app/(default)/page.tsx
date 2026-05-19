import { SliceZone } from "@prismicio/react";
import { Metadata } from "next/types";
import { components } from "slices";

import { BobbinSignupPopup } from "@/components/features/bobbin-signup-popup";
import { HomePageHero } from "@/components/features/home-page-hero";
import { ReadyToGetStarted } from "@/components/features/ready-to-get-started";
import { formatMetaData } from "@/helpers/metaData";
import { fetchHomePage } from "@/lib/prismic/home";
import { RenderSchemas } from "@/components/schema";
import { softwareApplicationSchema } from "@/schema/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await fetchHomePage();

  const url = `https://tutorcruncher.com`;

  return formatMetaData(meta.title, meta.description, url);
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
      <ReadyToGetStarted />
      <BobbinSignupPopup />
    </>
  );
}
