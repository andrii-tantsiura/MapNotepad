import React from "react";
import { Image, ImageProps, ImageStyle, StyleProp } from "react-native";

import { ImageSizes } from "../../../constants";
import { IAppColors } from "../../../constants/themes/types";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { Box, IBoxProps } from "../Box/index";

interface IIconProps extends IBoxProps {
  source: ImageProps["source"];
  tintColor?: keyof IAppColors;
  imageStyle?: StyleProp<ImageStyle>;
}

export const Icon: React.FC<IIconProps> = ({
  source,
  imageStyle,
  tintColor,
  backgroundColor,
  borderColor,
  style,
}) => {
  const { appColors } = useAppTheme();

  return (
    <Box
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      style={style}
    >
      <Image
        style={[
          ImageSizes.medium,
          imageStyle,
          tintColor && { tintColor: appColors[tintColor] },
        ]}
        source={source}
      />
    </Box>
  );
};
