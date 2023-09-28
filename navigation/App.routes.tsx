import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import FlashMessage from "react-native-flash-message";
import { useSelector } from "react-redux";

import { LoaderView } from "../components/sections";
import { AppColors, DarkAppColors, LightAppColors } from "../constants";
import { AppThemes } from "../enums";
import { useFirebaseLogin } from "../hooks";
import { selectSettings } from "../store/redux/slices/settingsSlice";
import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";

type AppRoutesProps = {
  onReady: () => void;
};

const AppRoutes: React.FC<AppRoutesProps> = ({ onReady }) => {
  const { isLoginInProcess, isAuthenticated } = useFirebaseLogin();

  const { appTheme } = useSelector(selectSettings);
  const [theme, setTheme] = useState<Theme>();

  useEffect(() => {
    const isLightTheme = appTheme === AppThemes.Light;

    setTheme({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        card: isLightTheme
          ? LightAppColors.background
          : DarkAppColors.background,
        notification: "red",
        text: AppColors.systemGray,
        background: isLightTheme
          ? LightAppColors.systemWhite
          : DarkAppColors.systemBlack,
      },
    });
  }, [appTheme]);

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
