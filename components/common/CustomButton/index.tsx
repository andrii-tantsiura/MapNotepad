import React from "react";
import {
  Image,
  ImageProps,
  Pressable,
  PressableStateCallbackType,
  ViewProps,
} from "react-native";

import { ImageStyles } from "../../../constants";
import { ITypographyProps, Typography } from "../Typography";
import styles from "./styles";

export type CustomButtonStyle = {
  containerStyle?: ViewProps["style"];
  textStyle?: ITypographyProps["style"];
  iconStyle?: ImageProps["style"];
};

interface ICustomButtonProps extends CustomButtonStyle {
  children?: ViewProps["children"];
  imageSource?: ImageProps["source"];
  disabled?: boolean;
  style?: CustomButtonStyle;
  onPress?: () => void;
}

export const CustomButton: React.FC<ICustomButtonProps> = ({
  children,
  imageSource,
  disabled,
  style,
  containerStyle,
  textStyle,
  iconStyle,
  onPress,
}) => {
  const getStyle = ({ pressed }: PressableStateCallbackType) => [
    styles.container,
    style?.containerStyle,
    containerStyle,
    disabled ? styles.disabled : pressed && styles.pressed,
  ];

  return (
    <Pressable style={getStyle} disabled={disabled} onPress={onPress}>
      {children && (
        <Typography style={[style?.textStyle, textStyle]}>
          {children}
        </Typography>
      )}
      {imageSource && (
        <Image style={[ImageStyles.image_i1, iconStyle]} source={imageSource} />
      )}
    </Pressable>
  );
};
