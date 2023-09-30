import { StyleSheet } from "react-native";

import { scaleSize } from "../../../../../utils";

export const FOUND_PIN_HEIGHT = 78;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: FOUND_PIN_HEIGHT,
    columnGap: scaleSize(10),
    paddingVertical: scaleSize(12),
    paddingHorizontal: scaleSize(16),
  },
});

export default styles;
