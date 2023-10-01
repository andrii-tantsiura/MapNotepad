import { ActivityIndicator, Text, View } from "react-native";

import { IAppColors } from "../../../constants/themes/types";
import { useAppTheme } from "../../../hooks";
import styles from "./styles";

interface ILoaderView {
  message?: string;
  spinnerColor?: keyof IAppColors;
}

export const LoaderView: React.FC<ILoaderView> = ({
  message = "Loading...",
  spinnerColor,
}) => {
  const { appColors, getColorStyle } = useAppTheme();

  return (
    <View style={[styles.container, getColorStyle("background", "background")]}>
      <Text style={styles.message}>{message}</Text>

      <ActivityIndicator
        color={spinnerColor ?? appColors.primary}
        size="large"
      />
    </View>
  );
};
