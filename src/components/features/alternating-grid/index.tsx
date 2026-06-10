import { Action } from "@/components/ui/action";
import { Body } from "@/components/ui/body";
import TrackingLink from "@/components/ui/tracking-link/tracking-link";

import styles from "./alternating-grid.module.scss";
import { TextImageGridItem } from "./alternating-grid-item";
import { AlternatingGridProps } from "./types";

export const AlternatingGrid = ({
  heading,
  backgroundColour,
  items,
  variation = "default",
  showCta = false,
}: AlternatingGridProps) => {
  return (
    <Body background={backgroundColour} spacing="large" heading={heading}>
      <div className={styles.inner}>
        {items.map((item) => (
          <TextImageGridItem
            key={item.heading}
            heading={item.heading}
            content={item.content}
            variation={variation}
            imagePosition={item.imagePosition}
            button={item.button}
            image={item.image}
          />
        ))}
      </div>
      {showCta ? (
        <div className={styles.ctaButtons}>
          <TrackingLink
            url="https://app.tutorcruncher.com/start/1/"
            text="Start a free trial"
          />
          <Action href="/book-a-call" variant="outline">
            Book a call
          </Action>
        </div>
      ) : null}
    </Body>
  );
};
