import { ReactNode } from "react";

import { CustomerTrust } from "@/components/features/customer-trust";
import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

import styles from "./reviews-hero.module.scss";

interface ReviewsHeroProps {
  heading?: ReactNode;
  subheading?: string;
}

export const ReviewsHero = ({ heading, subheading }: ReviewsHeroProps) => (
  <Body containerSize="large" spacing="medium" background="blue">
    <div className={styles.hero}>
      <Heading variant="h1" size="xlarge" center noMargin>
        {heading}
      </Heading>
      {subheading ? (
        <p className={styles.subheading}>{subheading}</p>
      ) : null}
      <CustomerTrust center className={styles.trust} />
    </div>
  </Body>
);
