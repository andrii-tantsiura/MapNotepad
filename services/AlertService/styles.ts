import { StyleSheet } from "react-native";

import { AppColors, FontSizes, FontWeights } from "../../constants";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingTop: 32,
    paddingBottom: 16,
  },
  title: {
    textAlign: "center",
    fontSize: FontSizes.i14,
    fontFamily: FontWeights.medium,
    color: AppColors.systemWhite,
  },
});

export default styles;
