import { FC } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

import { CustomSwitch, Typography } from "../../../components/common";
import { Separator } from "../../../components/sections";
import { AppThemes } from "../../../enums";
import { HomeScreenProps } from "../../../navigation/HomeStack/types";
import { setAppThemeAction } from "../../../store/redux/actions/settings.action";
import { selectSettings } from "../../../store/redux/slices/settingsSlice";
import { useAppDispatch } from "../../../store/redux/store";
import styles from "./styles";

export const SettingsScreen: FC<HomeScreenProps> = () => {
  const dispatch = useAppDispatch();
  const { appTheme } = useSelector(selectSettings);

  const changeThemeHandler = () => {
    const theme =
      appTheme === AppThemes.Dark ? AppThemes.Light : AppThemes.Dark;

    dispatch(setAppThemeAction(theme));
  };

  return (
    <View style={styles.container}>
      <Separator />

      <View style={styles.optionContainer}>
        <Typography style={styles.optionTitle}>Dark theme</Typography>

        <CustomSwitch
          isActive={appTheme === AppThemes.Dark}
          onValueChanged={changeThemeHandler}
        />
      </View>

      <Separator />
    </View>
  );
};
