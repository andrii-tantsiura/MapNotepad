import { FC } from "react";
import { Image } from "react-native";

import { LEFT_BLUE_ICON } from "../../../assets/icons";
import { ImageStyles } from "../../../constants";

export const HeaderBackImage: FC = () => (
  <Image style={ImageStyles.image_i1} source={LEFT_BLUE_ICON} />
);
