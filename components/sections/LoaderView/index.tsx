import { ActivityIndicator, Text, View } from "react-native";

import { IAppColors, AppColors } from "../../../constants";
import styles from "./styles";

interface ILoaderView {
  message?: string;
  spinnerColor?: keyof IAppColors;
}

export const LoaderView: React.FC<ILoaderView> = ({
  message = "Loading...",
  spinnerColor = AppColors.primary,
}) => (
  <View style={styles.container}>
    <Text style={styles.message}>{message}</Text>

    <ActivityIndicator color={spinnerColor} size="large" />
  </View>
);
