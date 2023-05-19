import NetInfo from "@react-native-community/netinfo";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import FlashMessage from "react-native-flash-message";
import "react-native-gesture-handler";
import { Provider } from "react-redux";

import { LoaderView } from "./components/sections";
import {
  BOLD_FONT_FAMILY,
  MEDIUM_FONT_FAMILY,
  REGULAR_FONT_FAMILY,
  SEMI_BOLD_FONT_FAMILY,
} from "./constants/fontWeights";
import AppRoutes from "./navigation/App.routes";
import { AuthContextProvider } from "./store/AuthContextProvider";
import { NetworkInfoContext } from "./store/NetworkInfoContext";
import store from "./store/redux/store";

export default function App() {
  const [isFontsLoaded] = useFonts({
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

  return !isFontsLoaded ? (
    <LoaderView />
  ) : (
    <>
      <AuthContextProvider>
        <Provider store={store}>
          <NetworkInfoContext.Provider value={isConnected}>
            <AppRoutes />
            <FlashMessage position={"bottom"} />
          </NetworkInfoContext.Provider>
        </Provider>
      </AuthContextProvider>
    </>
  );
}
