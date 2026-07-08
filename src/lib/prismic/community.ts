import { createClient } from "prismicio";

import { DEFAULT_CONTENT } from "@/components/features/community/data";
import { fetchSchemas } from "@/lib/prismic/helpers";

import { formatCommunityPage } from "./format/community";

export const fetchCommunityPage = async () => {
  const client = createClient();
  const now = Date.now();
  try {
    // Fetch the page singleton and all event documents together. Events are a
    // repeatable type and get sorted into upcoming/previous by date at format
    // time. Next.js caches these fetches on the server by default.
    const [{ data }, events] = await Promise.all([
      client.getSingle("community"),
      client.getAllByType("event", {
        orderings: {
          field: "my.event.event_datetime",
          direction: "asc",
        },
      }),
    ]);
    const schemas = await fetchSchemas(data.schemas);
    return formatCommunityPage(data, events, schemas, now);
  } catch (error) {
    // The singleton or event type may not exist in Prismic yet — fall back to
    // default content so the page still renders while the CMS is being set up.
    console.error("Error fetching community page:", error);
    return {
      content: DEFAULT_CONTENT,
      meta: { title: null, description: null },
      schemas: null,
    };
  }
};
