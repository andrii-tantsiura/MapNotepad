import { FC, ReactNode } from "react";
import { Text, View } from "react-native";

import styles from "./styles";

interface IEmptyViewProps {
  children: ReactNode;
}

export const EmptyView: FC<IEmptyViewProps> = ({ children }) => (
  <View style={styles.container}>
    {/* <Typography color="lightPrimary">{children}</Typography> */}
    <Text>{children}</Text>
  </View>
);
