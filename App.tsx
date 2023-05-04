import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import NetInfo from "@react-native-community/netinfo";

import {
  BOLD_FONT_FAMILY,
  MEDIUM_FONT_FAMILY,
  REGULAR_FONT_FAMILY,
  SEMI_BOLD_FONT_FAMILY,
} from "./constants/fontWeights";
import colors from "./constants/colors";
import { AuthStack } from "./navigation/AuthStack";
import { NetworkInfoContext } from "./store/NetworkInfoContext";
import FlashMessage from "react-native-flash-message";

const THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.systemWhite,
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    [BOLD_FONT_FAMILY]: require("./assets/fonts/Montserrat-Bold.ttf"),
    [SEMI_BOLD_FONT_FAMILY]: require("./assets/fonts/Montserrat-SemiBold.ttf"),
    [MEDIUM_FONT_FAMILY]: require("./assets/fonts/Montserrat-Medium.ttf"),
    [REGULAR_FONT_FAMILY]: require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return !fontsLoaded ? null : (
    <>
      <StatusBar style="auto" />
      <NetworkInfoContext.Provider value={isConnected}>
        <NavigationContainer theme={THEME}>
          <AuthStack />
        </NavigationContainer>
      </NetworkInfoContext.Provider>
      <FlashMessage position={"bottom"} />
    </>
  );
}
