import { StyleSheet } from "react-native";

import { AppColors, ContainerStyles, FontSizes } from "../../../constants";
import { scaleSize } from "../../../utils";

const styles = StyleSheet.create({
  container: {
    ...ContainerStyles.i1,
    backgroundColor: AppColors.systemWhite,
    opacity: 0.8,
    padding: scaleSize(24),
  },
  message: {
    fontSize: FontSizes.i12,
    color: AppColors.systemWhite,
    marginBottom: scaleSize(10),
  },
});

export default styles;
