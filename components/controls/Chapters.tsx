import { Box, Button, FlatList, Text } from "native-base";
import { FC } from "react";
import { ListRenderItem } from "react-native";

import { HORIZONTAL_PADDING, VERTICAL_PADDING } from "../../constants/layout";
import { Chapter } from "../../types";
import { convertMsDurationToDisplayLabel } from "../../utils/durationConverter";

type Props = {
  chapters: Chapter[];
  onItemPress: (item: Chapter) => void;
};

const Chapters: FC<Props> = ({ chapters, onItemPress }) => {
  const renderChapter: ListRenderItem<Chapter> = ({ item }) => {
    return (
      <Button
        colorScheme="cyan"
        rounded="md"
        shadow="7"
        p={2}
        onPress={() => onItemPress(item)}
      >
        <Text color="white">{item.title}</Text>
        <Text color="white">
          {convertMsDurationToDisplayLabel(item.timestamp)}
        </Text>
      </Button>
    );
  };

  return (
    <FlatList
      data={chapters}
      renderItem={renderChapter}
      horizontal
      ItemSeparatorComponent={Separator}
      showsHorizontalScrollIndicator={false}
      py={VERTICAL_PADDING}
      contentContainerStyle={{
        paddingHorizontal: HORIZONTAL_PADDING * 4,
      }}
    />
  );
};

const Separator = () => <Box w="4" />;

export default Chapters;
