import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";

import { AllDocumentTypes } from "../prismicio-types";

export const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT;

let client: prismic.Client<AllDocumentTypes>;

const routes: prismic.ClientConfig["routes"] = [
  {
    type: "home_page",
    path: "/",
  },
  {
    type: "page",
    path: "/:uid",
  },
  {
    type: "solutions",
    path: "/solutions/:uid",
  },
  {
    type: "article",
    path: "/blog/:uid",
  },
  {
    type: "feature",
    path: "/features/:uid",
  },
  {
    type: "features",
    path: "/features",
  },
  {
    type: "pricing",
    path: "/pricing/:uid",
  },
  {
    type: "release",
    path: "/changes",
  },
  {
    type: "releases",
    path: "/changes",
  },
  {
    type: "integration",
    path: "/integrations",
  },
  {
    type: "integrations",
    path: "/integrations",
  },
  {
    type: "testimonial",
    path: "/reviews",
  },
  // The community and event types are not yet published to the master ref.
  // Prismic validates every type declared here against the ref and rejects the
  // whole request if one is unknown, which breaks every getAllByType call at
  // build time. Restore these together with the community types when they are
  // published; keep this list in sync with prismic.config.json.
  // {
  //   type: "community",
  //   path: "/community",
  // },
  // {
  //   type: "event",
  //   path: "/community/:uid",
  // },
];

export const createClient = (config = {}) => {
  if (!client) {
    client = prismic.createClient(repositoryName, {
      routes,
      ...config,
    });

    prismicNext.enableAutoPreviews({ client });
  }

  return client;
};
