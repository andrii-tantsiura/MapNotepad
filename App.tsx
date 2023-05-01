import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";

import {
  BOLD_FONT_FAMILY,
  MEDIUM_FONT_FAMILY,
  REGULAR_FONT_FAMILY,
  SEMI_BOLD_FONT_FAMILY,
} from "./constants/fontWeights";
import colors from "./constants/colors";
import { AuthStack } from "./navigation/AuthStack";

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

  // TODO: add loader or splash screen
  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer theme={THEME}>
        <AuthStack />
      </NavigationContainer>
    </>
  );
}
