import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";

import { PIN_GRAY_ICON } from "../../../../../assets/icons";
import { CustomButton, Typography } from "../../../../../components/common";
import { Separator } from "../../../../../components/sections";
import { textStyle_i11, textStyle_i13 } from "../../../../../constants";
import { IPinItemViewModel } from "../../../../../types/viewModels";
import styles from "./styles";

type FoundPinProps = {
  pin: IPinItemViewModel;
  isLastItem: boolean;
  onPinHeightChanged: (pinHeight: number) => void;
  onPinPressed: (pin: IPinItemViewModel) => void;
};

export const FoundPin: FC<FoundPinProps> = React.memo(
  ({ pin, isLastItem, onPinHeightChanged, onPinPressed }) => (
    <TouchableOpacity
      onPress={() => onPinPressed(pin)}
      onLayout={({ nativeEvent: { layout } }) => {
        onPinHeightChanged(layout.height);
      }}
    >
      <View style={styles.pinContent}>
        <CustomButton imageSource={PIN_GRAY_ICON} />

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
      </View>

      {!isLastItem && <Separator />}
    </TouchableOpacity>
  )
);
