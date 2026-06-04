import { ReactNode } from "react";

import { Body } from "@/components/ui/body";
import { BackgroundColour } from "@/types/backgroundColor";
import { VideoPlayer } from "./player";

export const VideoPlayerContainer = ({
  videoUrl,
  placeholderImage,
  heading,
  background,
}: {
  videoUrl;
  placeholderImage;
  heading?: ReactNode;
  background?: BackgroundColour;
}) => (
  <Body containerSize="small" heading={heading} background={background}>
    <VideoPlayer videoUrl={videoUrl} placeholderImage={placeholderImage} />
  </Body>
);
