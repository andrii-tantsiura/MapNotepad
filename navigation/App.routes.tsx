import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import FlashMessage from "react-native-flash-message";

import { useEffect, useState } from "react";
import { LoaderView } from "../components/sections";
import { useAppTheme, useFirebaseLogin } from "../hooks";
import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";

type AppRoutesProps = {
  onReady: () => void;
};

const AppRoutes: React.FC<AppRoutesProps> = ({ onReady }) => {
  const { isLoginInProcess, isAuthenticated } = useFirebaseLogin();

  const { appColors, appTheme } = useAppTheme();

  const [theme, setTheme] = useState<Theme>();

  useEffect(() => {
    setTheme({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        card: appColors.background,
        text: appColors.systemGray,
        background: appColors.background,
      },
    });
  }, [appColors, appTheme]);

  return isLoginInProcess ? (
    <LoaderView />
  ) : (
    <>
      <StatusBar style="auto" />
      <FlashMessage />
      <NavigationContainer theme={theme} onReady={onReady}>
        {isAuthenticated ? <HomeStack /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
};

export default AppRoutes;
