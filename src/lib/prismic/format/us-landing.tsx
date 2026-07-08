import { asLink } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

import { Simplify, UsLandingDocumentData } from "../../../../prismicio-types";

export const formatUsLanding = async (
  data: Simplify<UsLandingDocumentData>,
  schemas
) => {
  const heading = <PrismicRichText field={data.heading} />;

  const primaryCta =
    data.cta_primary_label && asLink(data.cta_primary_link)
      ? {
          label: data.cta_primary_label,
          url: asLink(data.cta_primary_link) as string,
        }
      : undefined;

  const secondaryCta =
    data.cta_secondary_label && asLink(data.cta_secondary_link)
      ? {
          label: data.cta_secondary_label,
          url: asLink(data.cta_secondary_link) as string,
        }
      : undefined;

  const meta = {
    title: data.meta_title,
    description: data.meta_description,
  };

  return {
    eyebrow: data.eyebrow,
    heading,
    intro: data.intro,
    trustLine: data.trust_line,
    primaryCta,
    secondaryCta,
    heroImages: data.hero_images,
    slices: data.slices,
    meta,
    schemas,
  };
};
