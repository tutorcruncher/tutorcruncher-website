"use client";
import { useState } from "react";

import styles from "./player.module.scss";
import { PrismicImage } from "@prismicio/react";

// Matches watch, youtu.be, embed and shorts links, so pasted iframe embed code works too
const getYoutubeId = (videoUrl: string) =>
  videoUrl?.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
  )?.[1];

export const VideoPlayer = ({ videoUrl, placeholderImage }) => {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const youtubeId = getYoutubeId(videoUrl);

  const showVideo = () => {
    setIsVideoVisible(true);
  };

  return (
    <div className={styles.embedContainer}>
      {!isVideoVisible ? (
        <>
          <PrismicImage
            field={placeholderImage}
            className={styles.placeholder}
          />
          <button
            onClick={showVideo}
            className={styles.playButton}
            aria-label="Play video"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
              />
            </svg>
          </button>
        </>
      ) : youtubeId ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <video src={videoUrl} autoPlay controls />
      )}
    </div>
  );
};
