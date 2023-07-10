import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";

interface ISeparatorProps {
  children?: React.ReactNode;
}

export const Separator: React.FC<ISeparatorProps> = ({ children }) => (
  <View style={styles.container}>
    <View style={styles.line}></View>
    {children && (
      // <Typography size="i12" weight="medium" color="systemLightGray">
      //   {children}
      // </Typography>
      <Text>{children}</Text>
    )}
    <View style={styles.line}></View>
  </View>
);
