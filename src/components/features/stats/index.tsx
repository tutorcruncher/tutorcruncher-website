import clsx from "clsx";

import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

import styles from "./stats.module.scss";
import { StatsProps } from "./types";
import { PrismicNextImage } from "@prismicio/next";

export const Stats = ({ heading, stats }: StatsProps) => {
  return (
    <Body
      background="cream"
      heading={
        <Heading center size="small" variant="div">
          {heading}
        </Heading>
      }
    >
      <div className={styles.statsGrid}>
        {stats.map(({ image, percent, description, source }, index) => (
          <div
            key={description}
            className={clsx(styles.statsCard, "animate")}
            style={{ animationDelay: ` ${index * 0.2}s` }}
          >
            <PrismicNextImage field={image} fallbackAlt="" />
            <Heading size="small" variant="h3" noMargin>
              {percent}
            </Heading>
            <p className={styles.description}>{description}</p>
            {source ? <p className={styles.source}>{source}</p> : null}
          </div>
        ))}
      </div>
    </Body>
  );
};
