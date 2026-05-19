import Image from "next/image";

import { Action } from "@/components/ui/action";
import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

import styles from "./call-to-action.module.scss";
import { CallToActionProps } from "./types";
import TrackingLink from "@/components/ui/tracking-link/tracking-link";

export const CallToAction = ({
  background,
  showImage = false,
}: CallToActionProps) => (
  <Body containerSize="medium" background={background} spacing="small">
    <div className={styles.callToAction}>
      <div className={styles.wrapper}>
        {showImage && (
          <Image
            src={"/img/placeholder.webp"}
            width={500}
            height={250}
            alt=""
          />
        )}
        <div className={styles.content}>
          <Heading variant="h2" noMargin>
            Start Your Journey with TutorCruncher
          </Heading>
          <p>
            Ready for your 2-week free trial? Create an account or get in touch.
          </p>
          <div className={styles.buttonsContainer}>
            <Action href="/book-a-call">Book a call </Action>
            <TrackingLink
              url="https://app.tutorcruncher.com/start/1/"
              text="Start a free trial"
            />
          </div>
        </div>
      </div>
    </div>
  </Body>
);
