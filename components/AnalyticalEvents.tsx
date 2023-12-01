import { VStack, Text } from "native-base";
import { FC, useMemo } from "react";

import { HORIZONTAL_PADDING } from "../constants/layout";
import useAnalyticsService from "../contexts/AnalyticsServiceContext";
import { convertMsDurationToDisplayLabel } from "../utils/durationConverter";

const AnalyticalEvents: FC = () => {
  const { pauseCount, playCount, chapterFrequency, totalTimeWatched } =
    useAnalyticsService();

  const chaptersFrequencyString = useMemo(
    () => buildChaptersFrequencyString(chapterFrequency),
    [chapterFrequency],
  );

  return (
    <VStack px={HORIZONTAL_PADDING}>
      <Label
        title="Total time watched"
        text={convertMsDurationToDisplayLabel(totalTimeWatched)}
      />
      <Label title="Frequency of pause actions" text={`${pauseCount}`} />
      <Label title="Frequency of play actions" text={`${playCount}`} />
      <Label title="Chapters frequency" text={chaptersFrequencyString} />
    </VStack>
  );
};

const Label: FC<{ title: string; text: string }> = ({ title, text }) => (
  <Text fontSize="lg" fontWeight="light">
    <Text fontWeight="bold">{title}:</Text> {text}
  </Text>
);

// HELPERS

function buildChaptersFrequencyString(
  chapterFrequency: Record<string, number>,
) {
  return Object.entries(chapterFrequency)
    .sort((a, b) => b[1] - a[1])
    .reduce((acc, [name, frequency]) => acc + `${name}: ${frequency}\n`, "\n");
}

export default AnalyticalEvents;
