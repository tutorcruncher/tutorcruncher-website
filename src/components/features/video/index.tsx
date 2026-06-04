import { ReactNode } from "react";

import { Body } from "@/components/ui/body";
import { VideoPlayer } from "./player";

export const VideoPlayerContainer = ({
  videoUrl,
  placeholderImage,
  heading,
}: {
  videoUrl;
  placeholderImage;
  heading?: ReactNode;
}) => (
  <Body containerSize="small" heading={heading}>
    <VideoPlayer videoUrl={videoUrl} placeholderImage={placeholderImage} />
  </Body>
);
