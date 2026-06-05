import { Metadata } from "next/types";

import { TestimonialList } from "@/components/features/testimonials/testimonials-list";
import { ReviewsHero } from "@/components/features/reviews-hero";
import { ReviewsCta } from "@/components/features/reviews-cta";
import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";
import { formatMetaData } from "@/helpers/metaData";
import { fetchReviewsPage } from "@/lib/prismic/reviews";
import { RenderSchemas } from "@/components/schema";

import styles from "./reviews.module.scss";

const SECTIONS = [
  { key: "Pay as you go", title: "Just starting out" },
  { key: "Startup", title: "Scaling companies" },
  { key: "Enterprise", title: "Large-scale operations" },
];

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await fetchReviewsPage();
  const url = `https://tutorcruncher.com/reviews`;

  return formatMetaData(meta.title, meta.description, url);
}

const ReviewsPage = async () => {
  const { testimonials, schemas } = await fetchReviewsPage();

  // Group reviews into the three plan sections. If no reviews have a segment
  // assigned yet, fall back to a single "Customer reviews" section so the page
  // still works (and keeps a clean h1 → h2 → h3 hierarchy) before content is set.
  const segmented = SECTIONS.map(({ key, title }) => ({
    title,
    items: testimonials.filter((t) => t.segment === key),
  })).filter((section) => section.items.length > 0);

  const ungrouped = testimonials.filter(
    (t) => !SECTIONS.some(({ key }) => key === t.segment)
  );

  const sections =
    segmented.length > 0
      ? [
          ...segmented,
          ...(ungrouped.length
            ? [{ title: "More reviews", items: ungrouped }]
            : []),
        ]
      : [{ title: "Customer reviews", items: testimonials }];

  return (
    <>
      <RenderSchemas schemas={schemas} />
      <ReviewsHero />
      <Body containerSize="large" background="cream">
        {sections.map((section) => (
          <div className={styles.section} key={section.title}>
            <Heading variant="h2" center className={styles.sectionHeading}>
              {section.title}
            </Heading>
            <TestimonialList testimonials={section.items} />
          </div>
        ))}
      </Body>
      <ReviewsCta />
    </>
  );
};

export default ReviewsPage;
