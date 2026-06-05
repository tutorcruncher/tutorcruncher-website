import clsx from "clsx";

import { TrustpilotRating } from "@/components/ui/trustpilot-rating";

import styles from "./customer-trust.module.scss";

export const TRUSTED_BY_LABEL =
  "Trusted by 1,800+ tutoring companies in the UK, US, and worldwide";

interface CustomerTrustProps {
  className?: string;
  center?: boolean;
}

export const CustomerTrust = ({
  className,
  center = false,
}: CustomerTrustProps) => (
  <div className={clsx(styles.trust, center && styles.center, className)}>
    <p className={styles.eyebrow}>{TRUSTED_BY_LABEL}</p>
    <TrustpilotRating />
  </div>
);
