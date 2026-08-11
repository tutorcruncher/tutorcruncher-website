 /* eslint-disable */
 "use client";

import { Heading } from "@/components/ui/heading";
import { NewsletterForm } from "./newsletter-form";
import styles from "./newsletter.module.scss";

export const Newsletter = () => (
  <div className={styles.newsletter}>
    <Heading size="xsmall" variant="h2" noMargin>
      Stay in the loop
    </Heading>
    <p>
      Sign up to our mailing list to get monthly updates and insights straight to your inbox.
    </p>
    <NewsletterForm />
  </div>
);
