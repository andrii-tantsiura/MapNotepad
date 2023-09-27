import { FC, useState } from "react";
import { View } from "react-native";

import { CustomSwitch, Typography } from "../../../components/common";
import { Separator } from "../../../components/sections";
import { HomeScreenProps } from "../../../navigation/HomeStack/types";
import styles from "./styles";

export const SettingsScreen: FC<HomeScreenProps> = () => {
  const [isDarkThemeSelected, setIsDarkThemeSelected] =
    useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Separator />

      <View style={styles.optionContainer}>
        <Typography style={styles.optionTitle}>Dark theme</Typography>

        <CustomSwitch
          isActive={isDarkThemeSelected}
          onValueChanged={setIsDarkThemeSelected}
        />
      </View>

      <Separator />
    </View>
  );
};
