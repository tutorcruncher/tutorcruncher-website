import { Action } from "@/components/ui/action";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";
import TrackingLink from "@/components/ui/tracking-link/tracking-link";

import styles from "./home-pricing.module.scss";

import { BackgroundColour } from "@/types/backgroundColor";

type Currency = "GBP" | "USD";

interface HomePricingProps {
  background?: BackgroundColour;
  currency?: Currency;
}

interface Tier {
  name: string;
  description: string;
  startingFrom: Record<Currency, string>;
  pricingKey: string;
  solutionUrl: string;
}

const TIERS: Tier[] = [
  {
    name: "Pay as you go",
    description: "For tutoring companies starting out",
    startingFrom: { GBP: "£25", USD: "$30" },
    pricingKey: "payg",
    solutionUrl: "/solutions/payg",
  },
  {
    name: "Startup",
    description: "For scaling tutoring companies",
    startingFrom: { GBP: "£60", USD: "$80" },
    pricingKey: "startup",
    solutionUrl: "/solutions/startup",
  },
  {
    name: "Enterprise",
    description: "For large-scale tutoring companies",
    startingFrom: { GBP: "£200", USD: "$240" },
    pricingKey: "enterprise",
    solutionUrl: "/solutions/enterprise",
  },
];

export const HomePricing = ({
  background = "white",
  currency = "GBP",
}: HomePricingProps) => {
  return (
    <Body
      containerSize="large"
      spacing="medium"
      background={background}
      heading={
        <Heading variant="h2" center>
          Simple pricing designed to scale
        </Heading>
      }
    >
      <div className={styles.tiers}>
        {TIERS.map((tier) => (
          <div className={styles.tier} key={tier.pricingKey}>
            <div className={styles.header}>
              <h3 className={styles.name}>{tier.name}</h3>
              <p className={styles.description}>{tier.description}</p>
            </div>
            <div className={styles.pricing}>
              <p className={styles.startingFrom}>Starting from</p>
              <p className={styles.price}>
                {tier.startingFrom[currency]}
                <span className={styles.cycle}>/month</span>
              </p>
            </div>
            <div className={styles.buttons}>
              <Action
                href={tier.solutionUrl}
                variant="outline"
                fullwidth
                size="small"
              >
                Find out more
              </Action>
              <TrackingLink
                url={`https://app.tutorcruncher.com/start/1/?plan=${tier.pricingKey}`}
                text="Get started"
                variant="solid"
              />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footerLink}>
        <ArrowLink
          text="See full pricing"
          // Send visitors to the pricing page for their currency, so US
          // traffic doesn't land on the GBP default.
          href={currency === "USD" ? "/pricing/us" : "/pricing/gb"}
        />
      </div>
    </Body>
  );
};
