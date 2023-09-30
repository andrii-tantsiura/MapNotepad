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
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  onPress?: () => void;
}

export const IconButton: React.FC<IIconButtonProps> = ({
  imageSource,
  style,
  imageStyle,
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
