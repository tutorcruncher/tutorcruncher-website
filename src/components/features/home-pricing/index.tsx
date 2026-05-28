import { Action } from "@/components/ui/action";
import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";
import TrackingLink from "@/components/ui/tracking-link/tracking-link";

import styles from "./home-pricing.module.scss";

interface Tier {
  name: string;
  description: string;
  startingFrom: string;
  pricingKey: string;
  solutionUrl: string;
}

const TIERS: Tier[] = [
  {
    name: "Pay as you go",
    description: "For tutoring companies starting out",
    startingFrom: "£25",
    pricingKey: "payg",
    solutionUrl: "/solutions/payg",
  },
  {
    name: "Startup",
    description: "For scaling tutoring companies",
    startingFrom: "£60",
    pricingKey: "startup",
    solutionUrl: "/solutions/startup",
  },
  {
    name: "Enterprise",
    description: "For large-scale tutoring companies",
    startingFrom: "£200",
    pricingKey: "enterprise",
    solutionUrl: "/solutions/enterprise",
  },
];

export const HomePricing = () => {
  return (
    <Body
      containerSize="large"
      spacing="medium"
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
                {tier.startingFrom}
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
    </Body>
  );
};
