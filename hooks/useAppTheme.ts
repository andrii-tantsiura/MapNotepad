import { StatusBarStyle } from "expo-status-bar";
import { MapStyleElement } from "react-native-maps";
import { useSelector } from "react-redux";

import { IAppColors } from "../constants/themes/types";
import { AppThemes } from "../enums";
import { selectSettings } from "../store/redux/slices";

type UseAppThemeReturn = {
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

  return {
    currentTheme,
    appColors: colors,
    statusBarStyle,
    mapStyles,
  };
};
