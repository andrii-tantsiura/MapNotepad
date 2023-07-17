import { useFonts } from "expo-font";
import React from "react";
import FlashMessage from "react-native-flash-message";
import "react-native-gesture-handler";
import { Provider } from "react-redux";

import { LoaderView } from "./components/sections";
import { FontWeightAliases } from "./constants";
import AppRoutes from "./navigation/App.routes";
import { AuthProvider } from "./store/AuthProvider";
import store from "./store/redux/store";

export default function App() {
  const [isFontsLoaded] = useFonts({
    [FontWeightAliases.Bold]: require("./assets/fonts/Montserrat-Bold.ttf"),
    [FontWeightAliases.SemiBold]: require("./assets/fonts/Montserrat-SemiBold.ttf"),
    [FontWeightAliases.Medium]: require("./assets/fonts/Montserrat-Medium.ttf"),
    [FontWeightAliases.Regular]: require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  return !isFontsLoaded ? (
    <LoaderView />
  ) : (
    <>
      <AuthProvider>
        <Provider store={store}>
          <AppRoutes />
          <FlashMessage position={"bottom"} />
        </Provider>
      </AuthProvider>
    </>
  );
}
