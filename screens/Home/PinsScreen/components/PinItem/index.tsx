import React, { FC } from "react";
import { Image, Pressable, View } from "react-native";

import { LIKE_BLUE_ICON, RIGHT_GRAY_ICON } from "../../../../../assets/icons";
import { IconButton, Typography } from "../../../../../components/common";
import { Separator } from "../../../../../components/sections";
import {
  ImageStyles,
  textStyle_i11,
  textStyle_i9,
} from "../../../../../constants";
import { formatCoordinate } from "../../../../../helpers";
import { useAppTheme } from "../../../../../hooks";
import { IPinItemModel } from "../../../../../types/components";
import styles from "./styles";

interface IPinItemProps {
  pin: IPinItemModel;
  onPress: (pin: IPinItemModel) => void;
  onPressFavoriteStatus: (pin: IPinItemModel) => void;
}

export const PinItem: FC<IPinItemProps> = React.memo(
  ({ pin, onPress, onPressFavoriteStatus }) => {
    const { appColors } = useAppTheme();

    const changeFavoriteStatusHandler = () => onPressFavoriteStatus(pin);

    return (
      <Pressable
        style={[styles.container, { backgroundColor: appColors.background }]}
        onPress={() => onPress(pin)}
      >
        <View style={styles.content}>
          <View style={styles.infoContainer}>
            <IconButton
              style={[
                styles.likeButton,
                { backgroundColor: appColors.variant },
              ]}
              imageStyle={{
                tintColor: pin.isFavorite
                  ? appColors.primary
                  : appColors.systemGray,
              }}
              imageSource={LIKE_BLUE_ICON}
              onPress={changeFavoriteStatusHandler}
            />

            <View style={styles.textLinesContainer}>
              <Typography style={textStyle_i9}>{pin.label}</Typography>

              <Typography style={textStyle_i11}>
                {formatCoordinate(pin.location)}
              </Typography>
            </View>
          </View>

          <Image style={ImageStyles.i1} source={RIGHT_GRAY_ICON} />
        </View>

        <Separator />
      </Pressable>
    );
  }
);
