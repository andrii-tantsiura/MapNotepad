import React from "react";
import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from "react-native";
import { ITypographyProps, Typography } from "../Typography";
import styles from "./styles";
import { GlobalStyles } from "../../../constants/styles";

interface IButtonProps extends ITypographyProps {
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  pressedStyle?: ViewStyle;
  disabledStyle?: ViewStyle;
  onPress?: () => void;
}

export const Button: React.FC<IButtonProps> = ({
  size = "i14",
  weight = "semiBold",
  color = "systemWhite",
  textAlign = "center",
  disabled,
  textStyle,
  style,
  pressedStyle = styles.pressed,
  disabledStyle = styles.disabled,
  children,
  onPress,
}) => {
  const getStyle = ({ pressed }: PressableStateCallbackType) => [
    GlobalStyles.button_i1,
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
