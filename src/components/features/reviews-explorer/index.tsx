"use client";
import clsx from "clsx";
import { useState } from "react";

import { TestimonialList } from "@/components/features/testimonials/testimonials-list";
import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

import styles from "./reviews-explorer.module.scss";

const ALL = "All";
const LOCATIONS = ["US", "UK", "ROW"];
const PLANS = ["Pay as you go", "Startup", "Enterprise"];

interface FilterRowProps {
  label: string;
  options: string[];
  active: string;
  onSelect: (value: string) => void;
}

const FilterRow = ({ label, options, active, onSelect }: FilterRowProps) => (
  <div className={styles.filterRow}>
    <span className={styles.filterLabel}>{label}</span>
    <div className={styles.chips}>
      {[ALL, ...options].map((option) => (
        <button
          key={option}
          type="button"
          className={clsx(styles.chip, active === option && styles.chipActive)}
          aria-pressed={active === option}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

export const ReviewsExplorer = ({ testimonials }) => {
  const [location, setLocation] = useState(ALL);
  const [plan, setPlan] = useState(ALL);

  // Only offer chips for types that actually have reviews (e.g. hide "ROW"
  // entirely while there are no ROW testimonials). Derived from the full list
  // so chips stay stable as the user filters.
  const availableLocations = LOCATIONS.filter((option) =>
    testimonials.some((testimonial) => testimonial.location === option)
  );
  const availablePlans = PLANS.filter((option) =>
    testimonials.some((testimonial) => testimonial.segment === option)
  );

  const visible = testimonials.filter(
    (testimonial) =>
      (location === ALL || testimonial.location === location) &&
      (plan === ALL || testimonial.segment === plan)
  );

  const hasFilters = availableLocations.length > 0 || availablePlans.length > 0;

  return (
    <Body
      containerSize="large"
      background="cream"
      heading={
        <Heading variant="h2" center>
          Customer reviews
        </Heading>
      }
    >
      {hasFilters ? (
        <div className={styles.filters} role="group" aria-label="Filter reviews">
          {availableLocations.length > 0 ? (
            <FilterRow
              label="Location"
              options={availableLocations}
              active={location}
              onSelect={setLocation}
            />
          ) : null}
          {availablePlans.length > 0 ? (
            <FilterRow
              label="Price plan"
              options={availablePlans}
              active={plan}
              onSelect={setPlan}
            />
          ) : null}
        </div>
      ) : null}

      {visible.length ? (
        <TestimonialList testimonials={visible} />
      ) : (
        <p className={styles.empty}>
          No reviews match those filters yet — try a different combination.
        </p>
      )}
    </Body>
  );
};
