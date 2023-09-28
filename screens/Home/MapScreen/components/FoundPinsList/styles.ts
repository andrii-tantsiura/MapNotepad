import { StyleSheet } from "react-native";

import { AppColors } from "../../../../../constants";
import { scaleSize } from "../../../../../utils";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    backgroundColor: AppColors.background,
  },
  pinItem: {
    flexDirection: "row",
    columnGap: scaleSize(8),
    paddingVertical: scaleSize(12),
    paddingHorizontal: scaleSize(16),
  },
  nothingFoundText: {
    paddingVertical: scaleSize(12),
    paddingHorizontal: scaleSize(16),
  },
});

export default styles;
