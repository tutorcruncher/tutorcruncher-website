import { createClient } from "prismicio";
import { reps } from "./(default)/book-a-call/data";

const BASE_URL = "https://tutorcruncher.com";

const formatEntries = (docs, pathFormatter) =>
  Array.isArray(docs)
    ? docs.map((doc) => ({
        url: `${BASE_URL}/${pathFormatter(doc)}`,
        lastModified: new Date(doc.last_publication_date)
          .toISOString()
          .split("T")[0],
      }))
    : [
        {
          url: `${BASE_URL}/${pathFormatter(docs)}`,
          lastModified: new Date(docs.last_publication_date)
            .toISOString()
            .split("T")[0],
        },
      ];

export default async function sitemap() {
  const client = createClient();

  const [
    home,
    integrationsLanding,
    featuresLanding,
    contact,
    reviews,
    releases,
    pages,
    articles,
    solutions,
    features,
    pricing,
    usLanding,
  ] = await Promise.all([
    client.getSingle("home_page"),
    client.getSingle("integrations"),
    client.getSingle("features"),
    client.getSingle("contact"),
    client.getSingle("reviews"),
    client.getSingle("releases"),
    client.getAllByType("page"),
    client.getAllByType("article"),
    client.getAllByType("solutions"),
    client.getAllByType("feature"),
    client.getAllByType("pricing"),
    // Unpublished in some environments — resolve to null rather than
    // rejecting Promise.all and taking down the whole sitemap.
    client.getSingle("us_landing").catch(() => null),
  ]);

  const homeEntries = formatEntries(home, () => "");
  const pageEntries = formatEntries(pages, (doc) => doc.uid);
  const articleEntries = formatEntries(articles, (doc) => `blog/${doc.uid}`);
  const solutionEntries = formatEntries(
    solutions,
    (doc) => `solutions/${doc.uid}`
  );
  const featureEntries = formatEntries(
    features,
    (doc) => `features/${doc.uid}`
  );
  const featureLandingEntries = formatEntries(
    featuresLanding,
    () => "features"
  );
  const integrationEntries = formatEntries(
    integrationsLanding,
    () => "integrations"
  );
  const pricingEntries = formatEntries(pricing, (doc) => `pricing/${doc.uid}`);
  const usLandingEntries = usLanding
    ? formatEntries(usLanding, () => "us")
    : [];
  const contactEntries = formatEntries(contact, () => "contact");
  const reviewEntries = formatEntries(reviews, () => "reviews");
  const releasesEntries = formatEntries(releases, () => "changes");

  // Static Pages
  const bookACallEntries = reps.map((rep) => ({
    url: `${BASE_URL}/book-a-call/${rep.hermes_admin_id}`,
    lastModified: new Date("2024-12-17").toISOString(),
  }));

  return [
    ...homeEntries,
    ...usLandingEntries,
    ...pageEntries,
    ...articleEntries,
    ...solutionEntries,
    ...featureEntries,
    ...featureLandingEntries,
    ...integrationEntries,
    ...pricingEntries,
    ...contactEntries,
    ...reviewEntries,
    ...releasesEntries,
    ...bookACallEntries,
  ];
}
