export type VideoPayload = {
  id: string;
  url: string;
  duration: number;
  chapters: Chapter[];
};

export type Chapter = {
  title: string;
  timestamp: number;
};
