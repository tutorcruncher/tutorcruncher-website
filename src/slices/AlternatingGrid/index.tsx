import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import type { JSX } from "react";

import { AlternatingGrid as AlternatingGridComponent } from "@/components/features/alternating-grid";
import { Heading } from "@/components/ui/heading";

import { TextImageGridSlice } from "../../../prismicio-types";

/**
 * Props for `TextImageGrid`.
 */
export type TextImageGridProps = SliceComponentProps<TextImageGridSlice>;

/**
 * Component for "TextImageGrid" Slices.
 */
const AlternatingGrid = ({ slice }: TextImageGridProps): JSX.Element => {
  const formattedItems = slice.primary.content.map((item) => {
    return {
      ...item,
      content: <PrismicRichText field={item.content} />,
      image: item.image,
      imagePosition: item.image_postion,
      button:
        item.button_text && item.button_link
          ? {
              text: item.button_text,
              url: item.button_link.url,
            }
          : undefined,
    };
  });

  return (
    <AlternatingGridComponent
      heading={
        slice.primary.heading.length !== 0 ? (
          <Heading variant="div" size="xlarge" center>
            <PrismicRichText field={slice.primary.heading} />
          </Heading>
        ) : undefined
      }
      backgroundColour={
        slice.primary.background_colour.toLowerCase() as "cream" | "blue"
      }
      items={formattedItems}
      variation={slice.variation}
      showCta={slice.primary.show_cta}
    />
  );
};

export default AlternatingGrid;
