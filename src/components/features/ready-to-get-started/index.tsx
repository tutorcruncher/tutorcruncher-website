import clsx from "clsx";
import { ReactNode } from "react";

import { Action } from "@/components/ui/action";
import { Heading } from "@/components/ui/heading";
import { PillCard } from "@/components/ui/pill-card";

import styles from "./ready-to-get-started.module.scss";
import TrackingLink from "@/components/ui/tracking-link/tracking-link";
import { BackgroundColour } from "@/types/backgroundColor";

interface ReadyToGetStartedProps {
  heading?: ReactNode;
  background?: BackgroundColour;
}

export const ReadyToGetStarted = ({
  heading,
  background = "cream",
}: ReadyToGetStartedProps) => {
  return (
    <div
      className={clsx(styles.wrapper, {
        [styles.cream]: background === "cream",
        [styles.blue]: background === "blue",
        [styles.white]: background === "white",
      })}
    >
      <div className={styles.inner}>
        <div className={styles.content}>
          <div
            className={clsx(styles.left, "animate")}
            style={{ animationDelay: `0.2s` }}
          >
            <Heading variant="h2" size="xlarge" className={styles.heading}>
              {heading ?? (
                <>
                  Ready to cut your admin time by <b>60%?</b>
                </>
              )}
            </Heading>
            <div className={styles.buttonsContainer}>
              <Action href="/book-a-call">Book a call </Action>
              <TrackingLink
                url="https://app.tutorcruncher.com/start/1/"
                text="Start a free trial"
                variant="white"
              />
            </div>
          </div>
          <div className={clsx(styles.right, "animate-children")}>
            <PillCard>
              <p>Sign up for free trial today</p>
            </PillCard>
            <PillCard>
              <p>
                Pay nothing for two weeks with free cancellation if you don’t
                continue
              </p>
            </PillCard>
            <PillCard>
              <p>
                Free advice and support from the day you sign up from our
                experts
              </p>
            </PillCard>
          </div>
        </div>
      </div>
    </div>
  );
};
