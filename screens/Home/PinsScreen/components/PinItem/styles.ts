import { StyleSheet } from "react-native";

import { AppColors } from "../../../../../constants";
import { scaleSize } from "../../../../../utils";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: AppColors.systemWhite,
  },
  pressed: {
    backgroundColor: AppColors.systemLightGray,
  },
  content: {
    paddingVertical: 21,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoContainer: {
    columnGap: 12,
    alignItems: "center",
    rowGap: 4,
    flexDirection: "row",
  },
  textLinesContainer: { rowGap: 4 },
  likeButton: {
    justifyContent: "center",
    alignItems: "center",
    height: scaleSize(40),
    width: scaleSize(40),
    borderRadius: 6,
    backgroundColor: AppColors.lightVariant,
  },
});

export default styles;
