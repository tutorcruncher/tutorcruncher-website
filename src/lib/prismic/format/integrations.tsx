import { PrismicRichText } from "@prismicio/react";

import {
  IntegrationDocument,
  IntegrationsDocumentData,
  Simplify,
} from "../../../../prismicio-types";

export const formatIntegrationsPage = (
  data: Simplify<IntegrationsDocumentData>,
  allIntegrations: Simplify<IntegrationDocument>[],
  schemas
) => {
  const heading = <PrismicRichText field={data.heading} />;
  const subheading = data.subheading;

  const meta = {
    title: data.meta_title,
    description: data.meta_description,
  };

  const integrations = allIntegrations.map(({ data }) => ({
    title: data.title,
    logo: data.logo,
    category: data.category,
    intro: data.intro,
    content: <PrismicRichText field={data.description} />,
    screenshot: data.screenshot,
  }));

  return { heading, subheading, meta, integrations, slices: data.slices, schemas };
};
