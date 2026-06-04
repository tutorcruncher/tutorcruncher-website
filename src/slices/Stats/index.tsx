import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import type { JSX } from "react";

import { Stats as StatsComponent } from "@/components/features/stats";
/**
 * Props for `Stats`.
 */
export type StatsProps = SliceComponentProps<Content.StatsSlice>;

/**
 * Component for "Stats" Slices.
 */
const Stats = ({ slice }: StatsProps): JSX.Element => {
  const { heading, stats } = slice.primary;

  const headingText = <PrismicRichText field={heading} />;

  const formattedStats = stats.map((stat) => {
    return {
      image: stat.image,
      percent: stat.percent,
      description: stat.description,
      source: stat.source,
    };
  });

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <StatsComponent heading={headingText} stats={formattedStats} />
    </section>
  );
};

export default Stats;
