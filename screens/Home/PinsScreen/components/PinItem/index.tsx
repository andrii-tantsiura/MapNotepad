import React, { FC, useCallback } from "react";
import { Image, Pressable, View } from "react-native";

import {
  DELETE_ICON,
  DOWN_ICON,
  EDIT_ICON,
  LIKE_BLUE_ICON,
} from "../../../../../assets/icons";
import {
  ContextMenu,
  ContextMenuOption,
  IconButton,
  Typography,
} from "../../../../../components/common";
import { Separator } from "../../../../../components/sections";
import {
  ImageSizes,
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
  onDelete: (pin: IPinItemModel) => void;
  onEdit: (pin: IPinItemModel) => void;
}

export const PinItem: FC<IPinItemProps> = React.memo(
  ({ pin, onPress, onPressFavoriteStatus, onDelete, onEdit }) => {
    const { appColors } = useAppTheme();

    const changeFavoriteStatusHandler = useCallback(
      () => onPressFavoriteStatus(pin),
      [pin]
    );

    const contextMenuOptions: ContextMenuOption[] = [
      {
        text: "Edit",
        imageSource: EDIT_ICON,
        onPress: () => onEdit(pin),
      },
      {
        text: "Delete",
        imageSource: DELETE_ICON,
        onPress: () => onDelete(pin),
      },
    ];

    return (
      <Pressable
        style={[styles.container, { backgroundColor: appColors.background }]}
        onPress={() => onPress(pin)}
      >
        <View style={styles.content}>
          <View style={styles.infoContainer}>
            <IconButton
              style={styles.likeButton}
              backgroundColor="variant"
              tintColor={pin.isFavorite ? "primary" : "systemGray"}
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

          <ContextMenu
            offsetX={-55}
            offsetY={-5}
            triggerComponent={
              <Image
                style={[ImageSizes.medium, styles.contextMenuTrigger]}
                source={DOWN_ICON}
              />
            }
            items={contextMenuOptions}
          />
        </View>

        <Separator />
      </Pressable>
    );
  }
);
