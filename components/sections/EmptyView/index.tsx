import { FC, ReactNode } from "react";
import { View } from "react-native";

import { textStyle_i5 } from "../../../constants";
import { Typography } from "../../common";
import styles from "./styles";

interface IEmptyViewProps {
  children: ReactNode;
}

export const EmptyView: FC<IEmptyViewProps> = ({ children }) => (
  <View style={styles.container}>
    <Typography style={textStyle_i5}>{children}</Typography>
  </View>
);
