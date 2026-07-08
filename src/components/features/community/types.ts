import { ImageField } from "@prismicio/types";
import { ReactNode } from "react";

export type EventFormat = "in-person" | "online";

export interface CommunityEvent {
  location: string;
  format: EventFormat;
  title: string;
  date: string;
  time: string;
  audience: string;
  ctaText: string;
  ctaHref: string;
}

export interface CommunityContent {
  hero: {
    eyebrow: string;
    heading: ReactNode;
    subheading: string;
    ctaText: string;
    ctaHref: string;
  };
  intro: {
    heading: string;
    content: ReactNode;
    image: ImageField;
  };
  upcoming: {
    title: string;
    events: CommunityEvent[];
  };
  previous: {
    title: string;
    events: CommunityEvent[];
  };
  newsletter: {
    eyebrow: string;
    heading: string;
    description: ReactNode;
    ctaText: string;
  };
}
