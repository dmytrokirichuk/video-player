import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

import { useTrackEvent } from "../hooks/trackEvent";
import { EventDetails, Events } from "../types/analytics";

type AnalyticsServiceContext = {
  pauseCount: number;
  playCount: number;
  chapterFrequency: Record<string, number>;
  totalTimeWatched: number;
  trackEvent: <E extends Events>(
    event: E,
    eventDetails: EventDetails[E],
  ) => void;
  updateTotalTimeWatched: (timeWatched: number) => void;
};

const AnalyticsServiceContext = createContext({} as AnalyticsServiceContext);

export const AnalyticsServiceProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [pauseCount, setPauseCount] = useState(0);
  const [playCount, setPlayCount] = useState(0);
  const [chapterFrequency, setChapterFrequency] = useState<
    Record<string, number>
  >({});
  const [totalTimeWatched, setTotalTimeWatched] = useState(0);

  const trackEvent = useTrackEvent();

  const updateTotalTimeWatched = useCallback((timeWatched: number) => {
    setTotalTimeWatched((prev) => prev + timeWatched);
  }, []);

  const handleTrackEvent = useCallback(
    <E extends Events>(event: E, eventDetails: EventDetails[E]) => {
      trackEvent(event, eventDetails);

      switch (event) {
        case Events.VideoPlayed:
          setPlayCount((prev) => prev + 1);
          break;
        case Events.VideoPaused:
          setPauseCount((prev) => prev + 1);
          break;
        case Events.ChapterSelected:
          setChapterFrequency((prev) => {
            const newState = { ...prev };

            const { chapter } =
              eventDetails as EventDetails[Events.ChapterSelected];

            if (!newState[chapter]) {
              newState[chapter] = 0;
            }
            newState[chapter]++;

            return newState;
          });
          break;
      }
    },
    [trackEvent],
  );

  return (
    <AnalyticsServiceContext.Provider
      value={{
        pauseCount,
        playCount,
        chapterFrequency,
        totalTimeWatched,
        trackEvent: handleTrackEvent,
        updateTotalTimeWatched,
      }}
    >
      {children}
    </AnalyticsServiceContext.Provider>
  );
};

export default function useAnalyticsService(): AnalyticsServiceContext {
  return useContext(AnalyticsServiceContext);
}
