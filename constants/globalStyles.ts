import { StyleSheet, ViewStyle } from "react-native";

import { scaleSize } from "../utils/dimensions";
import COLORS from "./colors";
import { FontSizes, FontWeights } from "./typography";

export const ShadowStyles = StyleSheet.create({
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

export const ContainerStyles = StyleSheet.create({
  fill_i1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const TextStyles = StyleSheet.create({
  header_i1: {
    ...FontSizes.i16,
    ...FontWeights.semiBold,
    color: COLORS.systemBlack,
  },
});

export const ImageStyles = StyleSheet.create({
  image_i1: {
    height: scaleSize(24),
    width: scaleSize(24),
  },
});

const baseButtonStyle: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  height: scaleSize(40),
  borderWidth: 1,
  borderRadius: 4,
  borderColor: "transparent",
};

export const CustomButtonStyles = StyleSheet.create({
  regular_i1: {
    ...baseButtonStyle,
    backgroundColor: COLORS.lightPrimary,
  },
  outline_i1: {
    ...baseButtonStyle,
    backgroundColor: COLORS.systemWhite,
    borderColor: COLORS.lightPrimary,
  },
});
export const IconButtonStyles = StyleSheet.create({
  outline_i1: {
    ...baseButtonStyle,
    borderColor: COLORS.systemLightGray,
  },
  float_i1: {
    position: "absolute",
    bottom: 0,
    right: 0,
    marginRight: 16,
    marginBottom: 18,
    ...baseButtonStyle,
    width: scaleSize(46),
    height: scaleSize(46),
    borderRadius: 30,
    backgroundColor: COLORS.systemWhite,
    ...ShadowStyles.shadow_i2,
  },
});
