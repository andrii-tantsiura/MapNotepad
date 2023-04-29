import React from "react";
import { Text, TextProps, TextStyle } from "react-native";
import colors, { IColors } from "../../../constants/colors";
import { IFontWeights, fontWeights } from "../../../constants/fontWeights";
import { IFontSizes, fontSizes } from "../../../constants/fontSizes";

interface ITypographyProps extends TextProps {
  size?: keyof IFontSizes;
  weight?: keyof IFontWeights;
  color?: keyof IColors;
  style?: TextStyle;
}

export const Typography: React.FC<ITypographyProps> = ({
  size = "i14",
  weight = "medium",
  color = "systemWhite",
  style,
  children,
  ...props
}) => (
  <Text
    style={[
      style,
      {
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
