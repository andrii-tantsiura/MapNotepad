import { FC } from "react";
import { Image } from "react-native";

import { LEFT_BLUE_ICON } from "../../../assets/icons";
import { ImageStyles } from "../../../constants";

interface HeaderBackImageProps {
  tintColor: string;
}

export const HeaderBackImage: FC<HeaderBackImageProps> = ({ tintColor }) => (
  <Image style={[ImageStyles.i1, { tintColor }]} source={LEFT_BLUE_ICON} />
);
