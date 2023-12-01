import { EventDetails, Events } from "../types/analytics";

// Mock event tracking service
// The logic may be expanded by integrating with actual event tracking service
export const useTrackEvent = () => {
  return <E extends Events>(event: E, eventDetails: EventDetails[E]) => {
    console.log(
      `Tracked event "${event}". Details: ${JSON.stringify(eventDetails)}`,
    );
  };
};
