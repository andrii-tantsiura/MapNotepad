import { ActivityIndicator, Text, View } from "react-native";
import styles from "./styles";
import colors, { IColors } from "../../../constants/colors";

interface ILoading {
  message: string;
  spinnerColor?: keyof IColors;
}

export const Loader: React.FC<ILoading> = ({
  message,
  spinnerColor = colors.darkPrimary,
}) => (
  <View style={styles.container}>
    <Text style={styles.message}>{message}</Text>
    <ActivityIndicator color={spinnerColor} size="large" />
  </View>
);