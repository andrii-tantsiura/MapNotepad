import { StyleSheet, ViewStyle } from "react-native";

import { CustomButtonStyle } from "../components/common";
import { scaleSize } from "../utils";
import { AppColors } from "./colors";
import { textStyle_i4, textStyle_i5 } from "./typography";

export const ShadowStyles = StyleSheet.create({
  shadow_i1: {
    elevation: 5,
    shadowColor: AppColors.systemBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  shadow_i2: {
    elevation: 6,
    shadowColor: AppColors.systemBlack,
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
    // ...FontSizes.i16,
    // ...FontWeights.semiBold,
    color: AppColors.systemBlack,
  },
});

export const ImageStyles = StyleSheet.create({
  image_i1: {
    height: scaleSize(24),
    width: scaleSize(24),
  },
  image_i2: {
    height: scaleSize(20),
    width: scaleSize(20),
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

export const CustomButtonStyles: {
  [key: string]: CustomButtonStyle;
} = {
  simple_i1: {
    containerStyle: {
      height: scaleSize(40),
      borderRadius: 2,
      backgroundColor: AppColors.lightPrimary,
    },
    textStyle: textStyle_i4,
  },
  outline_i1: {
    containerStyle: {
      height: scaleSize(40),
      borderRadius: 2,
      borderWidth: 1,
      borderColor: AppColors.lightPrimary,
      backgroundColor: AppColors.systemWhite,
    },
    textStyle: textStyle_i5,
  },
  outline_i2: {
    containerStyle: {
      height: scaleSize(40),
      borderRadius: 2,
      borderWidth: 1,
      borderColor: AppColors.systemLightGray,
      backgroundColor: AppColors.systemWhite,
    },
    textStyle: textStyle_i5,
  },
};

export const IconButtonStyles = StyleSheet.create({
  outline_i1: {
    ...baseButtonStyle,
    borderColor: AppColors.systemLightGray,
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
    backgroundColor: AppColors.systemWhite,
    ...ShadowStyles.shadow_i2,
  },
});
