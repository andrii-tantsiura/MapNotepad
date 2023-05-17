import { FC, ReactNode } from "react";
import { View } from "react-native";
import { Typography } from "../../common";
import styles from "./styles";

interface IEmptyViewProps {
  children: ReactNode;
}

export const EmptyView: FC<IEmptyViewProps> = ({ children }) => (
  <View style={styles.container}>
    <Typography color="lightPrimary">{children}</Typography>
  </View>
);
