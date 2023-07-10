import { StyleSheet } from "react-native";

import { AppColors } from "../../../constants";
import { IconButtonStyles } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyListContainer: {
    flex: 1,
  },
  addPinButton: {
    ...IconButtonStyles.float_i1,
    backgroundColor: AppColors.lightPrimary,
  },
});

export default styles;
