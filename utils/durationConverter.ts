export function convertMsDurationToDisplayLabel(duration: number): string {
  const totalSeconds = Math.floor(duration / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  const seconds = totalSeconds - (hours * 3600 + minutes * 60);

  if (hours > 0) {
    return `${addZeroPadding(hours)}:${addZeroPadding(minutes)}`;
  }

  return `${addZeroPadding(minutes)}:${addZeroPadding(seconds)}`;
}

const addZeroPadding = (num: number): string =>
  num < 10 ? `0${num}` : num.toString();
