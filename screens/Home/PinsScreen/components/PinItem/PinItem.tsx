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
import { IPinItemViewModel } from "../../../../../types/viewModels";
import styles from "./styles";

interface IPinItemProps {
  pin: IPinItemViewModel;
  onPress: (pin: IPinItemViewModel) => void;
  onPressFavoriteStatus: (pin: IPinItemViewModel) => void;
}

export const PinItem: FC<IPinItemProps> = ({
  pin,
  onPress,
  onPressFavoriteStatus,
}) => {
  const favoriteStatusIcon = pin.isFavorite ? LIKE_BLUE_ICON : LIKE_GRAY_ICON;

  return (
    <Pressable style={styles.container} onPress={() => onPress(pin)}>
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <CustomButton
            containerStyle={styles.likeButton}
            imageSource={favoriteStatusIcon}
            onPress={() => onPressFavoriteStatus(pin)}
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
