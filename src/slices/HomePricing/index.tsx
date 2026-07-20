import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import type { JSX } from "react";

import { HomePricing as HomePricingComponent } from "@/components/features/home-pricing";
import { backgroundColor } from "@/helpers/backgroundColor";

/**
 * Props for `HomePricing`.
 */
export type HomePricingProps = SliceComponentProps<Content.HomePricingSlice>;

/**
 * Component for "HomePricing" Slices.
 */
const HomePricing = ({ slice }: HomePricingProps): JSX.Element => {
  const background = backgroundColor(slice.primary.background_colour);
  const currency = slice.primary.currency === "USD" ? "USD" : "GBP";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <HomePricingComponent background={background} currency={currency} />
    </section>
  );
};

export default HomePricing;
