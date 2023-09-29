import React from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

import { typographyStyleToTextStyle } from "../../../helpers";
import { useAppTheme } from "../../../hooks/useAppTheme";
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
  const { appColors } = useAppTheme();
  const textStyles = [
    typographyStyleToTextStyle(style, appColors),
    { textAlign },
  ];

  return (
    <Text {...props} style={textStyles}>
      {children}
    </Text>
  );
};
