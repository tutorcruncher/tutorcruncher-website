import { PrismicRichText } from "@prismicio/react";

import {
  ReviewsDocumentData,
  Simplify,
  TestimonialDocument,
} from "../../../../prismicio-types";
import { formatTestimonials } from "./testimonials";

export const formatReviewsPage = (
  data: Simplify<ReviewsDocumentData>,
  allTestimonials: Simplify<TestimonialDocument>[],
  schemas
) => {
  // Fall back to the previous hardcoded copy until the CMS fields are set, so
  // the hero never renders blank.
  const heading = data.heading?.length ? (
    <PrismicRichText field={data.heading} />
  ) : (
    "What our customers are saying"
  );
  const subheading =
    data.subheading ||
    "Here's what tutoring business owners across the UK, US, and beyond have to say about running their businesses on TutorCruncher.";

  const meta = {
    title: data.meta_title,
    description: data.meta_description,
  };

  const testimonials = formatTestimonials(allTestimonials);

  return {
    heading,
    subheading,
    meta,
    testimonials,
    slices: data.slices,
    schemas,
  };
};
