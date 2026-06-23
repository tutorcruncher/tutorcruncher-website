import { Content } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import type { JSX } from "react";

import { ReadyToGetStarted as ReadyToGetStartedComponent } from "@/components/features/ready-to-get-started";
import { backgroundColor } from "@/helpers/backgroundColor";
import { isFilled } from "@prismicio/client";

// The heading is wrapped in an <h2> by the component, so render the rich text
// inline (no block-level <h2>/<p>) to avoid invalid nested headings.
const inlineHeadingSerializer: JSXMapSerializer = {
  heading2: ({ children }) => <>{children}</>,
  paragraph: ({ children }) => <>{children}</>,
};

/**
 * Props for `ReadyToGetStarted`.
 */
export type ReadyToGetStartedProps =
  SliceComponentProps<Content.ReadyToGetStartedSlice>;

/**
 * Component for "ReadyToGetStarted" Slices.
 */
const ReadyToGetStarted = ({ slice }: ReadyToGetStartedProps): JSX.Element => {
  const background = backgroundColor(slice.primary.background_colour);
  const heading = isFilled.richText(slice.primary.heading) ? (
    <PrismicRichText
      field={slice.primary.heading}
      components={inlineHeadingSerializer}
    />
  ) : undefined;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <ReadyToGetStartedComponent heading={heading} background={background} />
    </section>
  );
};

export default ReadyToGetStarted;
