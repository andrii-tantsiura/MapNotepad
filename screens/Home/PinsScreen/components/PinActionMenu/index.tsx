import { FC } from "react";
import { View } from "react-native";

import { DELETE_ICON, EDIT_ICON } from "../../../../../assets/icons";
import { IconButton } from "../../../../../components/common";
import { scaleSize } from "../../../../../utils";
import styles from "./styles";

interface IPinActionMenuProps {
  onDelete: () => void;
  onEdit: () => void;
}

export const PIN_ACTION_MENU_WIDTH = scaleSize(112);

export const PinActionMenu: FC<IPinActionMenuProps> = ({
  onDelete,
  onEdit,
}) => (
  <View style={styles.hiddenActionMenu}>
    <IconButton
      style={[styles.hiddenButtonContainer, styles.hiddenDeleteButton]}
      imageSource={DELETE_ICON}
      onPress={onDelete}
    />

    <IconButton
      style={[styles.hiddenButtonContainer, styles.hiddenEditButton]}
      imageSource={EDIT_ICON}
      onPress={onEdit}
    />
  </View>
);
