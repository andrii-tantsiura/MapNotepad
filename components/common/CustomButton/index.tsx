import React, { ReactNode } from "react";
import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  Text,
  ViewStyle,
} from "react-native";

import { CustomButtonStyles } from "../../../constants/globalStyles";
import styles from "./styles";

interface ICustomButtonProps {
  children: ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  pressedStyle?: ViewStyle;
  disabledStyle?: ViewStyle;
  onPress?: () => void;
}

export const CustomButton: React.FC<ICustomButtonProps> = ({
  disabled,
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
      {/* <Typography
        size={size}
        weight={weight}
        color={color}
        textAlign={textAlign}
        textStyle={textStyle}
      >
        {children}
      </Typography> */}
      <Text>{children}</Text>
    </Pressable>
  );
};
