import { StatusBarStyle } from "expo-status-bar";
import { useSelector } from "react-redux";

import { IAppColors } from "../constants/themes/types";
import { AppThemes } from "../enums";
import { selectSettings } from "../store/redux/slices/settingsSlice";

type UseAppThemeReturn = {
  currentTheme: AppThemes;
  appColors: IAppColors;
  statusBarStyle: StatusBarStyle;
};

export const useAppTheme = (): UseAppThemeReturn => {
  const {
    currentTheme,
    themeSource: { colors, statusBrStyle },
  } = useSelector(selectSettings);

  return {
    currentTheme,
    appColors: colors,
    statusBarStyle: statusBrStyle,
  };
};
