import { StyleSheet } from "react-native";

import COLORS from "../../../constants/colors";
import { FontSizes, FontWeights } from "../../../constants/typography";
import { ContainerStyles } from "../../../constants/globalStyles";

const styles = StyleSheet.create({
  container: {
    ...ContainerStyles.fill_i1,
    backgroundColor: COLORS.systemWhite,
    opacity: 0.8,
    padding: 32,
  },
  message: {
    ...FontSizes.i14,
    color: COLORS.systemWhite,
    marginBottom: 12,
  },
});

export default styles;
