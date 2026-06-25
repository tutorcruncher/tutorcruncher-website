import { SliceZone } from "@prismicio/react";
import { Metadata } from "next/types";
import { components } from "slices";

import { ReviewsCta } from "@/components/features/reviews-cta";
import { ReviewsExplorer } from "@/components/features/reviews-explorer";
import { ReviewsHero } from "@/components/features/reviews-hero";
import { formatMetaData } from "@/helpers/metaData";
import { fetchReviewsPage } from "@/lib/prismic/reviews";
import { RenderSchemas } from "@/components/schema";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await fetchReviewsPage();
  const url = `https://tutorcruncher.com/reviews`;

  return formatMetaData(meta.title, meta.description, url);
}

const ReviewsPage = async () => {
  const { heading, subheading, testimonials, slices, schemas } =
    await fetchReviewsPage();

  return (
    <>
      <RenderSchemas schemas={schemas} />
      <ReviewsHero heading={heading} subheading={subheading} />
      <ReviewsExplorer testimonials={testimonials} />
      <SliceZone slices={slices} components={components} />
      <ReviewsCta />
    </>
  );
};

export default ReviewsPage;
