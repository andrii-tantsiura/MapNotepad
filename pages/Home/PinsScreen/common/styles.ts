import { StyleSheet } from "react-native";
import COLORS from "../../../../constants/colors";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
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
    height: 48,
    width: 48,
    borderRadius: 6,
    backgroundColor: COLORS.lightVariant,
  },
  arrowIcon: {
    width: 28,
    height: 28,
  },
});

export default styles;
