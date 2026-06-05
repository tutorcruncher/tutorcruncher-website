import { CustomerTrust } from "@/components/features/customer-trust";
import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

import styles from "./reviews-hero.module.scss";

export const ReviewsHero = () => (
  <Body containerSize="large" spacing="medium" background="blue">
    <div className={styles.hero}>
      <Heading variant="h1" size="xlarge" center noMargin>
        What our customers are saying
      </Heading>
      <p className={styles.subheading}>
        Here&apos;s what tutoring business owners across the UK, US, and beyond
        have to say about running their businesses on TutorCruncher.
      </p>
      <CustomerTrust center className={styles.trust} />
    </div>
  </Body>
);
