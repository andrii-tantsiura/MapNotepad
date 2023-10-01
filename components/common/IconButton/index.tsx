import React from "react";
import {
  Image,
  ImageProps,
  ImageStyle,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";

import { ImageStyles } from "../../../constants";
import styles from "./styles";

interface IIconButtonProps {
  imageSource?: ImageProps["source"];
  imageStyle?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const IconButton: React.FC<IIconButtonProps> = ({
  imageSource,
  imageStyle,
  style,
  onPress,
}) => (
  <Pressable
    style={({ pressed }) => [style, pressed && styles.pressed]}
    onPress={onPress}
  >
    {imageSource && (
      <Image style={[ImageStyles.i1, imageStyle]} source={imageSource} />
    )}
  </Pressable>
);
