import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";

import { Heading } from "@/components/ui/heading";
import { VideoPlayerContainer } from "@/components/features/video";
/**
 * Props for `Youtube`.
 */
export type YoutubeProps = SliceComponentProps<Content.YoutubeSlice>;

/**
 * Component for "Youtube" Slices.
 */
const Youtube = ({ slice }: YoutubeProps): JSX.Element => {
  const heading = isFilled.richText(slice.primary.heading) ? (
    <Heading variant="div" center size="small">
      <PrismicRichText field={slice.primary.heading} />
    </Heading>
  ) : undefined;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <VideoPlayerContainer
        videoUrl={slice.primary.video_url}
        placeholderImage={slice.primary.placeholder_image}
        heading={heading}
      />
    </section>
  );
};

export default Youtube;
