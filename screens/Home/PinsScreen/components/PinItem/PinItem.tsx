import { FC } from "react";
import { Image, View } from "react-native";

import {
  LIKE_BLUE_ICON,
  LIKE_GRAY_ICON,
  RIGHT_GRAY_ICON,
} from "../../../../../assets/icons";
import { CustomButton, Typography } from "../../../../../components/common";
import { Separator } from "../../../../../components/sections";
import { textStyle_i11, textStyle_i9 } from "../../../../../constants";
import { ImageStyles } from "../../../../../constants/globalStyles";
import { Pin } from "../../../../../types/map";
import styles from "./styles";

interface IPinItemProps {
  data: Pin;
  onPressFavoriteStatus: () => void;
}

export const PinItem: FC<IPinItemProps> = ({ data, onPressFavoriteStatus }) => {
  const favoriteStatusIcon = data.isFavorite ? LIKE_BLUE_ICON : LIKE_GRAY_ICON;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <CustomButton
            containerStyle={styles.likeButton}
            imageSource={favoriteStatusIcon}
            onPress={onPressFavoriteStatus}
          />

          <View style={styles.textLinesContainer}>
            <Typography style={textStyle_i9}>{data.label}</Typography>

            <Typography style={textStyle_i11}>
              {data.location.latitude}
              {", "}
              {data.location.longitude}
            </Typography>
          </View>
        </View>

        <Image style={ImageStyles.image_i1} source={RIGHT_GRAY_ICON} />
      </View>

      <Separator />
    </View>
  );
};
