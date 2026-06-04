import { ReactNode } from "react";

import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

import styles from "./home-security.module.scss";

interface SecurityFeature {
  title: string;
  description: string;
  icon: ReactNode;
}

const iconProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const FEATURES: SecurityFeature[] = [
  {
    title: "GDPR Compliant",
    description: "Fully compliant with data protection regulations",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Encrypted data",
    description: "Your data is encrypted and securely stored at all times",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        <path d="M12 14v3" />
      </svg>
    ),
  },
  {
    title: "Stripe-secured payments",
    description:
      "Secure payments you can trust to scale your business, wherever you are",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
        <path d="M6 15h4" />
      </svg>
    ),
  },
  {
    title: "Dedicated human support",
    description: "Our UK and US support teams are on hand every step of the way",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M4 13a8 8 0 0 1 16 0" />
        <rect x="2" y="13" width="4" height="6" rx="1.5" />
        <rect x="18" y="13" width="4" height="6" rx="1.5" />
        <path d="M20 19a4 4 0 0 1-4 3h-2" />
      </svg>
    ),
  },
];

export const HomeSecurity = () => {
  return (
    <Body
      containerSize="large"
      spacing="medium"
      background="blue"
      heading={
        <>
          <Heading variant="h2" center>
            Built for tutoring
          </Heading>
          <p className={styles.subheading}>
            Secure technology designed for your tutoring business
          </p>
        </>
      }
    >
      <div className={styles.grid}>
        {FEATURES.map((feature) => (
          <div className={styles.card} key={feature.title}>
            <span className={styles.icon}>{feature.icon}</span>
            <h3 className={styles.title}>{feature.title}</h3>
            <p className={styles.description}>{feature.description}</p>
          </div>
        ))}
      </div>
    </Body>
  );
};
