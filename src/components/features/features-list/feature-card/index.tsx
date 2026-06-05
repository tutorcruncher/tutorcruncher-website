import clsx from "clsx";

import { Heading } from "@/components/ui/heading";

import styles from "./feature-card.module.scss";
import { FeatureCardProps } from "./types";
import { PrismicNextImage } from "@prismicio/next";
import { ChevronDown } from "@/svgs/chevron-down";

export const FeatureCard = ({
  icon,
  title,
  intro,
  onClick,
}: FeatureCardProps) => {
  const classes = clsx(styles.infoCard);
  return (
    <button type="button" onClick={onClick} className={classes}>
      {icon?.url ? (
        <div className={styles.imageWrapper}>
          <PrismicNextImage field={icon} fallbackAlt="" />
        </div>
      ) : null}
      <Heading size="xxsmall" className={styles.heading} variant="h2">
        {title}
      </Heading>
      {intro ? <p>{intro}</p> : null}
      <span className={styles.cta} aria-hidden="true">
        <span>Learn more</span>
        <ChevronDown />
      </span>
    </button>
  );
};
