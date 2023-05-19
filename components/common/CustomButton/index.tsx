import React from "react";
import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from "react-native";

import { CustomButtonStyles } from "../../../constants/globalStyles";
import { ITypographyProps, Typography } from "../Typography";
import styles from "./styles";

interface ICustomButtonProps extends ITypographyProps {
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  pressedStyle?: ViewStyle;
  disabledStyle?: ViewStyle;
  onPress?: () => void;
}

export const CustomButton: React.FC<ICustomButtonProps> = ({
  size = "i14",
  weight = "semiBold",
  color = "systemWhite",
  textAlign = "center",
  disabled,
  textStyle,
  style = CustomButtonStyles.regular_i1,
  pressedStyle = styles.pressed,
  disabledStyle = styles.disabled,
  children,
  onPress,
}) => {
  const getStyle = ({ pressed }: PressableStateCallbackType) => [
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
