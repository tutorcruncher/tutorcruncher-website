import { Content, isFilled } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import type { JSX } from "react";

import { Logos as LogoComponent } from "@/components/features/logos";
import { backgroundColor } from "@/helpers/backgroundColor";

const DEFAULT_HEADING =
  "Designed for companies of all sizes, from entrepreneurs to enterprise, agencies, centers & online tutoring";

// The heading is wrapped in an <h2> by the Logos component, so render the rich
// text inline (no block-level <h2>/<p>) to avoid invalid nested headings.
const inlineHeadingSerializer: JSXMapSerializer = {
  heading2: ({ children }) => <>{children}</>,
  paragraph: ({ children }) => <>{children}</>,
};

/**
 * Props for `Logos`.
 */
export type LogosProps = SliceComponentProps<Content.LogosSlice>;

/**
 * Component for "Logos" Slices.
 */
const Logos = ({ slice }: LogosProps): JSX.Element => {
  const { heading, logo } = slice.primary;
  const backgroundColour = backgroundColor(slice.primary.background_colour);

  const formattedHeading = isFilled.richText(heading) ? (
    <PrismicRichText field={heading} components={inlineHeadingSerializer} />
  ) : (
    DEFAULT_HEADING
  );
  const formattedImages = logo.map(({ image }) => image);
  return (
    <LogoComponent
      heading={formattedHeading}
      logos={formattedImages}
      backgroundColour={backgroundColour}
    />
  );
};

export default Logos;
