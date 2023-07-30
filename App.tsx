import { useFonts } from "expo-font";
import React from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";

import { FontWeightAliases } from "./constants";
import { useSplashScreen } from "./hooks/";
import AppRoutes from "./navigation/App.routes";
import store from "./store/redux/store";

export default function App() {
  const [isFontsLoaded] = useFonts({
    [FontWeightAliases.Bold]: require("./assets/fonts/Montserrat-Bold.ttf"),
    [FontWeightAliases.SemiBold]: require("./assets/fonts/Montserrat-SemiBold.ttf"),
    [FontWeightAliases.Medium]: require("./assets/fonts/Montserrat-Medium.ttf"),
    [FontWeightAliases.Regular]: require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  const { SplashScreenContainer, onContentReady } =
    useSplashScreen(isFontsLoaded);

  return (
    <SplashScreenContainer>
      <Provider store={store}>
        <AppRoutes onReady={onContentReady} />
      </Provider>
    </SplashScreenContainer>
  );
}
