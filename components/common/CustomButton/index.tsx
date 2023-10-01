import React from "react";
import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  ViewProps,
  ViewStyle,
} from "react-native";

import { ITypographyProps, Typography } from "../Typography";
import styles from "./styles";

interface ICustomButtonProps {
  children: ViewProps["children"];
  style?: StyleProp<ViewStyle>;
  textStyle?: ITypographyProps["style"];
  onPress?: () => void;
}

export const CustomButton: React.FC<ICustomButtonProps> = ({
  children,
  style,
  textStyle,
  onPress,
}) => {
  const getStyle = ({ pressed }: PressableStateCallbackType) => [
    styles.container,
    style,
    pressed && styles.pressed,
  ];

  return (
    <Pressable style={getStyle} onPress={onPress}>
      <Typography style={textStyle}>{children}</Typography>
    </Pressable>
  );
};
