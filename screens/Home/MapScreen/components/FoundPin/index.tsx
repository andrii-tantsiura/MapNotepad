import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";

import { PIN_GRAY_ICON, PIN_ICON } from "../../../../../assets/icons";
import { CustomButton, Typography } from "../../../../../components/common";
import { textStyle_i11, textStyle_i13 } from "../../../../../constants";
import { IPinItemModel } from "../../../../../types/components";
import styles from "./styles";

type FoundPinProps = {
  pin: IPinItemModel;
  onPress: (pin: IPinItemModel) => void;
};

export const FoundPin: FC<FoundPinProps> = React.memo(({ pin, onPress }) => {
  const imageSource = pin.isFavorite ? PIN_ICON : PIN_GRAY_ICON;

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(pin)}>
      <CustomButton imageSource={imageSource} />

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
