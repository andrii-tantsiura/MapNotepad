import { StyleSheet } from "react-native";

import { AppColors } from "../../../../../constants";
import { scaleSize } from "../../../../../utils";

const styles = StyleSheet.create({
  hiddenActionMenu: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  hiddenDeleteButton: {
    paddingVertical: scaleSize(24),
    paddingHorizontal: scaleSize(16),
    backgroundColor: AppColors.lightError,
  },
  hiddenEditButton: {
    paddingVertical: scaleSize(24),
    paddingHorizontal: scaleSize(16),
    backgroundColor: AppColors.lightPrimary,
  },
});

export default styles;
