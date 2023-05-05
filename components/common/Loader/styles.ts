import { StyleSheet } from "react-native";
import colors from "../../../constants/colors";
import { fontSizes } from "../../../constants/sizes";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.systemWhite,
    opacity: 0.8,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  message: {
    ...fontSizes.i14,
    marginBottom: 12,
  },
});

export default styles;
