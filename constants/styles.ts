import { StyleSheet } from "react-native";
import COLORS from "./colors";

export const GlobalStyles = StyleSheet.create({
  buttonOutline_i1: {
    height: 46,
    borderWidth: 1,
    borderColor: COLORS.lightPrimary,
    backgroundColor: COLORS.systemWhite,
  },
  iconButtonOutline_i1: {
    alignItems: "center",
    justifyContent: "center",
    height: 46,
    borderWidth: 1,
    borderColor: COLORS.systemLightGray,
  },
});
