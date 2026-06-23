"use client";
import { useEffect, useState, type ReactNode } from "react";

import { Body } from "../../ui/body";
import { Heading } from "../../ui/heading";
import styles from "./logos.module.scss";
import { PrismicNextImage } from "@prismicio/next";
import { ImageField } from "@prismicio/types";
import { BackgroundColour } from "@/types/backgroundColor";

interface LogosProps {
  heading: ReactNode;
  logos: ImageField[];
  backgroundColour?: BackgroundColour;
}

const STEP_MS = 2000;
const FLIP_MS = 600;
const VISIBLE_SLOTS = 5;

type SlotState = {
  current: number;
  next: number;
  flipping: boolean;
};

export const Logos = ({
  heading,
  logos,
  backgroundColour = "blue",
}: LogosProps) => {
  const total = logos.length;
  const slotCount = Math.min(VISIBLE_SLOTS, total);
  const shouldRoll = total > slotCount;

  const [slots, setSlots] = useState<SlotState[]>(() =>
    Array.from({ length: slotCount }, (_, i) => ({
      current: i % Math.max(total, 1),
      next: (i + slotCount) % Math.max(total, 1),
      flipping: false,
    })),
  );
  const [activeSlot, setActiveSlot] = useState(0);

  useEffect(() => {
    if (!shouldRoll) return;

    setSlots((prev) => {
      const out = [...prev];
      out[activeSlot] = { ...out[activeSlot], flipping: true };
      return out;
    });

    const finishFlip = window.setTimeout(() => {
      setSlots((prev) => {
        const out = [...prev];
        const s = out[activeSlot];
        out[activeSlot] = {
          current: s.next,
          next: (s.next + slotCount) % total,
          flipping: false,
        };
        return out;
      });
    }, FLIP_MS);

    const advanceSlot = window.setTimeout(() => {
      setActiveSlot((i) => (i + 1) % slotCount);
    }, STEP_MS);

    return () => {
      window.clearTimeout(finishFlip);
      window.clearTimeout(advanceSlot);
    };
  }, [activeSlot, shouldRoll, slotCount, total]);

  return (
    <Body
      background={backgroundColour}
      heading={
        <Heading variant="h2" size="xsmall" center>
          {heading}
        </Heading>
      }
    >
      <div className={styles.logos}>
        {slots.map((slot, i) => {
          const currentLogo = logos[slot.current];
          const nextLogo = logos[slot.next];
          return (
            <div key={i} className={styles.slot} data-index={i}>
              <div
                className={`${styles.track} ${slot.flipping ? styles.flipping : ""}`}
              >
                <div className={styles.face}>
                  <PrismicNextImage fallbackAlt="" field={currentLogo} />
                </div>
                <div className={styles.face}>
                  <PrismicNextImage fallbackAlt="" field={nextLogo} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Body>
  );
};
