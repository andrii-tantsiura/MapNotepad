import React from "react";
import { Text, TextProps, TextStyle } from "react-native";
import colors, { IColors } from "../../../constants/colors";
import { IFontWeights, fontWeights } from "../../../constants/fontWeights";
import { IFontSizes, fontSizes } from "../../../constants/fontSizes";

export interface ITypographyProps extends TextProps {
  size?: keyof IFontSizes;
  weight?: keyof IFontWeights;
  color?: keyof IColors;
  textAlign?: TextStyle["textAlign"];
  textStyle?: TextStyle;
}

export const Typography: React.FC<ITypographyProps> = ({
  size = "i14",
  weight = "medium",
  color = "systemWhite",
  textAlign = "center",
  numberOfLines = 1,
  textStyle,
  children,
  ...props
}) => (
  <Text
    style={[
      textStyle,
      {
        textAlign,
        ...fontWeights[weight],
        ...fontSizes[size],
        color: colors[color],
      },
    ]}
    {...props}
  >
    {children}
  </Text>
);
