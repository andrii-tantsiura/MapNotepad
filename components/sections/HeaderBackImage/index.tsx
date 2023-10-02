import { FC } from "react";

import { LEFT_BLUE_ICON } from "../../../assets/icons";
import { ImageSizes } from "../../../constants";
import { Icon } from "../../common";

export const HeaderBackImage: FC = () => (
  <Icon style={ImageSizes.medium} tintColor="primary" source={LEFT_BLUE_ICON} />
);
