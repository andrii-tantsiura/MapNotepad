import { HeaderTitleProps } from "@react-navigation/elements";
import { FC } from "react";

import { textStyle_i6 } from "../../../constants";
import { Typography } from "../../common";

export const HeaderTitle: FC<HeaderTitleProps> = ({ children }) => (
  <Typography style={textStyle_i6}>{children}</Typography>
);
