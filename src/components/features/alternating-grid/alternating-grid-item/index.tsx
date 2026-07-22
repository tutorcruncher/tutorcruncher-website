import clsx from "clsx";

import { Heading } from "@/components/ui/heading";
import { TrackedAction } from "@/components/ui/tracked-action";

import { AlternatingGridItem } from "../types";
import styles from "./alternating-grid-item.module.scss";
import { PrismicNextImage } from "@prismicio/next";

export const TextImageGridItem = ({
  heading,
  content,
  button,
  image,
  imagePosition,
  className,
  variation = "default",
}: AlternatingGridItem) => {
  return (
    <div
      className={clsx(
        "animate",
        styles.alternatingGridItem,
        styles[`variant--${variation}`],
        image && imagePosition === "Left" && styles.imageOnLeft,
        className,
      )}
    >
      {image ? (
        <div className={styles.imageWrapper}>
          <PrismicNextImage field={image} fallbackAlt="" />
        </div>
      ) : null}
      <div className={styles.contentWrapper}>
        {heading ? (
          <Heading
            variant="h2"
            noMargin
            size={variation === "withBackground" ? "large" : "medium"}
            className={styles.header}
          >
            {heading}
          </Heading>
        ) : null}
        <div className={styles.content}>{content}</div>
        {button ? (
          <div className={styles.actionWrapper}>
            <TrackedAction href={button.url}>{button.text}</TrackedAction>
          </div>
        ) : null}
      </div>
    </div>
  );
};
