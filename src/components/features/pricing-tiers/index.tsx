"use client";

import { TIERS } from "app/(default)/pricing/data/pricing";
import Link from "next/link";

import { Action } from "@/components/ui/action";
import { Body } from "@/components/ui/body";
import { PillCard } from "@/components/ui/pill-card";
import { TickSvg } from "@/svgs/tick";

import styles from "./pricing-tiers.module.scss";
import TrackingLink from "@/components/ui/tracking-link/tracking-link";

const CARD_FEE_REGIONS = ["gb", "us"];

const TierPricing = ({ tier, pricing, region }) => {
  const currency = pricing.currency;
  const basePrice = pricing[tier.pricing]?.base_price;
  const fees = pricing[tier.pricing]?.fees;

  const PricingHeader = () => (
    <div className={styles.heading}>
      <h2 className={styles.title}>{tier.name}</h2>
      <p className={styles.description}>{tier.description}</p>
    </div>
  );

  const PricingDetails = () => (
    <>
      <p className={styles.startingFrom}>Starting from</p>
      <h3>
        {currency}
        {basePrice}
        <span className={styles.billingCycle}>/month</span>
      </h3>
    </>
  );

  return (
    <>
      <div className={styles.pricing}>
        <PricingHeader />
        <PricingDetails />
      </div>
      {fees ?
        <div
          className={styles.featuresList}
        >
          <h4>Payment Fees</h4>
          <ul className={styles.features}>
            <li className={styles.feature}>
              <span>
                <TickSvg />
              </span>
              <span>{CARD_FEE_REGIONS.includes(region) ? `Standard card fees ${fees}%` : `${fees}% of client payments`}</span>
            </li>
          </ul>
        </div> : null}
    </>
  );
};

export const PricingTiers = ({ region, pricing }) => {
  return (
    <Body containerSize="large" spacing="small">
      <div className={styles.pricingTiers}>
        {TIERS.map((tier) => {
          return (
            <div className={styles.pricingTier} key={tier.pricing}>
              <TierPricing tier={tier} pricing={pricing} region={region} />
              {tier.featuresList
                .map((featuresList) => (
                  <div
                    className={styles.featuresList}
                    key={featuresList.heading}
                  >
                    <h4>{featuresList.heading}</h4>
                    <ul className={styles.features}>
                      {featuresList.features.map((feature) => (
                        <li className={styles.feature} key={feature}>
                          <span>
                            <TickSvg />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              <div className={styles.buttonWrapper}>
                <Action
                  href={tier.solutionUrl}
                  variant="outline"
                  fullwidth
                  size="small"
                >
                  Find out more
                </Action>
                <TrackingLink
                  url={`https://app.tutorcruncher.com/start/1/?plan=${tier.pricing}`}
                  text="Get Started"
                  variant="solid"
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className={styles.taxMessage}>
        Please note that all prices are exclusive of tax.
      </p>
      <div className={styles.pricingCalculatorCta}>
        <PillCard>
          <p>
            Want to estimate which the best price plan would be for you, and how
            much you would be charged? <br />
            <Link href={`/pricing-calculator/${region}`}>
              Click here to use our pricing calculator.
            </Link>
          </p>
        </PillCard>
      </div>
    </Body>
  );
};
