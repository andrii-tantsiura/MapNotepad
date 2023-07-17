import React from "react";
import { View } from "react-native";

import { textStyle_i8 } from "../../../constants";
import { Typography } from "../../common";
import styles from "./styles";

interface ISeparatorProps {
  children?: React.ReactNode;
}

export const Separator: React.FC<ISeparatorProps> = ({ children }) => (
  <View style={styles.container}>
    <View style={styles.line} />

    {children && (
      <Typography style={[textStyle_i8, styles.text]}>{children}</Typography>
    )}

    <View style={styles.line} />
  </View>
);
