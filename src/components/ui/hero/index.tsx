import type { ReactNode } from "react";

import { Body } from "../body";
import { Heading } from "../heading";
import { HeadingProps } from "../heading/types";
import styles from "./hero.module.scss";

interface HeroProps {
  heading: ReactNode;
  headingVariant?: HeadingProps["variant"];
  intro?: string;
  actions?: ReactNode;
}

export const Hero = ({
  heading,
  headingVariant,
  intro,
  actions,
}: HeroProps) => {
  return (
    <Body
      heading={
        <Heading variant={headingVariant} size="xlarge" noMargin center>
          {heading}
        </Heading>
      }
      containerSize="large"
      spacing="medium"
      background="blue"
    >
      {intro ? <div className={styles.intro}>{intro}</div> : null}
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </Body>
  );
};
