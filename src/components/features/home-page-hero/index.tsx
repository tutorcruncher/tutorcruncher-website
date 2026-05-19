import { Action } from "../../ui/action";
import { Heading } from "../../ui/heading";
import styles from "./home-page-hero.module.scss";
import TrackingLink from "@/components/ui/tracking-link/tracking-link";
import { PrismicNextImage } from "@prismicio/next";

export const HomePageHero = ({ heading, intro, heroImages }) => {
  return (
    <div className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <Heading size="large" variant="div" noMargin>
            {heading}
          </Heading>
          <p className={styles.tagLine}>{intro}</p>
          <div className={styles.buttons}>
            <Action href="/book-a-call">Book a call</Action>
            <TrackingLink
              url="https://app.tutorcruncher.com/start/1/"
              text="Start a free trial"
            />
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
