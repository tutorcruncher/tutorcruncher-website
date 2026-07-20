import { createClient } from "prismicio";

import { formatUsLanding } from "./format/us-landing";
import { fetchSchemas } from "./helpers";

export const fetchUsLandingPage = async () => {
  const client = createClient();
  try {
    const { data } = await client.getSingle("us_landing");
    const schemas = await fetchSchemas(data.schemas);
    return formatUsLanding(data, schemas);
  } catch (error) {
    console.error("Error fetching US landing page:", error);
  }
};
