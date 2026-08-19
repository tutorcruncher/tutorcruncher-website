import { asLink, KeyTextField, LinkField, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

import { Action } from "@/components/ui/action";
import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

import styles from "./community-hero.module.scss";

interface CommunityHeroProps {
  eyebrow?: KeyTextField;
  heading: RichTextField;
  subheading?: KeyTextField;
  buttonText?: KeyTextField;
  buttonLink?: LinkField;
}

export const CommunityHero = ({
  eyebrow,
  heading,
  subheading,
  buttonText,
  buttonLink,
}: CommunityHeroProps) => {
  const buttonUrl = asLink(buttonLink)?.trim();

  return (
    <Body containerSize="large" spacing="medium" background="blue">
      <div className={styles.hero}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <Heading variant="div" size="xlarge" center noMargin>
          <PrismicRichText field={heading} />
        </Heading>
        {subheading ? <p className={styles.subheading}>{subheading}</p> : null}
        {buttonText && buttonUrl ? (
          <div className={styles.button}>
            <Action href={buttonUrl}>{buttonText}</Action>
          </div>
        ) : null}
      </div>
    </Body>
  );
};
