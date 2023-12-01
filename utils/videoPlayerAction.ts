import { Video } from "expo-av";

type VideoAction = (...args: unknown[]) => void;

export function createVideoPlayerAction(
  videoPlayer: Video | null,
  action: (player: Video, ...args: any[]) => void,
): VideoAction {
  return (...actionArgs: any[]) => {
    if (videoPlayer !== null) {
      action(videoPlayer, ...actionArgs);
    } else {
      console.error(
        `Tried to access video action for empty player. Video ref: ${videoPlayer}`,
      );
    }
  };
}
