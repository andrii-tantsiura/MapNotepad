import { StatusBarStyle } from "expo-status-bar";
import { useCallback } from "react";
import { MapStyleElement } from "react-native-maps";
import { useSelector } from "react-redux";

import { IAppColors } from "../constants/themes/types";
import { AppThemes } from "../enums";
import { selectSettings } from "../store/redux/slices/settingsSlice";

type ColoredProp = "background" | "border" | "tint";

type ColorStyle = {
  backgroundColor?: string;
  borderColor?: string;
  tintColor?: string;
};

type UseAppThemeReturn = {
  currentTheme: AppThemes;
  appColors: IAppColors;
  statusBarStyle: StatusBarStyle;
  mapStyles: MapStyleElement[];
  getColorStyle: (prop: ColoredProp, key: keyof IAppColors) => ColorStyle;
};

export const useAppTheme = (): UseAppThemeReturn => {
  const {
    currentTheme,
    themeResource: { colors, statusBarStyle, mapStyles },
  } = useSelector(selectSettings);

  const getColorStyle = useCallback(
    (prop: ColoredProp, key: keyof IAppColors): ColorStyle => ({
      [`${prop}Color`]: colors[key],
    }),
    [colors]
  );

  return {
    currentTheme,
    appColors: colors,
    statusBarStyle,
    mapStyles,
    getColorStyle,
  };
};
