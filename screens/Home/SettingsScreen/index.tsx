import { FC } from "react";
import { useSelector } from "react-redux";

import { IOptions, ToggleOptionPicker } from "../../../components/common";
import { Separator } from "../../../components/sections";
import { AppThemes } from "../../../enums";
import { HomeScreenProps } from "../../../navigation/HomeStack/types";
import { setAppThemeAction } from "../../../store/redux/actions/settings.action";
import { selectSettings } from "../../../store/redux/slices/settingsSlice";
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
  const { appTheme } = useSelector(selectSettings);

  const themeChangeHandler = (value: AppThemes) =>
    dispatch(setAppThemeAction(value));

  return (
    <>
      <Separator />

      <ToggleOptionPicker
        value={appTheme}
        items={THEME_OPTIONS}
        onValueChanged={themeChangeHandler}
      />
    </>
  );
};
