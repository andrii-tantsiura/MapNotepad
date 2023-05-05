import { StyleSheet } from "react-native";
import colors from "../../../constants/colors";
import { FontSizes } from "../../../constants/fontSizes";

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
    ...FontSizes.i14,
    marginBottom: 12,
  },
});

export default styles;
