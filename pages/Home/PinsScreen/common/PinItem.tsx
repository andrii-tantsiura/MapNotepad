import { FC } from "react";
import { Image, View } from "react-native";
import {
  IconButton,
  Separator,
  Typography,
} from "../../../../components/common";
import { Pin } from "../../../../types/map";
import styles from "./styles";

const LIKE_BLUE_ICON = require("../../../../assets/icons/ic_like_blue.png");
const LIKE_GRAY_ICON = require("../../../../assets/icons/ic_like_gray.png");
const RIGHT_GRAY_ICON = require("../../../../assets/icons/ic_right_gray.png");

interface IPinItemProps {
  data: Pin;
}

export const PinItem: FC<IPinItemProps> = ({ data }) => {
  const favoriteIcon = data.isFavorite ? LIKE_BLUE_ICON : LIKE_GRAY_ICON;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <IconButton
            style={styles.likeButton}
            iconHeight={28}
            iconWidth={28}
            source={favoriteIcon}
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
        <Image style={styles.arrowIcon} source={RIGHT_GRAY_ICON} />
      </View>
      <Separator />
    </View>
  );
};
