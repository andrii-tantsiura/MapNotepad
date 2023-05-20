import React from "react";
import { Text, TextProps, TextStyle } from "react-native";

import COLORS, { IColors } from "../../../constants/colors";
import {
  FontSizes,
  FontWeights,
  IFontSizes,
  IFontWeights,
} from "../../../constants/typography";

export interface ITypographyProps extends TextProps {
  size?: keyof IFontSizes;
  weight?: keyof IFontWeights;
  color?: keyof IColors;
  textAlign?: TextStyle["textAlign"];
  numberOfLines?: number;
  textStyle?: TextStyle;
}

export const Typography: React.FC<ITypographyProps> = ({
  size = "i14",
  weight = "medium",
  color = "systemWhite",
  textAlign = "left",
  numberOfLines = 1,
  textStyle,
  children,
  ...props
}) => (
  <Text
    style={[
      {
        textAlign,
        ...FontWeights[weight],
        ...FontSizes[size],
        color: COLORS[color],
      },
      textStyle,
    ]}
    {...props}
  >
    {children}
  </Text>
);
