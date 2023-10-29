import { DefaultTheme, Theme } from "@react-navigation/native";
import { StatusBarStyle } from "expo-status-bar";
import { useEffect, useState } from "react";
import { MapStyleElement } from "react-native-maps";
import { useSelector } from "react-redux";

import { IAppColors } from "../constants/themes/types";
import { AppThemes } from "../enums";
import { selectSettings } from "../store/redux/slices";

type UseAppThemeReturn = {
  theme: Theme | undefined;
  currentTheme: AppThemes;
  appColors: IAppColors;
  statusBarStyle: StatusBarStyle;
  mapStyles: MapStyleElement[];
};

export const useAppTheme = (): UseAppThemeReturn => {
  const {
    currentTheme,
    themeResource: { colors, statusBarStyle, mapStyles },
  } = useSelector(selectSettings);

  const [theme, setTheme] = useState<Theme>();

  useEffect(() => {
    setTheme({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        card: colors.background,
        text: colors.systemGray,
        background: colors.background,
      },
    });
  }, [colors]);

  return {
    theme,
    currentTheme,
    appColors: colors,
    statusBarStyle,
    mapStyles,
  };
};
