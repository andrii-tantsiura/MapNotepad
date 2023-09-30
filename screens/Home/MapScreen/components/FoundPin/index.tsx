import React, { FC } from "react";
import { Image, TouchableOpacity, View } from "react-native";

import { PIN_ICON } from "../../../../../assets/icons";
import { Typography } from "../../../../../components/common";
import {
  ImageStyles,
  textStyle_i11,
  textStyle_i13,
} from "../../../../../constants";
import { useAppTheme } from "../../../../../hooks";
import { IPinItemModel } from "../../../../../types/components";
import styles from "./styles";

type FoundPinProps = {
  pin: IPinItemModel;
  onPress: (pin: IPinItemModel) => void;
};

export const FoundPin: FC<FoundPinProps> = React.memo(({ pin, onPress }) => {
  const { appColors } = useAppTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(pin)}>
      <Image
        style={[
          ImageStyles.i1,
          { tintColor: pin.isFavorite ? appColors.primary : appColors.variant },
        ]}
        source={PIN_ICON}
      />

      <View>
        <Typography
          style={textStyle_i13}
          lineBreakMode="tail"
          numberOfLines={1}
        >
          {pin.label}
        </Typography>

        {/* TODO: show actual address */}
        <Typography
          style={textStyle_i11}
          lineBreakMode="tail"
          numberOfLines={1}
        >
          "Via Alessandro Solivetti, 17, 00168 Roma..."
        </Typography>
      </View>
    </TouchableOpacity>
  );
});
