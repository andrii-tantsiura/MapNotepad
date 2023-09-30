import { FC } from "react";

import { IOptions, ToggleOptionPicker } from "../../../components/common";
import { Separator } from "../../../components/sections";
import { AppThemes } from "../../../enums";
import { useAppTheme } from "../../../hooks";
import { HomeScreenProps } from "../../../navigation/HomeStack/types";
import { setAppThemeAction } from "../../../store/redux/actions/settings.action";
import { useAppDispatch } from "../../../store/redux/store";

const THEME_OPTIONS: IOptions<AppThemes> = [
  {
    title: "Light Theme",
    value: AppThemes.Light,
  },
  {
    title: "Dark Theme",
    value: AppThemes.Dark,
  },
];

export const SettingsScreen: FC<HomeScreenProps> = () => {
  const dispatch = useAppDispatch();
  const { currentTheme } = useAppTheme();

  const themeChangeHandler = (value: AppThemes) =>
    dispatch(setAppThemeAction(value));

  return (
    <>
      <Separator />

      <ToggleOptionPicker
        value={currentTheme}
        items={THEME_OPTIONS}
        onValueChanged={themeChangeHandler}
      />
    </>
  );
};
