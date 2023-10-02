import { StyleSheet } from "react-native";

import { scaleSize } from "../../../utils";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: scaleSize(8),
  },
  reversed: {
    flexDirection: "row-reverse",
  },
  pressed: {
    opacity: 0.6,
  },
});

export default styles;
