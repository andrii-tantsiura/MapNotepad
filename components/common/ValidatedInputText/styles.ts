import { StyleSheet } from "react-native";

import { AppPalette } from "../../../constants";
import { scaleSize } from "../../../utils";

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    columnGap: scaleSize(8),
    alignItems: "center",
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: AppPalette.systemLightGray,
  },
  input: {
    flex: 1,
    paddingLeft: scaleSize(12),
    height: scaleSize(41),
  },
  focusedInputContainer: {
    borderColor: AppPalette.systemGray,
  },
});

export default styles;
