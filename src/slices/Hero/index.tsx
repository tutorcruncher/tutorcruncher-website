import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import type { JSX } from "react";

import { HeroActions } from "@/components/features/hero/hero-actions";
import { SolutionHero } from "@/components/features/hero/solution-hero";
import { Hero as HeroComponent } from "@/components/ui/hero";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice, context }: HeroProps): JSX.Element => {
  const { heading, intro } = slice.primary;

  if (!Array.isArray(heading)) return;

  const headingText = <PrismicRichText field={heading} />;

  if (slice.variation === "solutionHero") {
    return (
      <SolutionHero
        heading={headingText}
        intro={intro}
        pricingTier={slice.primary.pricing_tier}
      />
    );
  }

  const showHeroActions = (context as any)?.showHeroActions === true;

  return (
    <HeroComponent
      heading={headingText}
      intro={intro}
      headingVariant="div"
      actions={showHeroActions ? <HeroActions /> : null}
    />
  );
};

export default Hero;
