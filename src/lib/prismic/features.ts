import { createClient } from "prismicio";
import { formatFeaturesLandingPage } from "./format/features";
import { fetchSchemas } from "./helpers";

export const fetchFeaturesLandingPage = async () => {
  const client = createClient();
  try {
    const { data } = await client.getSingle("features");
    const allFeatures = await client.getAllByType("feature", {
      orderings: {
        field: "my.feature.order",
        direction: "asc",
      },
    });
    const schemas = await fetchSchemas(data.schemas);
    return formatFeaturesLandingPage(data, allFeatures, schemas);
  } catch (error) {
    console.error("Error fetching integrations:", error);
  }
};
