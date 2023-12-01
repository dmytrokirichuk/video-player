import { Button } from "native-base";
import { FC } from "react";

import { AntDesign } from "@expo/vector-icons";

type Props = {
  isPaused: boolean;
  onPress: () => void;
};

const PlaybackButton: FC<Props> = ({ isPaused, onPress }) => (
  <Button
    onPress={onPress}
    leftIcon={
      <AntDesign
        name={isPaused ? "playcircleo" : "pausecircleo"}
        size={24}
        color="white"
      />
    }
  />
);

export default PlaybackButton;
