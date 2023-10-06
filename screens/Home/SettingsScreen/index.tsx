import { FC } from "react";

import { IOptions, ToggleOptionPicker } from "../../../components/common";
import { Separator } from "../../../components/sections";
import { AppThemes } from "../../../enums";
import { useAppTheme, useSettings } from "../../../hooks";
import { HomeScreenProps } from "../../../navigation/HomeStack/types";

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
  const { currentTheme } = useAppTheme();
  const { updateAppTheme } = useSettings();

  return (
    <>
      <Separator />

      <ToggleOptionPicker
        value={currentTheme}
        items={THEME_OPTIONS}
        onValueChanged={updateAppTheme}
      />
    </>
  );
};
