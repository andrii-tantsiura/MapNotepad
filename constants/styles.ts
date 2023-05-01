import { StyleSheet } from "react-native";
import colors from "./colors";

export const globalStyles = StyleSheet.create({
  buttonOutline_i1: {
    height: 46,
    borderWidth: 1,
    borderColor: colors.lightPrimary,
    backgroundColor: colors.systemWhite,
  },
  iconButtonOutline_i1: {
    alignItems: "center",
    justifyContent: "center",
    height: 46,
    borderWidth: 1,
    borderColor: colors.systemLightGray,
  },
});
