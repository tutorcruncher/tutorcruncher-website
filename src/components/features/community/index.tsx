import { AlternatingGrid } from "@/components/features/alternating-grid";
import { Action } from "@/components/ui/action";
import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

import styles from "./community.module.scss";
import { DEFAULT_CONTENT } from "./data";
import { EventCard } from "./event-card";
import { NewsletterForm } from "./newsletter-form";
import { CommunityContent } from "./types";

interface CommunityProps {
  content?: CommunityContent;
}

export const Community = ({ content = DEFAULT_CONTENT }: CommunityProps) => {
  const { hero, intro, upcoming, previous, newsletter } = content;

  return (
    <>
      {/* Hero */}
      <Body background="blue" spacing="large" containerSize="medium">
        <div className={styles.hero}>
          <span className={styles.eyebrow}>{hero.eyebrow}</span>
          <Heading variant="h1" size="xlarge" center noMargin>
            {hero.heading}
          </Heading>
          <p className={styles.heroIntro}>{hero.subheading}</p>
          <div className={styles.heroActions}>
            <Action href={hero.ctaHref} variant="solid">
              {hero.ctaText}
            </Action>
          </div>
        </div>
      </Body>

      {/* Intro: text left, image right */}
      <AlternatingGrid
        heading={null}
        backgroundColour="cream"
        items={[
          {
            heading: intro.heading,
            content: intro.content,
            image: intro.image,
            imagePosition: "Right",
          },
        ]}
      />

      {/* Upcoming events */}
      <Body spacing="medium" containerSize="large">
        <Heading
          variant="h2"
          size="large"
          className={styles.sectionTitle}
          center
        >
          {upcoming.title}
        </Heading>
        <div className={styles.cards}>
          {upcoming.events.map((event) => (
            <EventCard key={event.title} event={event} />
          ))}
        </div>
      </Body>

      {/* Previous events */}
      <Body background="cream" spacing="medium" containerSize="large">
        <Heading
          variant="h2"
          size="large"
          className={styles.sectionTitle}
          center
        >
          {previous.title}
        </Heading>
        <div className={styles.cards}>
          {previous.events.map((event) => (
            <EventCard key={event.title} event={event} />
          ))}
        </div>
      </Body>

      {/* Newsletter / CTA */}
      <Body
        background="blue"
        spacing="medium"
        containerSize="small"
        heading={
          <div id="newsletter" className={styles.newsletterHeader}>
            <span className={styles.eyebrow}>{newsletter.eyebrow}</span>
            <Heading variant="h2" size="large" center noMargin>
              {newsletter.heading}
            </Heading>
            <div className={styles.newsletterDescription}>
              {newsletter.description}
            </div>
          </div>
        }
      >
        <NewsletterForm ctaText={newsletter.ctaText} />
      </Body>
    </>
  );
};
