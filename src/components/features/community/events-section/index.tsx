import { asLink } from "@prismicio/client";

import { EventDocument } from "../../../../../prismicio-types";
import { Action } from "@/components/ui/action";
import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";
import { Tag } from "@/components/ui/tag";

import styles from "./events-section.module.scss";

interface EventsSectionProps {
  title: string;
  events: EventDocument[];
  upcoming?: boolean;
}

const formatEventDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const EventsSection = ({
  title,
  events,
  upcoming = false,
}: EventsSectionProps) => (
  <Body containerSize="large" spacing="medium">
    <Heading variant="h2" size="large" center>
      {title}
    </Heading>
    <div className={styles.grid}>
      {events.map((event) => {
        const { data } = event;
        const buttonUrl = asLink(data.button_link)?.trim();
        const buttonText =
          data.button_text ||
          (upcoming ? "Get your place" : "Watch on demand");

        return (
          <article key={event.id} className={styles.card}>
            <div className={styles.cardTop}>
              {data.format ? <Tag title={data.format} noHoverEffect /> : null}
              {data.event_datetime ? (
                <p className={styles.date}>
                  {formatEventDate(data.event_datetime)}
                </p>
              ) : null}
              <Heading variant="h3" size="small" noMargin>
                {data.title}
              </Heading>
              <ul className={styles.details}>
                {data.time ? <li>{data.time}</li> : null}
                {data.location ? <li>{data.location}</li> : null}
                {data.audience ? <li>{data.audience}</li> : null}
              </ul>
            </div>
            {buttonUrl ? (
              <div className={styles.cardAction}>
                <Action href={buttonUrl} variant={upcoming ? "solid" : "outline"}>
                  {buttonText}
                </Action>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  </Body>
);
