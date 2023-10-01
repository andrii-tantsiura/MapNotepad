import { ActivityIndicator, Text } from "react-native";

import { IAppColors } from "../../../constants/themes/types";
import { useAppTheme } from "../../../hooks";
import { Box } from "../../common";
import styles from "./styles";

interface ILoaderView {
  message?: string;
  spinnerColor?: keyof IAppColors;
}

export const LoaderView: React.FC<ILoaderView> = ({
  message = "Loading...",
  spinnerColor,
}) => {
  const { appColors } = useAppTheme();

  return (
    <Box backgroundColor="background" style={styles.container}>
      <Text style={styles.message}>{message}</Text>

      <ActivityIndicator
        color={spinnerColor ?? appColors.primary}
        size="large"
      />
    </Box>
  );
};
