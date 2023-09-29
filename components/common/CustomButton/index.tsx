import React from "react";
import {
  Image,
  ImageProps,
  Pressable,
  PressableStateCallbackType,
  ViewProps,
} from "react-native";

import { ImageStyles } from "../../../constants";
import { useAppTheme } from "../../../hooks/useAppTheme";
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
  order?: "textIcon" | "iconText";
  style?: CustomButtonStyle;
  onPress?: () => void;
}

export const CustomButton: React.FC<ICustomButtonProps> = ({
  children,
  imageSource,
  order = "textIcon",
  style,
  containerStyle,
  textStyle,
  iconStyle,
  onPress,
}) => {
  const { appColors } = useAppTheme();

  const getStyle = ({ pressed }: PressableStateCallbackType) => [
    styles.container,
    order === "iconText" && styles.reversed,
    style?.containerStyle,
    containerStyle,
    pressed && styles.pressed,
  ];

  return (
    <Pressable style={getStyle} onPress={onPress}>
      {children && (
        <Typography style={[style?.textStyle, textStyle]}>
          {children}
        </Typography>
      )}
      {imageSource && (
        <Image
          style={[ImageStyles.i1, { tintColor: appColors.primary }, iconStyle]}
          source={imageSource}
        />
      )}
    </Pressable>
  );
};
