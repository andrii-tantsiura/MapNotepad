import { StyleSheet } from "react-native";
import COLORS from "./colors";
import { FontSizes } from "./fontSizes";
import { FontWeights } from "./fontWeights";
import { scaleSize } from "../utils/dimensions";

export const GlobalStyles = StyleSheet.create({
  headerTitle_i1: {
    ...FontSizes.i16,
    ...FontWeights.semiBold,
    color: COLORS.systemBlack,
  },
  button_i1: {
    alignItems: "center",
    justifyContent: "center",
    height: scaleSize(40),
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
    height: scaleSize(40),
    borderWidth: 1,
    borderColor: COLORS.systemLightGray,
  },
  image_i1: {
    height: scaleSize(24),
    width: scaleSize(24),
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
