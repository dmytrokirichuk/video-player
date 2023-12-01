export enum Events {
  VideoPlayed = "Video Played",
  VideoPaused = "Video Paused",
  VideoScrubbed = "Video Scrubbed",
  ChapterSelected = "ChapterSelected",
}

type BaseEventDetails<T> = {
  video_id: string;
} & T;

export type EventDetails = {
  [Events.VideoPlayed]: BaseEventDetails<{
    played_at: number;
    chapter: string;
  }>;
  [Events.VideoPaused]: BaseEventDetails<{
    paused_at: number;
    duration_watched: number;
  }>;
  [Events.VideoScrubbed]: BaseEventDetails<{
    scrubbed_to: number;
    from: number;
  }>;
  [Events.ChapterSelected]: BaseEventDetails<{
    chapter: string;
    selected_at: number;
  }>;
};
