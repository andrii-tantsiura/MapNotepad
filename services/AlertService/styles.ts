import { StyleSheet } from "react-native";

import COLORS from "../../constants/colors";
import { FontSizes, FontWeights } from "../../constants/textStyles";

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
    color: COLORS.systemWhite,
  },
});

export default styles;
