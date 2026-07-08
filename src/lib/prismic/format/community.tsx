import { asLink, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

import {
  CommunityDocumentData,
  EventDocument,
  Simplify,
} from "../../../../prismicio-types";
import { DEFAULT_CONTENT, DEFAULT_INTRO_IMAGE } from "@/components/features/community/data";
import {
  CommunityContent,
  CommunityEvent,
  EventFormat,
} from "@/components/features/community/types";

const DEFAULT_UPCOMING_CTA_TEXT = "Get your place";
const DEFAULT_PREVIOUS_CTA_TEXT = "Watch on demand";

const formatEvent = (
  event: EventDocument,
  defaultCtaText: string
): CommunityEvent => {
  const { data } = event;
  return {
    location: data.location || "",
    format: (data.format === "Online" ? "online" : "in-person") as EventFormat,
    title: data.title || "",
    // Human-readable date derived from the timestamp; the free-text "time" field
    // carries the timezone-aware label (e.g. "6:00pm – 9:00pm CDT").
    date: data.event_datetime
      ? new Date(data.event_datetime).toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "",
    time: data.time || "",
    audience: data.audience || "",
    ctaText: data.button_text || defaultCtaText,
    ctaHref:
      (isFilled.link(data.button_link) && asLink(data.button_link)) || "#",
  };
};

/**
 * Split events into upcoming vs. previous by their timestamp relative to `now`.
 * Upcoming is ordered soonest-first; previous is ordered most-recent-first.
 * `now` is passed in so the caller controls the cutoff (and it stays testable).
 */
const splitEventsByDate = (events: EventDocument[], now: number) => {
  const withTime = events.filter((event) => event.data.event_datetime);

  const upcoming = withTime
    .filter((event) => new Date(event.data.event_datetime).getTime() >= now)
    .sort(
      (a, b) =>
        new Date(a.data.event_datetime).getTime() -
        new Date(b.data.event_datetime).getTime()
    )
    .map((event) => formatEvent(event, DEFAULT_UPCOMING_CTA_TEXT));

  const previous = withTime
    .filter((event) => new Date(event.data.event_datetime).getTime() < now)
    .sort(
      (a, b) =>
        new Date(b.data.event_datetime).getTime() -
        new Date(a.data.event_datetime).getTime()
    )
    .map((event) => formatEvent(event, DEFAULT_PREVIOUS_CTA_TEXT));

  return { upcoming, previous };
};

export const formatCommunityPage = (
  data: Simplify<CommunityDocumentData>,
  events: EventDocument[],
  schemas,
  now: number
) => {
  const defaults = DEFAULT_CONTENT;
  const { upcoming, previous } = splitEventsByDate(events, now);

  const content: CommunityContent = {
    hero: {
      eyebrow: data.hero_eyebrow || defaults.hero.eyebrow,
      heading: isFilled.richText(data.hero_heading) ? (
        <PrismicRichText field={data.hero_heading} />
      ) : (
        defaults.hero.heading
      ),
      subheading: data.hero_subheading || defaults.hero.subheading,
      ctaText: data.hero_button_text || defaults.hero.ctaText,
      ctaHref:
        (isFilled.link(data.hero_button_link) &&
          asLink(data.hero_button_link)) ||
        defaults.hero.ctaHref,
    },
    intro: {
      heading: data.intro_heading || defaults.intro.heading,
      content: isFilled.richText(data.intro_content) ? (
        <PrismicRichText field={data.intro_content} />
      ) : (
        defaults.intro.content
      ),
      image: isFilled.image(data.intro_image)
        ? data.intro_image
        : DEFAULT_INTRO_IMAGE,
    },
    upcoming: {
      title: data.upcoming_events_title || defaults.upcoming.title,
      // Fall back to the default sample events only when no events exist in the
      // CMS at all, so the page never renders an empty grid during setup.
      events: upcoming.length ? upcoming : defaults.upcoming.events,
    },
    previous: {
      title: data.previous_events_title || defaults.previous.title,
      events: previous.length ? previous : defaults.previous.events,
    },
    newsletter: {
      eyebrow: data.newsletter_eyebrow || defaults.newsletter.eyebrow,
      heading: data.newsletter_heading || defaults.newsletter.heading,
      description: isFilled.richText(data.newsletter_description) ? (
        <PrismicRichText field={data.newsletter_description} />
      ) : (
        defaults.newsletter.description
      ),
      ctaText: data.newsletter_button_text || defaults.newsletter.ctaText,
    },
  };

  const meta = {
    title: data.meta_title,
    description: data.meta_description,
  };

  return { content, meta, schemas };
};
