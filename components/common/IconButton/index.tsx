import React from "react";
import {
  Image,
  ImageProps,
  ImageStyle,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";

import { ImageSizes } from "../../../constants";
import { IAppColors } from "../../../constants/themes/types";
import { useAppTheme } from "../../../hooks/useAppTheme";
import styles from "./styles";

interface IIconButtonProps {
  imageSource: ImageProps["source"];
  tintColor?: keyof IAppColors;
  backgroundColor?: keyof IAppColors;
  borderColor?: keyof IAppColors;
  imageStyle?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const IconButton: React.FC<IIconButtonProps> = ({
  imageSource,
  imageStyle,
  tintColor,
  backgroundColor,
  borderColor,
  style,
  onPress,
}) => {
  const { appColors } = useAppTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        style,
        backgroundColor && { backgroundColor: appColors[backgroundColor] },
        borderColor && { borderColor: appColors[borderColor] },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Image
        style={[
          ImageSizes.medium,
          imageStyle,
          tintColor && { tintColor: appColors[tintColor] },
        ]}
        source={imageSource}
      />
    </Pressable>
  );
};
