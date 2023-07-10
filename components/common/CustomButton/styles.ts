import { StyleSheet } from "react-native";

import { AppColors } from "../../../constants";
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
    backgroundColor: AppColors.lightDisabled,
  },
});

export default styles;
