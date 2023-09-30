import React from "react";
import { View } from "react-native";

import { textStyle_i8 } from "../../../constants";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { Typography } from "../../common/Typography";
import styles from "./styles";

interface ISeparatorProps {
  children?: React.ReactNode;
}

export const Separator: React.FC<ISeparatorProps> = ({ children }) => {
  const { appColors } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.line, { backgroundColor: appColors.variant }]} />

      {children && (
        <Typography style={[textStyle_i8, styles.text]}>{children}</Typography>
      )}

      <View style={[styles.line, { backgroundColor: appColors.variant }]} />
    </View>
  );
};
