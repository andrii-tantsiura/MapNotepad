import { StyleSheet } from "react-native";

import { scaleSize } from "../../../../../utils";

export const FOUND_PIN_HEIGHT = 78;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: FOUND_PIN_HEIGHT,
    columnGap: scaleSize(8),
    paddingVertical: scaleSize(12),
    paddingHorizontal: scaleSize(16),
  },
});

export default styles;
