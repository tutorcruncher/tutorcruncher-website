import { ImageField, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import { Action } from "@/components/ui/action";
import { Heading } from "@/components/ui/heading";
import { TrustpilotRating } from "@/components/ui/trustpilot-rating";
import TrackingLink from "@/components/ui/tracking-link/tracking-link";

import styles from "./us-landing-hero.module.scss";

interface Cta {
  label: string;
  url: string;
}

interface UsLandingHeroProps {
  eyebrow?: string | null;
  heading: React.ReactNode;
  intro?: string | null;
  trustLine?: string | null;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  heroImages: { image: ImageField }[];
}

const DEFAULT_PRIMARY_CTA: Cta = {
  label: "Start a free trial",
  url: "https://app.tutorcruncher.com/start/1/",
};

const DEFAULT_SECONDARY_CTA: Cta = {
  label: "Book a call",
  url: "/book-a-call",
};

export const UsLandingHero = ({
  eyebrow,
  heading,
  intro,
  trustLine,
  primaryCta = DEFAULT_PRIMARY_CTA,
  secondaryCta = DEFAULT_SECONDARY_CTA,
  heroImages = [],
}: UsLandingHeroProps) => {
  return (
    <div className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.text}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <Heading size="large" variant="div" noMargin>
            {heading}
          </Heading>
          {intro && <p className={styles.tagLine}>{intro}</p>}
          <div className={styles.buttons}>
            <TrackingLink url={primaryCta.url} text={primaryCta.label} />
            <Action href={secondaryCta.url}>{secondaryCta.label}</Action>
          </div>
          <div className={styles.trust}>
            {trustLine ? (
              <p className={styles.trustLine}>{trustLine}</p>
            ) : (
              <TrustpilotRating />
            )}
          </div>
        </div>
        <div className={styles.animations}>
          {isFilled.image(heroImages[1]?.image) && (
            <div className={styles.imageOne}>
              <PrismicNextImage field={heroImages[1].image} fallbackAlt="" />
            </div>
          )}
          {isFilled.image(heroImages[2]?.image) && (
            <div className={styles.imageTwo}>
              <PrismicNextImage field={heroImages[2].image} fallbackAlt="" />
            </div>
          )}
          {isFilled.image(heroImages[3]?.image) && (
            <div className={styles.imageThree}>
              <PrismicNextImage field={heroImages[3].image} fallbackAlt="" />
            </div>
          )}
          {isFilled.image(heroImages[4]?.image) && (
            <div className={styles.imageFour}>
              <PrismicNextImage field={heroImages[4].image} fallbackAlt="" />
            </div>
          )}
          {isFilled.image(heroImages[0]?.image) && (
            <div className={styles.imageWrapper}>
              <PrismicNextImage
                field={heroImages[0].image}
                loading="eager"
                fallbackAlt=""
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
