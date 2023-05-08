import React from "react";
import {
  Pressable,
  ViewStyle,
  PressableStateCallbackType,
  Image,
  ImageStyle,
  StyleProp,
} from "react-native";
import styles from "./styles";

interface IIconButtonProps {
  iconHeight?: ImageStyle["height"];
  iconWidth?: ImageStyle["width"];
  resizeMode?: ImageStyle["resizeMode"];
  disabled?: boolean;
  imageStyle?: ImageStyle;
  style?: StyleProp<ViewStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
  disabledStyle?: StyleProp<ViewStyle>;
  source: any;
  onPress?: () => void;
}

export const IconButton: React.FC<IIconButtonProps> = ({
  iconHeight = 24,
  iconWidth = 24,
  resizeMode = "center",
  disabled,
  imageStyle,
  style,
  pressedStyle = styles.pressed,
  disabledStyle = styles.disabled,
  source,
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
