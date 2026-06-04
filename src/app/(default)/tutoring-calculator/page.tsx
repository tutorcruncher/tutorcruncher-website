import { Metadata } from "next/types";

import { Hero } from "@/components/ui/hero";
import { formatMetaData } from "@/helpers/metaData";
import { TutoringCalculator } from "@/components/features/tutoring-calculator";
import { fetchTutoringCalculatorPage } from "@/lib/prismic/tutoring-calculator";
import { RenderSchemas } from "@/components/schema";
import { ReadyToGetStarted } from "@/components/features/ready-to-get-started";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await fetchTutoringCalculatorPage();

  const url = "https://tutorcruncher.com/tutoring-calculator";

  return formatMetaData(meta.title, meta.description, url);
}

export default async function TutoringCalculatorPage() {
  const { heading, intro, content, schemas } =
    await fetchTutoringCalculatorPage();
  return (
    <>
      <RenderSchemas schemas={schemas} />
      <Hero heading={heading} headingVariant="div" />
      <TutoringCalculator intro={intro} content={content} />
      <ReadyToGetStarted />
    </>
  );
}
