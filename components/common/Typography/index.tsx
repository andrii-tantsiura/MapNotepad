import React from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

import { typographyStyleToTextStyle } from "../../../helpers";
import { ITypographyStyle } from "./types";

export interface ITypographyProps extends Omit<TextProps, "style"> {
  textAlign?: TextStyle["textAlign"];
  style?: StyleProp<ITypographyStyle>;
}

export const Typography: React.FC<ITypographyProps> = ({
  textAlign,
  style,
  children,
  ...props
}) => {
  const textStyles = [typographyStyleToTextStyle(style), { textAlign }];

  return (
    <Text {...props} style={textStyles}>
      {children}
    </Text>
  );
};
