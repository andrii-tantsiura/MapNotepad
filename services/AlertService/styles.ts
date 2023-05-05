import { StyleSheet } from "react-native";
import colors from "../../constants/colors";
import { fontSizes } from "../../constants/sizes";
import { fontWeights } from "../../constants/fontWeights";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  title: {
    textAlign: "center",
    ...fontSizes.i12,
    ...fontWeights.medium,
    color: colors.systemWhite,
  },
});

export default styles;
