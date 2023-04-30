import React from "react";
import { Pressable, ViewStyle, PressableStateCallbackType } from "react-native";
import styles from "./styles";
import { IImageProps, Icon } from "../Icon";

interface IIconButtonProps extends IImageProps {
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  pressedStyle?: ViewStyle;
  disabledStyle?: ViewStyle;
}

export const IconButton: React.FC<IIconButtonProps> = ({
  source,
  style,
  disabled,
  pressedStyle = styles.pressed,
  disabledStyle = styles.disabled,
  onPress,
  ...props
}) => {
  const getStyle = ({ pressed }: PressableStateCallbackType) => [
    style,
    disabled ? disabledStyle : pressed && pressedStyle,
  ];

  return (
    <Pressable disabled={disabled} onPress={onPress} style={getStyle}>
      <Icon source={source} {...props} />
    </Pressable>
  );
};
