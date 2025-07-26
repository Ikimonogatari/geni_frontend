"use client";

import { useEffect, useRef, useState } from "react";

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Early return if no src provided
  if (!src) {
    console.warn("HLSPlayer: No source provided");
    return (
      <div className="flex items-center justify-center h-full bg-gray-200 rounded-2xl">
        <span className="text-gray-500">No video source</span>
      </div>
    );
  }

  // Helper function to ensure URL has https:// protocol
  const ensureHttpsProtocol = (url) => {
    if (!url) return url;

    // If URL already has a protocol, return as is
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    // If URL is missing protocol, add https://
    return `https://${url}`;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const videoSrc = ensureHttpsProtocol(src);
    console.log("HLSPlayer: Initializing with src:", videoSrc);

    setIsLoading(true);
    setHasError(false);

    // Check if HLS is supported natively
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      console.log("Native HLS support detected");
      video.src = videoSrc;
    } else {
      // Use Hls.js for browsers that don't support HLS natively
      import("hls.js")
        .then(({ default: Hls }) => {
          if (Hls.isSupported()) {
            console.log("Using Hls.js");
            const hls = new Hls({
              debug: false,
              enableWorker: true,
              lowLatencyMode: true,
            });

            hls.loadSource(videoSrc);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              console.log("HLS manifest parsed");
              setIsLoading(false);
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
              console.error("HLS Error:", data);
              setHasError(true);
              setErrorMessage(`HLS Error: ${data.details}`);
              setIsLoading(false);
            });

            // Cleanup function
            return () => {
              hls.destroy();
            };
          } else {
            console.error("HLS is not supported");
            setHasError(true);
            setErrorMessage("HLS not supported in this browser");
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error("Failed to load Hls.js:", error);
          setHasError(true);
          setErrorMessage("Failed to load video player");
          setIsLoading(false);
        });
    }

    // Add event listeners
    const handleLoadStart = () => {
      console.log("Video load started");
      setIsLoading(true);
    };

    const handleLoadedMetadata = () => {
      console.log("Video metadata loaded");
      setIsLoading(false);
    };

    const handleCanPlay = () => {
      console.log("Video can play");
      setIsLoading(false);
    };

    const handleError = (e) => {
      console.error("Video error:", e);
      setHasError(true);
      setErrorMessage("Video playback error");
      setIsLoading(false);
    };

    video.addEventListener("loadstart", handleLoadStart);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    // Cleanup
    return () => {
      video.removeEventListener("loadstart", handleLoadStart);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, [src]);

  return (
    <div className="w-full h-full relative bg-black rounded-2xl overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-10">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <span>Loading video...</span>
          </div>
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900 bg-opacity-75 z-10">
          <div className="text-white text-center">
            <span className="text-red-200">Error: {errorMessage}</span>
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        controls
        autoPlay
        muted
        className="w-full h-full object-contain"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default VideoPlayer;
