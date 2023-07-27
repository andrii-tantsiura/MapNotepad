import { StyleSheet } from "react-native";

import { scaleSize } from "../../../../../utils";

const styles = StyleSheet.create({
  pinContent: {
    flexDirection: "row",
    columnGap: scaleSize(8),
    paddingVertical: scaleSize(12),
    paddingHorizontal: scaleSize(16),
  },
});

export default styles;
