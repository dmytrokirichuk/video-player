import { Video } from "expo-av";
import { HStack, VStack } from "native-base";
import { FC } from "react";

import { HORIZONTAL_PADDING } from "../../constants/layout";
import useAnalyticsService from "../../contexts/AnalyticsServiceContext";
import { Chapter } from "../../types";
import { Events } from "../../types/analytics";
import { createVideoPlayerAction } from "../../utils/videoPlayerAction";

import Chapters from "./Chapters";
import PlaybackButton from "./PlaybackButton";
import Timeline from "./Timeline";

type Props = {
  videoId: string;
  isPaused: boolean;
  position: number;
  duration: number;
  chapters: Chapter[];
  videoPlayer: Video | null;
};

const VideoControls: FC<Props> = ({
  videoId,
  isPaused,
  videoPlayer,
  chapters,
  duration,
  position,
}) => {
  const { trackEvent } = useAnalyticsService();

  const handlePlaybackPress = createVideoPlayerAction(videoPlayer, (video) => {
    if (isPaused) {
      // find the matching chapter for the current progress
      const chapter =
        chapters.findLast((chapter) => chapter.timestamp <= position)?.title ??
        chapters[0].title ??
        "Invalid";

      trackEvent(Events.VideoPlayed, {
        video_id: videoId,
        played_at: Date.now(),
        chapter,
      });

      video.playAsync();
    } else {
      trackEvent(Events.VideoPaused, {
        video_id: videoId,
        paused_at: Date.now(),
        duration_watched: position,
      });
      video.pauseAsync();
    }
  });
  const handleTimelineSlidingUpdate = createVideoPlayerAction(
    videoPlayer,
    (video, isActive: boolean) => {
      if (isActive) {
        video.pauseAsync();
      }
    },
  );
  const handleTimelineChange = createVideoPlayerAction(
    videoPlayer,
    (video, newPosition: number) => {
      video.playFromPositionAsync(newPosition);
      trackEvent(Events.VideoScrubbed, {
        video_id: videoId,
        from: position,
        scrubbed_to: newPosition,
      });
    },
  );
  const handleChapterPress = createVideoPlayerAction(
    videoPlayer,
    async (video, chapter: Chapter) => {
      // pause the video to ensure total progress is calculated correctly
      // we don't want to take into account the 'seeked' distance as 'watched'
      await video.pauseAsync();
      video.playFromPositionAsync(chapter.timestamp);
      trackEvent(Events.ChapterSelected, {
        video_id: videoId,
        chapter: chapter.title,
        selected_at: Date.now(),
      });
    },
  );

  return (
    <VStack>
      <HStack alignItems="center" space="xs" px={HORIZONTAL_PADDING}>
        <PlaybackButton isPaused={isPaused} onPress={handlePlaybackPress} />
        <Timeline
          position={position}
          duration={duration}
          onChange={handleTimelineChange}
          onSlidingUpdate={handleTimelineSlidingUpdate}
        />
      </HStack>
      <Chapters chapters={chapters} onItemPress={handleChapterPress} />
    </VStack>
  );
};

export default VideoControls;
