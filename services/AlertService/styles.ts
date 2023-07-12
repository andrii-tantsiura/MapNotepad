import { StyleSheet } from "react-native";

import { AppColors, FontSizes } from "../../constants";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  title: {
    textAlign: "center",
    fontSize: FontSizes.i12,
    color: AppColors.systemWhite,
  },
});

export default styles;
