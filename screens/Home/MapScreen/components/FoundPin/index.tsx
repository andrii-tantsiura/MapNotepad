import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";

import { PIN_ICON } from "../../../../../assets/icons";
import { Icon, Typography } from "../../../../../components/common";
import {
  ImageSizes,
  textStyle_i11,
  textStyle_i13,
} from "../../../../../constants";
import { IPinItemModel } from "../../../../../types/components";
import styles from "./styles";

type FoundPinProps = {
  pin: IPinItemModel;
  onPress: (pin: IPinItemModel) => void;
};

export const FoundPin: FC<FoundPinProps> = React.memo(({ pin, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(pin)}>
      <Icon
        style={ImageSizes.medium}
        tintColor={pin.isFavorite ? "primary" : "systemGray"}
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
