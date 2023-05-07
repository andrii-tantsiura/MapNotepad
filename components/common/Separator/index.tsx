import React from "react";
import { View } from "react-native";
import { Typography } from "../Typography";
import styles from "./styles";

interface ISeparatorProps {
  children: React.ReactNode;
}

export const Separator: React.FC<ISeparatorProps> = ({ children }) => (
  <View style={styles.separator}>
    <View style={styles.line}></View>
    <Typography size="i12" weight="medium" color="systemLightGray">
      {children}
    </Typography>
    <View style={styles.line}></View>
  </View>
);
