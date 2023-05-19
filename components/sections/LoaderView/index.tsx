import { ActivityIndicator, Text, View } from "react-native";

import COLORS, { IColors } from "../../../constants/colors";
import styles from "./styles";

interface ILoaderView {
  message?: string;
  spinnerColor?: keyof IColors;
}

export const LoaderView: React.FC<ILoaderView> = ({
  message = "Loading...",
  spinnerColor = COLORS.darkPrimary,
}) => (
  <View style={styles.container}>
    <Text style={styles.message}>{message}</Text>
    <ActivityIndicator color={spinnerColor} size="large" />
  </View>
);
