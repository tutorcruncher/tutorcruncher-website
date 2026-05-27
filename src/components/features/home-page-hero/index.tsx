import { Action } from "../../ui/action";
import { Heading } from "../../ui/heading";
import { TrustpilotRating } from "../../ui/trustpilot-rating";
import styles from "./home-page-hero.module.scss";
import TrackingLink from "@/components/ui/tracking-link/tracking-link";
import { PrismicNextImage } from "@prismicio/next";

export const HomePageHero = ({ heading, intro, heroImages }) => {
  return (
    <div className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <p className={styles.eyebrow}>
            Trusted by 1,800+ tutoring companies in the UK, US, and worldwide
          </p>
          <Heading size="large" variant="div" noMargin>
            {heading}
          </Heading>
          <p className={styles.tagLine}>{intro}</p>
          <div className={styles.buttons}>
            <TrackingLink
              url="https://app.tutorcruncher.com/start/1/"
              text="Start a free trial"
            />
            <Action href="/book-a-call">Book a demo</Action>
          </div>
          <div className={styles.trust}>
            <TrustpilotRating />
          </div>
        </div>
        <div className={styles.animations}>
          <div className={styles.imageOne}>
            <PrismicNextImage field={heroImages[1].image} fallbackAlt="" />
          </div>
          <div className={styles.imageTwo}>
            <PrismicNextImage field={heroImages[2].image} fallbackAlt="" />
          </div>
          <div className={styles.imageThree}>
            <PrismicNextImage field={heroImages[3].image} fallbackAlt="" />
          </div>
          <div className={styles.imageFour}>
            <PrismicNextImage field={heroImages[4].image} fallbackAlt="" />
          </div>
          <div className={styles.imageWrapper}>
            <PrismicNextImage
              field={heroImages[0].image}
              loading="eager"
              fallbackAlt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
