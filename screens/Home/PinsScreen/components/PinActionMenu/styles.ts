import { StyleSheet } from "react-native";

import { scaleSize } from "../../../../../utils";

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
});

export default styles;
