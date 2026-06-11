import { PrismicRichText } from "@prismicio/react";

import {
  FeatureDocument,
  IntegrationsDocumentData,
  Simplify,
} from "../../../../prismicio-types";

export const formatFeaturesLandingPage = (
  data: Simplify<IntegrationsDocumentData>,
  allFeatures: Simplify<FeatureDocument>[],
  schemas
) => {
  // Fall back to the previous hardcoded copy until the CMS fields are set, so
  // the hero never renders blank.
  const heading = data.heading?.length ? (
    <PrismicRichText field={data.heading} />
  ) : (
    "TutorCruncher features"
  );
  const subheading =
    data.subheading ||
    "TutorCruncher is built specifically for tutoring. One platform with all the features you could ask for.";

  const meta = {
    title: data.meta_title,
    description: data.meta_description,
  };

  const features = allFeatures.map((feature) => ({
    title: feature.data.heading,
    listImage: feature.data.list_image,
    listText: feature.data.list_text,
    url: `/features/${feature.uid}`,
  }));

  return { heading, subheading, meta, features, schemas };
};
