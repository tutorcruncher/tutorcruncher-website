import { BASE_META } from "@/schema/meta";

export const formatMetaData = (
  title: string,
  description: string,
  url: string,
  hidePage?: boolean,
  /**
   * Optional hreflang alternates, e.g.
   * `{ "en-US": "https://tutorcruncher.com/us", "en-GB": "https://tutorcruncher.com" }`.
   * Pass these on localised pages so search engines serve the right regional
   * variant instead of treating them as duplicate content. The page's own
   * `canonical` (the `url` argument) stays self-referencing — every regional
   * variant emits the same `languages` map but its own canonical.
   */
  languages?: Record<string, string>
) => {
  return {
    title: title || "TutorCruncher",
    description,
    ...(hidePage ? { robots: { index: false } } : {}),
    twitter: {
      ...BASE_META.twitter,
      title,
      description,
    },
    openGraph: {
      ...BASE_META.openGraph,
      url,
      title,
      description,
    },
    alternates: {
      canonical: url,
      ...(languages ? { languages } : {}),
    },
  };
};
