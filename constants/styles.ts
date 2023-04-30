import { ViewStyle } from "react-native";
import colors, { IColors } from "./colors";
import { IFontSizes } from "./sizes";
import { IFontWeights } from "./fontWeights";

interface ITypographyStyle {
  size: keyof IFontSizes;
  weight: keyof IFontWeights;
  color: keyof IColors;
}

interface IButtonStyle {
  color: keyof IColors;
  style: ViewStyle;
}

export const headerStyle: ITypographyStyle = {
  size: "i16",
  weight: "semiBold",
  color: "systemBlack",
};

export const outlineButton: IButtonStyle = {
  color: "lightPrimary",
  style: {
    borderWidth: 2,
    borderColor: colors.lightPrimary,
    backgroundColor: colors.systemWhite,
  },
};
