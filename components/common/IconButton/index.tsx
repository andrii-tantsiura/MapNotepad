import React from "react";
import { Pressable, ViewStyle } from "react-native";
import styles from "./styles";
import { IImageProps, Icon } from "../Icon";

interface IIconButtonProps extends IImageProps {
  onPress?: () => void;
  style?: ViewStyle;
  pressedStyle?: ViewStyle;
}

export const IconButton: React.FC<IIconButtonProps> = ({
  source,
  style,
  pressedStyle = styles.pressed,
  onPress,
  ...props
}) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [style, pressed && pressedStyle]}
  >
    <Icon source={source} {...props} />
  </Pressable>
);
