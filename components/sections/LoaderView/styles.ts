import { StyleSheet } from "react-native";

import { AppColors, ContainerStyles } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    ...ContainerStyles.fill_i1,
    backgroundColor: AppColors.systemWhite,
    opacity: 0.8,
    padding: 32,
  },
  message: {
    // ...FontSizes.i14,
    color: AppColors.systemWhite,
    marginBottom: 12,
  },
});

export default styles;
