import { asLink } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

import { Simplify, UsLandingDocumentData } from "../../../../prismicio-types";

/**
 * CTA URLs are typed by content editors in Prismic, so they can arrive with
 * stray whitespace (a trailing space breaks the href once query params are
 * appended to it). Trim before the URL reaches the DOM.
 */
const cleanUrl = (url: string | null) => url?.trim() || null;

export const formatUsLanding = async (
  data: Simplify<UsLandingDocumentData>,
  schemas
) => {
  const heading = <PrismicRichText field={data.heading} />;

  const primaryUrl = cleanUrl(asLink(data.cta_primary_link));
  const primaryCta =
    data.cta_primary_label && primaryUrl
      ? {
          label: data.cta_primary_label,
          url: primaryUrl,
        }
      : undefined;

  const secondaryUrl = cleanUrl(asLink(data.cta_secondary_link));
  const secondaryCta =
    data.cta_secondary_label && secondaryUrl
      ? {
          label: data.cta_secondary_label,
          url: secondaryUrl,
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
