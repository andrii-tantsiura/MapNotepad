import { StyleSheet } from "react-native";

import COLORS from "../../../../../constants/colors";
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
    backgroundColor: COLORS.lightError,
  },
  hiddenEditButton: {
    paddingVertical: scaleSize(24),
    paddingHorizontal: scaleSize(16),
    backgroundColor: COLORS.lightPrimary,
  },
});

export default styles;
