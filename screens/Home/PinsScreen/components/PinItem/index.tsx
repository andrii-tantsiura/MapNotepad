import { FC } from "react";
import { Image, Pressable, View } from "react-native";

import {
  LIKE_BLUE_ICON,
  LIKE_GRAY_ICON,
  RIGHT_GRAY_ICON,
} from "../../../../../assets/icons";
import { CustomButton, Typography } from "../../../../../components/common";
import { Separator } from "../../../../../components/sections";
import {
  ImageStyles,
  textStyle_i11,
  textStyle_i9,
} from "../../../../../constants";
import { IPinItemModel } from "../../../../../types/components";
import styles from "./styles";

interface IPinItemProps {
  pin: IPinItemModel;
  onPress: (pin: IPinItemModel) => void;
  onPressFavoriteStatus: (pin: IPinItemModel) => void;
}

export const PinItem: FC<IPinItemProps> = ({
  pin,
  onPress,
  onPressFavoriteStatus,
}) => {
  const favoriteStatusIcon = pin.isFavorite ? LIKE_BLUE_ICON : LIKE_GRAY_ICON;

  const changeFavoriteStatusHandler = () => onPressFavoriteStatus(pin);

  return (
    <Pressable style={styles.container} onPress={() => onPress(pin)}>
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <CustomButton
            containerStyle={styles.likeButton}
            imageSource={favoriteStatusIcon}
            onPress={changeFavoriteStatusHandler}
          />

          <View style={styles.textLinesContainer}>
            <Typography style={textStyle_i9}>{pin.label}</Typography>

            <Typography style={textStyle_i11}>
              {pin.location.latitude}
              {", "}
              {pin.location.longitude}
            </Typography>
          </View>
        </View>

        <Image style={ImageStyles.i1} source={RIGHT_GRAY_ICON} />
      </View>

      <Separator />
    </Pressable>
  );
};