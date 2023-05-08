import { StyleSheet } from "react-native";
import COLORS from "./colors";

export const GlobalStyles = StyleSheet.create({
  button_i1: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    backgroundColor: COLORS.lightPrimary,
    borderWidth: 1,
    borderColor: "transparent",
  },
  buttonOutline_i1: {
    borderColor: COLORS.lightPrimary,
    backgroundColor: COLORS.systemWhite,
  },
  iconButtonOutline_i1: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.systemLightGray,
  },
  shadow_i1: {
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
