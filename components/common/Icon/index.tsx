import React from "react";
import { Image, ImageStyle } from "react-native";

interface IImageProps extends ImageStyle {
  source: any;
}

export const Icon: React.FC<IImageProps> = ({
  source,
  height,
  width = "100%",
  resizeMode = "center",
  ...props
}) => (
  <Image
    style={{ width, height, ...props }}
    resizeMode={resizeMode}
    source={source}
  />
);
