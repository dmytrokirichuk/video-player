import { NativeBaseProvider } from "native-base";
import { FC, PropsWithChildren } from "react";

import { AnalyticsServiceProvider } from "../contexts/AnalyticsServiceContext";

const ApplicationProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NativeBaseProvider>
      <AnalyticsServiceProvider>{children}</AnalyticsServiceProvider>
    </NativeBaseProvider>
  );
};

export default ApplicationProviders;
