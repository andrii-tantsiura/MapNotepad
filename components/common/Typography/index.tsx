import React from "react";
import { Text, TextProps, TextStyle } from "react-native";
import colors, { IColors } from "../../../constants/colors";
import { IFontWeights, fontWeights } from "../../../constants/fontWeights";
import { IFontSizes, fontSizes } from "../../../constants/sizes";

export interface ITypographyProps extends TextProps {
  size?: keyof IFontSizes;
  weight?: keyof IFontWeights;
  color?: keyof IColors;
  textAlign?: TextStyle["textAlign"];
  numberOfLines?: number;
  textStyle?: TextStyle;
}

export const Typography: React.FC<ITypographyProps> = ({
  children,
  size = "i14",
  weight = "medium",
  color = "systemWhite",
  textAlign = "left",
  numberOfLines = 1,
  textStyle,
  ...props
}) => (
  <Text
    style={[
      {
        textAlign,
        ...fontWeights[weight],
        ...fontSizes[size],
        color: colors[color],
      },
      textStyle,
    ]}
    {...props}
  >
    {children}
  </Text>
);