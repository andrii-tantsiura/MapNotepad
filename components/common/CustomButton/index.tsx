import React from "react";
import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  ViewProps,
  ViewStyle,
} from "react-native";

import { CustomButtonStyles } from "../../../constants";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { IBoxProps } from "../Box";
import { ITypographyProps, Typography } from "../Typography";
import styles from "./styles";

interface ICustomButtonProps extends IBoxProps {
  children: ViewProps["children"];
  style?: StyleProp<ViewStyle>;
  textStyle?: ITypographyProps["style"];
  onPress?: () => void;
}

export const CustomButton: React.FC<ICustomButtonProps> = ({
  children,
  backgroundColor,
  borderColor,
  style,
  textStyle,
  onPress,
}) => {
  const { appColors } = useAppTheme();

  const getStyle = ({ pressed }: PressableStateCallbackType) => [
    styles.container,
    CustomButtonStyles.base,
    style,
    backgroundColor && { backgroundColor: appColors[backgroundColor] },
    { borderColor: borderColor ? appColors[borderColor] : "transparent" },
    pressed && styles.pressed,
  ];

  return (
    <Pressable style={getStyle} onPress={onPress}>
      <Typography style={textStyle}>{children}</Typography>
    </Pressable>
  );
};
