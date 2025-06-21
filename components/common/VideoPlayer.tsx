import React from "react";
import { MediaPlayer, MediaOutlet, MediaPoster } from "@vidstack/react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  playsinline?: boolean;
  preload?: "none" | "metadata" | "auto";
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  className = "",
  autoplay = false,
  loop = false,
  muted = false,
  controls = true,
  playsinline = false,
  preload = "metadata",
}) => {
  return (
    <MediaPlayer
      src={src}
      viewType="video"
      streamType="on-demand"
      autoplay={autoplay}
      loop={loop}
      muted={muted}
      playsinline={playsinline}
      preload={preload}
      controls={controls}
      className={className}
    >
      <MediaOutlet>
        {poster && <MediaPoster className="vds-poster object-cover" />}
      </MediaOutlet>
    </MediaPlayer>
  );
};

export default VideoPlayer;
