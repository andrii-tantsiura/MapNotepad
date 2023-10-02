import { FC } from "react";
import { View, ViewProps } from "react-native";

import { IAppColors } from "../../../constants/themes/types";
import { useAppTheme } from "../../../hooks";

export interface IBoxProps extends ViewProps {
  backgroundColor?: keyof IAppColors;
  borderColor?: keyof IAppColors;
}

export const Box: FC<IBoxProps> = ({
  backgroundColor,
  borderColor,
  style,
  ...rest
}) => {
  const { appColors } = useAppTheme();

  return (
    <View
      style={[
        backgroundColor && { backgroundColor: appColors[backgroundColor] },
        borderColor && { borderColor: appColors[borderColor] },
        style,
      ]}
      {...rest}
    />
  );
};
