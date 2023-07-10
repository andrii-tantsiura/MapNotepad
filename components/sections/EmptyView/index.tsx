import { FC, ReactNode } from "react";
import { View } from "react-native";

import { ContainerStyles, textStyle_i5 } from "../../../constants";
import { Typography } from "../../common";

interface IEmptyViewProps {
  children: ReactNode;
}

export const EmptyView: FC<IEmptyViewProps> = ({ children }) => (
  <View style={ContainerStyles.i1}>
    <Typography style={textStyle_i5}>{children}</Typography>
  </View>
);
