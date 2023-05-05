import { StyleSheet } from "react-native";
import colors from "../../constants/colors";
import { FontSizes } from "../../constants/fontSizes";
import { FontWeights } from "../../constants/fontWeights";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  title: {
    textAlign: "center",
    ...FontSizes.i12,
    ...FontWeights.medium,
    color: colors.systemWhite,
  },
});

export default styles;
