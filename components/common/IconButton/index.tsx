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
  const getStyle = ({ pressed }: PressableStateCallbackType) => [
    style,
    disabled ? disabledStyle : pressed && pressedStyle,
  ];

  return (
    <Pressable disabled={disabled} onPress={onPress} style={getStyle}>
      <Image
        style={[imageStyle, { height: iconHeight, width: iconWidth }]}
        resizeMode={resizeMode}
        source={source}
      />
    </Pressable>
  );
};
