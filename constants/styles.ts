import { StyleSheet } from "react-native";
import COLORS from "./colors";
import { SCALE_FACTOR as SCALE_FACTOR } from "./fontSizes";

export const GlobalStyles = StyleSheet.create({
  button_i1: {
    alignItems: "center",
    justifyContent: "center",
    height: 40 * SCALE_FACTOR,
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
    height: 40 * SCALE_FACTOR,
    borderWidth: 1,
    borderColor: COLORS.systemLightGray,
  },
  shadow_i1: {
    elevation: 5,
    shadowColor: COLORS.systemBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  shadow_i2: {
    elevation: 6,
    shadowColor: COLORS.systemBlack,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
});
