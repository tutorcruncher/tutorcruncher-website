import { isFilled, KeyTextField, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

import { NewsletterForm } from "@/components/features/articles/newsletter/newsletter-form";
import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

import styles from "./community-newsletter.module.scss";

interface CommunityNewsletterProps {
  eyebrow?: KeyTextField;
  heading?: KeyTextField;
  description?: RichTextField;
  buttonText?: KeyTextField;
}

export const CommunityNewsletter = ({
  eyebrow,
  heading,
  description,
  buttonText,
}: CommunityNewsletterProps) => (
  <Body containerSize="large" spacing="medium" background="cream">
    <div className={styles.newsletter}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <Heading variant="h2" size="large" center noMargin>
        {heading || "Never miss an event"}
      </Heading>
      {isFilled.richText(description) ? (
        <div className={styles.description}>
          <PrismicRichText field={description} />
        </div>
      ) : null}
      <div className={styles.form}>
        <NewsletterForm buttonText={buttonText || undefined} />
      </div>
    </div>
  </Body>
);
