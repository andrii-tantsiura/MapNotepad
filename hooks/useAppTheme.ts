import { useSelector } from "react-redux";

import { selectSettings } from "../store/redux/slices/settingsSlice";
import { AppThemes } from "../enums";
import { IAppColors } from "../constants/themes/types";

type UseAppThemeReturn = {
  currentTheme: AppThemes;
  appColors: IAppColors;
};

export const useAppTheme = (): UseAppThemeReturn => {
  const { currentTheme, themeSource } = useSelector(selectSettings);

  return { currentTheme, appColors: themeSource.colors };
};
