import { StyleSheet, ViewStyle } from "react-native";
import colors, { IColors } from "./colors";
import { IFontSizes } from "./sizes";
import { IFontWeights } from "./fontWeights";

interface ITypographyStyle {
  size: keyof IFontSizes;
  weight: keyof IFontWeights;
  color: keyof IColors;
}

export const headerStyle: ITypographyStyle = {
  size: "i16",
  weight: "semiBold",
  color: "systemBlack",
};

export const globalStyles = StyleSheet.create({
  buttonOutline_i1: {
    borderWidth: 1,
    padding: 11,
    borderColor: colors.lightPrimary,
    backgroundColor: colors.systemWhite,
  },
  iconButtonOutline_i1: {
    alignItems: "center",
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.systemLightGray,
  },
});
