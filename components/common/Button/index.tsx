import React from "react";
import { Pressable, ViewStyle } from "react-native";
import { ITypographyProps, Typography } from "../Typography";
import styles from "./styles";

interface IButtonProps extends ITypographyProps {
  onPress?: () => void;
  style?: ViewStyle;
  pressedStyle?: ViewStyle;
}

export const Button: React.FC<IButtonProps> = ({
  children,
  size = "i14",
  weight = "semiBold",
  color = "systemWhite",
  textAlign = "center",
  textStyle,
  style,
  pressedStyle = styles.pressed,
  onPress,
}) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [styles.button, style, pressed && pressedStyle]}
  >
    <Typography
      size={size}
      weight={weight}
      color={color}
      textAlign={textAlign}
      textStyle={textStyle}
    >
      {children}
    </Typography>
  </Pressable>
);
