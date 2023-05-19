import { FC } from "react";
import { Image, View } from "react-native";
import { IconButton, Typography } from "../../../../components/common";
import { Pin } from "../../../../types/map";
import styles from "./styles";
import { ImageStyles } from "../../../../constants/globalStyles";
import { Separator } from "../../../../components/sections";

import LIKE_BLUE_ICON from "../../../../assets/icons/ic_like_blue.png";
import LIKE_GRAY_ICON from "../../../../assets/icons/ic_like_gray.png";
import RIGHT_GRAY_ICON from "../../../../assets/icons/ic_right_gray.png";

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
          <IconButton
            style={styles.likeButton}
            source={favoriteStatusIcon}
            onPress={onPressFavoriteStatus}
          />

          <View style={styles.textLinesContainer}>
            <Typography color="systemBlack">{data.label}</Typography>

            <Typography weight="regular" size="i12" color="systemDarkGray">
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
