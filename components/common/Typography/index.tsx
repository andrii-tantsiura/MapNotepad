import React from "react";
import { Text, TextProps, TextStyle } from "react-native";
import colors, { IColors } from "../../../constants/colors";
import { FontSizes, IFontSizes } from "../../../constants/fontSizes";
import { FontWeights, IFontWeights } from "../../../constants/fontWeights";

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
        ...FontWeights[weight],
        ...FontSizes[size],
        color: colors[color],
      },
      textStyle,
    ]}
    {...props}
  >
    {children}
  </Text>
);
