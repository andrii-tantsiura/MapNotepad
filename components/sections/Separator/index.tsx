import React from "react";
import { View } from "react-native";

import { textStyle_i8 } from "../../../constants";
import { Box } from "../../common/Box";
import { Typography } from "../../common/Typography";
import styles from "./styles";

interface ISeparatorProps {
  children?: React.ReactNode;
}

export const Separator: React.FC<ISeparatorProps> = ({ children }) => (
  <View style={styles.container}>
    <Box backgroundColor="variant" style={styles.line} />

    {children && (
      <Typography style={[textStyle_i8, styles.text]}>{children}</Typography>
    )}

    <Box backgroundColor="variant" style={styles.line} />
  </View>
);
