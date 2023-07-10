import { StyleSheet } from "react-native";

import { AppColors } from "../../constants";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  title: {
    textAlign: "center",
    // ...FontSizes.i12,
    // ...FontWeights.medium,
    color: AppColors.systemWhite,
  },
});

export default styles;
