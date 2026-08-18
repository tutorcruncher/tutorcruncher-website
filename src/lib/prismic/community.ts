import { createClient } from "prismicio";

import { fetchSchemas } from "./helpers";

export const fetchCommunityPage = async () => {
  const client = createClient();
  const { data } = await client.getSingle("community");
  const events = await client.getAllByType("event", {
    orderings: [{ field: "my.event.event_datetime", direction: "asc" }],
  });
  const schemas = await fetchSchemas(data.schemas);

  const now = new Date();
  const dated = events.filter((event) => event.data.event_datetime);
  const undated = events.filter((event) => !event.data.event_datetime);

  const upcomingEvents = dated.filter(
    (event) => new Date(event.data.event_datetime) >= now
  );
  // Most recent first; events with no datetime sink to the bottom.
  const previousEvents = [
    ...dated
      .filter((event) => new Date(event.data.event_datetime) < now)
      .reverse(),
    ...undated,
  ];

  return { data, upcomingEvents, previousEvents, schemas };
};
