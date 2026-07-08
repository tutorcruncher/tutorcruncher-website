import clsx from "clsx";

import { Action } from "@/components/ui/action";
import { Heading } from "@/components/ui/heading";

import styles from "./community.module.scss";
import { CommunityEvent } from "./types";

interface EventCardProps {
  event: CommunityEvent;
}

const formatLabel = (event: CommunityEvent) =>
  event.format === "online"
    ? "Online event"
    : `${event.location} – In-person`;

export const EventCard = ({ event }: EventCardProps) => (
  <article className={styles.card}>
    <span className={clsx(styles.tag, styles[`tag--${event.format}`])}>
      {formatLabel(event)}
    </span>

    <Heading variant="h3" size="xsmall" className={styles.cardTitle} noMargin>
      {event.title}
    </Heading>

    <dl className={styles.meta}>
      <div>
        <dt>Date</dt>
        <dd>{event.date}</dd>
      </div>
      <div>
        <dt>Time</dt>
        <dd>{event.time}</dd>
      </div>
      <div>
        <dt>Who&apos;s it for?</dt>
        <dd>{event.audience}</dd>
      </div>
    </dl>

    <div className={styles.cardAction}>
      <Action href={event.ctaHref} variant="outline" fullwidth>
        {event.ctaText}
      </Action>
    </div>
  </article>
);
