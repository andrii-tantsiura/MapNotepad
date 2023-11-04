import { StyleSheet } from "react-native";

import { scaleSize } from "../../../../../utils";

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
    height: scaleSize(40),
    width: scaleSize(40),
    borderRadius: 6,
  },
  contextMenuTrigger: {
    marginHorizontal: 10,
    paddingBottom: 10,
  },
});

export default styles;
