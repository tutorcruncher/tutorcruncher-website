import { Action } from "@/components/ui/action";
import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";
import TrackingLink from "@/components/ui/tracking-link/tracking-link";

import styles from "./reviews-cta.module.scss";

export const ReviewsCta = () => (
  <Body
    containerSize="medium"
    spacing="small"
    background="cream"
    heading={
      <Heading variant="h2" center>
        Ready to see why 1,800+ tutoring companies chose TutorCruncher?
      </Heading>
    }
  >
    <div className={styles.inner}>
      <p className={styles.copy}>
        Try it for yourself today. Start a free trial or talk to our expert team.
      </p>
      <div className={styles.buttons}>
        <TrackingLink
          url="https://app.tutorcruncher.com/start/1/"
          text="Start a free trial"
          variant="solid"
        />
        <Action href="/book-a-call" variant="outline">
          Book a call
        </Action>
      </div>
    </div>
  </Body>
);
