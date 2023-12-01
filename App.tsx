import { StatusBar } from "expo-status-bar";
import { Box } from "native-base";
import { useEffect } from "react";
import { LogBox, SafeAreaView } from "react-native";

import AnalyticalEvents from "./components/AnalyticalEvents";
import ApplicationProviders from "./components/ApplicationProviders";
import Header from "./components/ui/Header";
import VideoPlayer from "./components/VideoPlayer";
import { HORIZONTAL_PADDING } from "./constants/layout";
import { VideoPayload } from "./types";

const MOCK_VIDEO: VideoPayload = {
  id: "1",
  url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  duration: 596000,
  chapters: [
    {
      title: "Chapter 1",
      timestamp: 100000,
    },
    {
      title: "Chapter 2",
      timestamp: 200000,
    },
    {
      title: "Chapter 3",
      timestamp: 300000,
    },
    {
      title: "Chapter 4",
      timestamp: 400000,
    },
    {
      title: "Chapter 5",
      timestamp: 500000,
    },
  ],
};

export default function App() {
  // disable native-base warning
  // https://github.com/GeekyAnts/NativeBase/issues/5758
  useEffect(() => {
    LogBox.ignoreLogs([
      "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
    ]);
  }, []);

  return (
    <ApplicationProviders>
      <Box flex={1} w="full" bgColor="amber.50">
        <StatusBar style="auto" />
        <SafeAreaView>
          <Header px={HORIZONTAL_PADDING}>Video Player:</Header>
          <VideoPlayer video={MOCK_VIDEO} />
          <Header px={HORIZONTAL_PADDING}>Analytical Events:</Header>
          <AnalyticalEvents />
        </SafeAreaView>
      </Box>
    </ApplicationProviders>
  );
}
