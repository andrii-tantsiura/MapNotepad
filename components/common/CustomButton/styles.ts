import { StyleSheet } from "react-native";

import COLORS from "../../../constants/colors";
import { scaleSize } from "../../../utils";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: scaleSize(8),
  },
  pressed: {
    opacity: 0.5,
  },
  disabled: {
    backgroundColor: COLORS.lightDisabled,
  },
});

export default styles;
