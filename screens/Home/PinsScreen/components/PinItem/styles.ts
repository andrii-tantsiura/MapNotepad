import { StyleSheet } from "react-native";

import COLORS from "../../../../../constants/colors";
import { scaleSize } from "../../../../../utils";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: COLORS.systemWhite,
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
    backgroundColor: COLORS.lightVariant,
  },
});

export default styles;
