import { StyleSheet } from "react-native";

import { AppPalette } from "../../../../../constants";
import { scaleSize } from "../../../../../utils";
8;

const styles = StyleSheet.create({
  hiddenActionMenu: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  hiddenButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scaleSize(16),
  },
  hiddenDeleteButton: {
    backgroundColor: AppPalette.lightError,
  },
  hiddenEditButton: {
    backgroundColor: AppPalette.lightPrimary,
  },
});

export default styles;
