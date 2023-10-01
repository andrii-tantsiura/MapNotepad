import React from "react";
import {
  ImageProps,
  ImageStyle,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";

import { ImageSizes } from "../../../constants";
import { IAppColors } from "../../../constants/themes/types";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { Icon } from "../Icon";
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
      style={({ pressed }) => [pressed && styles.pressed]}
      onPress={onPress}
    >
      <Icon
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        style={style}
        imageStyle={[
          ImageSizes.medium,
          imageStyle,
          tintColor && { tintColor: appColors[tintColor] },
        ]}
        source={imageSource}
      />
    </Pressable>
  );
};
