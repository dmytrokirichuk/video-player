import { Box, HStack, Text } from "native-base";
import { FC, useRef, useState } from "react";

import Slider from "@react-native-community/slider";

import { convertMsDurationToDisplayLabel } from "../../utils/durationConverter";

type Props = {
  position: number;
  duration: number;
  onChange: (position: number) => void;
  onSlidingUpdate: (isActive: boolean) => void;
};

const Timeline: FC<Props> = ({
  position,
  duration,
  onChange,
  onSlidingUpdate,
}) => {
  const [rewindProgress, setRewindProgress] = useState<number | null>(null);

  const isSliding = useRef(false);

  const currentPositionLabel = convertMsDurationToDisplayLabel(
    rewindProgress ?? position,
  );

  const handleSlidingStart = (value: number) => {
    isSliding.current = true;

    setRewindProgress(value);
    onSlidingUpdate(true);
  };

  const handleValueChange = (value: number) => {
    if (!isSliding.current) return;

    setRewindProgress(value);
  };

  const handleSlidingComplete = (value: number) => {
    isSliding.current = false;

    onChange(value);
    setRewindProgress(null);

    onSlidingUpdate(false);
  };

  return (
    <HStack flex={1} w="full" alignItems="center" space="xs">
      <Text>{currentPositionLabel}</Text>

      <Box flex={1}>
        <Slider
          value={position}
          maximumValue={duration}
          onValueChange={handleValueChange}
          onSlidingStart={handleSlidingStart}
          onSlidingComplete={handleSlidingComplete}
          step={1}
        />
      </Box>
      <Text>{convertMsDurationToDisplayLabel(duration)}</Text>
    </HStack>
  );
};

export default Timeline;
