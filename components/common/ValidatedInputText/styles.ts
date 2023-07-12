import { StyleSheet } from "react-native";

import { AppColors } from "../../../constants";
import { scaleSize } from "../../../utils";

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    columnGap: scaleSize(8),
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: AppColors.systemLightGray,
  },
  input: {
    flex: 1,
    paddingLeft: scaleSize(12),
    height: scaleSize(41),
  },
  toggleHiddenButton: {
    marginTop: 15,
  },
  clearButton: {
    marginTop: 15,
    marginRight: 14,
  },
  focusedInputContainer: {
    borderColor: AppColors.systemGray,
  },
  errorInputContainer: {
    borderColor: AppColors.lightError,
  },
});

export default styles;
