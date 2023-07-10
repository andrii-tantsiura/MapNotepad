import { FC } from "react";
import { Image, Text, View } from "react-native";

import {
  LIKE_BLUE_ICON,
  LIKE_GRAY_ICON,
  RIGHT_GRAY_ICON,
} from "../../../../../assets/icons";
import { IconButton } from "../../../../../components/common";
import { Separator } from "../../../../../components/sections";
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
          <IconButton
            style={styles.likeButton}
            source={favoriteStatusIcon}
            onPress={onPressFavoriteStatus}
          />

          <View style={styles.textLinesContainer}>
            {/* <Typography color="systemBlack">{data.label}</Typography> */}
            <Text>{data.label}</Text>
            <Text>{data.label}</Text>

            {/* <Typography weight="regular" size="i12" color="systemDarkGray">
              {data.location.latitude}
              {", "}
              {data.location.longitude}
            </Typography> */}
            <Text>
              {data.location.latitude}
              {", "}
              {data.location.longitude}
            </Text>
          </View>
        </View>

        <Image style={ImageStyles.image_i1} source={RIGHT_GRAY_ICON} />
      </View>

      <Separator />
    </View>
  );
};
