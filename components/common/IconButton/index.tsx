import React from "react";
import {
  Pressable,
  ViewStyle,
  PressableStateCallbackType,
  Image,
  ImageStyle,
} from "react-native";
import styles from "./styles";

interface IIconButtonProps {
  source: any;
  iconHeight?: ImageStyle["height"];
  iconWidth?: ImageStyle["width"];
  resizeMode?: ImageStyle["resizeMode"];
  disabled?: boolean;
  imageStyle?: ImageStyle;
  style?: ViewStyle;
  pressedStyle?: ViewStyle;
  disabledStyle?: ViewStyle;
  onPress?: () => void;
}

export const IconButton: React.FC<IIconButtonProps> = ({
  source,
  iconHeight = 24,
  iconWidth = 24,
  resizeMode = "center",
  disabled,
  imageStyle,
  style,
  pressedStyle = styles.pressed,
  disabledStyle = styles.disabled,
  onPress,
}) => {
  const getContainerStyle = ({ pressed }: PressableStateCallbackType) => [
    style,
    disabled ? disabledStyle : pressed && pressedStyle,
  ];

  const mergedImageStyle = [
    imageStyle,
    { height: iconHeight, width: iconWidth },
  ];

  return (
    <Pressable disabled={disabled} onPress={onPress} style={getContainerStyle}>
      <Image style={mergedImageStyle} resizeMode={resizeMode} source={source} />
    </Pressable>
  );
};
