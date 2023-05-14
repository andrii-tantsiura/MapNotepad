import { FC } from "react";
import { Image, View } from "react-native";
import {
  IconButton,
  Separator,
  Typography,
} from "../../../../components/common";
import { Pin } from "../../../../types/map";
import styles from "./styles";
import { GlobalStyles } from "../../../../constants/styles";

const LIKE_BLUE_ICON = require("../../../../assets/icons/ic_like_blue.png");
const LIKE_GRAY_ICON = require("../../../../assets/icons/ic_like_gray.png");
const RIGHT_GRAY_ICON = require("../../../../assets/icons/ic_right_gray.png");

interface IPinItemProps {
  data: Pin;
  onPressFavoriteStatus: () => void;
}

export const PinItem: FC<IPinItemProps> = ({ data, onPressFavoriteStatus }) => {
  const favoriteIcon = data.isFavorite ? LIKE_BLUE_ICON : LIKE_GRAY_ICON;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <IconButton
            style={styles.likeButton}
            source={favoriteIcon}
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
        <Image style={GlobalStyles.image_i1} source={RIGHT_GRAY_ICON} />
      </View>
      <Separator />
    </View>
  );
};
