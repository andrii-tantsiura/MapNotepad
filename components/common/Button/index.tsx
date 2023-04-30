import React from "react";
import { Pressable, PressableStateCallbackType, ViewStyle } from "react-native";
import { ITypographyProps, Typography } from "../Typography";
import styles from "./styles";

interface IButtonProps extends ITypographyProps {
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  pressedStyle?: ViewStyle;
  disabledStyle?: ViewStyle;
}

export const Button: React.FC<IButtonProps> = ({
  children,
  size = "i14",
  weight = "semiBold",
  color = "systemWhite",
  textAlign = "center",
  disabled,
  textStyle,
  style,
  pressedStyle = styles.pressed,
  disabledStyle = styles.disabled,
  onPress,
}) => {
  const getStyle = ({ pressed }: PressableStateCallbackType) => [
    styles.button,
    style,
    disabled ? disabledStyle : pressed && pressedStyle,
  ];

  return (
    <Pressable disabled={disabled} onPress={onPress} style={getStyle}>
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
};
