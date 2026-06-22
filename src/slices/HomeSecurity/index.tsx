import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import type { JSX } from "react";

import { HomeSecurity as HomeSecurityComponent } from "@/components/features/home-security";
import { backgroundColor } from "@/helpers/backgroundColor";

/**
 * Props for `HomeSecurity`.
 */
export type HomeSecurityProps = SliceComponentProps<Content.HomeSecuritySlice>;

/**
 * Component for "HomeSecurity" Slices.
 */
const HomeSecurity = ({ slice }: HomeSecurityProps): JSX.Element => {
  const background = backgroundColor(slice.primary.background_colour);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <HomeSecurityComponent background={background} />
    </section>
  );
};

export default HomeSecurity;
