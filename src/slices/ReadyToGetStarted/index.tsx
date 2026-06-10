import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import type { JSX } from "react";

import { ReadyToGetStarted as ReadyToGetStartedComponent } from "@/components/features/ready-to-get-started";

/**
 * Props for `ReadyToGetStarted`.
 */
export type ReadyToGetStartedProps =
  SliceComponentProps<Content.ReadyToGetStartedSlice>;

/**
 * Component for "ReadyToGetStarted" Slices.
 */
const ReadyToGetStarted = ({ slice }: ReadyToGetStartedProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <ReadyToGetStartedComponent />
    </section>
  );
};

export default ReadyToGetStarted;
