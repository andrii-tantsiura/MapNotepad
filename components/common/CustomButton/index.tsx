import React from "react";
import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  ViewProps,
} from "react-native";

import { Typography } from "../Typography";
import { ITypographyStyle } from "../Typography/types";
import styles from "./styles";

export type CustomButtonStyle = {
  container?: ViewProps["style"];
  text?: StyleProp<ITypographyStyle>;
};

interface ICustomButtonProps {
  children: ViewProps["children"];
  disabled?: boolean;
  style?: CustomButtonStyle;
  onPress: () => void;
}

export const CustomButton: React.FC<ICustomButtonProps> = ({
  children,
  disabled,
  style: { container: containerStyle, text: textStyle } = {
    text: {},
    container: {},
  },
  onPress,
}) => {
  const getStyle = ({ pressed }: PressableStateCallbackType) => [
    styles.container,
    containerStyle,
    disabled ? styles.disabled : pressed && styles.pressed,
  ];

  return (
    <Pressable style={getStyle} disabled={disabled} onPress={onPress}>
      <Typography style={textStyle}>{children}</Typography>
    </Pressable>
  );
};
