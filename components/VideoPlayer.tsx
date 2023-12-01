import { ResizeMode, Video, VideoReadyForDisplayEvent } from "expo-av";
import { VStack } from "native-base";
import { FC, useRef, useState } from "react";
import { Dimensions, Platform } from "react-native";

import { AVPlaybackStatus } from "expo-av/build/AV";

import useAnalyticsService from "../contexts/AnalyticsServiceContext";
import { VideoPayload } from "../types";

import VideoControls from "./controls";

type WebVideoReadyForDisplayEvent = VideoReadyForDisplayEvent & {
  srcElement: HTMLElement;
};

const { width: WINDOW_WIDTH } = Dimensions.get("window");

type Props = {
  video: VideoPayload;
};

const VideoPlayer: FC<Props> = ({ video: { id, url, duration, chapters } }) => {
  const { updateTotalTimeWatched } = useAnalyticsService();

  const videoPlayer = useRef<Video>(null);

  const [isPaused, setIsPaused] = useState(false);
  const [videoPosition, setVideoPosition] = useState(0);

  const playbackStartDuration = useRef<number | null>(null);

  const handleReadyForDisplay = (event: VideoReadyForDisplayEvent) => {
    if (Platform.OS === "web") {
      // workaround to make resizeMode work on Web
      const webEvent = event as WebVideoReadyForDisplayEvent;

      webEvent.srcElement.style.position = "initial";
    }
  };

  const handleVideoLoaded = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setIsPaused(!status.isPlaying);
    }
  };

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;

    if (status.isPlaying && playbackStartDuration.current === null) {
      playbackStartDuration.current = status.positionMillis;
    } else if (!status.isPlaying && playbackStartDuration.current !== null) {
      updateTotalTimeWatched(
        status.positionMillis - playbackStartDuration.current,
      );
      playbackStartDuration.current = null;
    }

    setIsPaused(!status.isPlaying);
    setVideoPosition(status.positionMillis);
  };

  return (
    <VStack position="relative" space={2}>
      <Video
        ref={videoPlayer}
        style={{
          width: WINDOW_WIDTH,
          aspectRatio: 16 / 9,
          backgroundColor: "black",
        }}
        source={{
          uri: url,
        }}
        resizeMode={ResizeMode.CONTAIN}
        onLoad={handleVideoLoaded}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        onReadyForDisplay={handleReadyForDisplay}
      />

      <VideoControls
        videoId={id}
        videoPlayer={videoPlayer.current}
        chapters={chapters}
        position={videoPosition}
        duration={duration}
        isPaused={isPaused}
      />
    </VStack>
  );
};

export default VideoPlayer;
