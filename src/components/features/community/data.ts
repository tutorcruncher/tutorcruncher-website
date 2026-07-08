import { ImageField } from "@prismicio/types";

import { CommunityContent } from "./types";

// NOTE: Default/fallback content used when the corresponding Prismic fields are
// empty, so the page never renders blank while the CMS is being populated.

// Placeholder image — uses a remote URL so PrismicNextImage's imgix URL builder
// can resolve it. Replaced by the Prismic "Intro image" field when set.
const PLACEHOLDER_IMAGE: ImageField = {
  id: "community-intro-placeholder",
  url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",
  alt: "Leaders in Tutoring event",
  copyright: null,
  dimensions: { width: 1200, height: 800 },
  edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
};

export const DEFAULT_INTRO_IMAGE = PLACEHOLDER_IMAGE;

// Default sample events shown only when no events exist in Prismic yet, and the
// hero/intro/newsletter fallbacks for empty CMS fields.
export const DEFAULT_CONTENT: CommunityContent = {
  hero: {
    eyebrow: "Community",
    heading: "Join the Leaders in Tutoring community",
    subheading:
      "Your place to meet like-minded education leaders to learn and grow together.",
    ctaText: "Join the community",
    ctaHref: "#newsletter",
  },
  intro: {
    heading: "Find your community wherever you are",
    content:
      "Connect with a community of tutoring leaders who understand the unique challenges of running a tutoring business. With regular in-person and online events, find your community wherever you are.",
    image: PLACEHOLDER_IMAGE,
  },
  upcoming: {
    title: "Upcoming Leaders in Tutoring events",
    events: [
      {
        location: "Chicago",
        format: "in-person",
        title: "Scaling Your Tutoring Business in 2026",
        date: "Thursday, 17 September 2026",
        time: "6:00pm – 9:00pm CDT",
        audience: "Agency owners and operations leads",
        ctaText: "Get your place",
        ctaHref: "#",
      },
      {
        location: "London",
        format: "in-person",
        title: "Building a Tutor Network That Lasts",
        date: "Wednesday, 7 October 2026",
        time: "6:30pm – 9:00pm BST",
        audience: "Founders and managing directors",
        ctaText: "Get your place",
        ctaHref: "#",
      },
      {
        location: "Online",
        format: "online",
        title: "Marketing Masterclass for Tutoring Companies",
        date: "Tuesday, 20 October 2026",
        time: "4:00pm – 5:00pm BST",
        audience: "Marketing and growth teams",
        ctaText: "Get your place",
        ctaHref: "#",
      },
    ],
  },
  previous: {
    title: "Catch up on previous events",
    events: [
      {
        location: "Chicago",
        format: "in-person",
        title: "Hiring & Retaining Great Tutors",
        date: "Thursday, 13 March 2026",
        time: "6:00pm – 9:00pm CDT",
        audience: "Agency owners and operations leads",
        ctaText: "Watch on demand",
        ctaHref: "#",
      },
      {
        location: "Online",
        format: "online",
        title: "Pricing Your Tutoring Services for Profit",
        date: "Tuesday, 4 February 2026",
        time: "4:00pm – 5:00pm GMT",
        audience: "Founders and finance leads",
        ctaText: "Watch on demand",
        ctaHref: "#",
      },
      {
        location: "Online",
        format: "online",
        title: "Getting Started with TutorCruncher",
        date: "Wednesday, 15 January 2026",
        time: "3:00pm – 4:00pm GMT",
        audience: "New and prospective customers",
        ctaText: "Watch on demand",
        ctaHref: "#",
      },
    ],
  },
  newsletter: {
    eyebrow: "Join the community",
    heading: "Never miss an event",
    description:
      "Stay up to date with our next Leaders in Tutoring events online and in-person by joining our mailing list.",
    ctaText: "Subscribe",
  },
};
