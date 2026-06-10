import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import type { JSX } from "react";

import { HomePricing as HomePricingComponent } from "@/components/features/home-pricing";

/**
 * Props for `HomePricing`.
 */
export type HomePricingProps = SliceComponentProps<Content.HomePricingSlice>;

/**
 * Component for "HomePricing" Slices.
 */
const HomePricing = ({ slice }: HomePricingProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <HomePricingComponent />
    </section>
  );
};

export default HomePricing;
