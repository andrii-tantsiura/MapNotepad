import { FC } from "react";
import { View } from "react-native";

import { DELETE_ICON, EDIT_ICON } from "../../../../../assets/icons";
import { IconButton } from "../../../../../components/common";
import styles from "./styles";

interface IPinActionMenuProps {
  onDelete: () => void;
  onEdit: () => void;
}

export const PinActionMenu: FC<IPinActionMenuProps> = ({
  onDelete,
  onEdit,
}) => (
  <View style={styles.hiddenActionMenu}>
    <IconButton
      style={styles.hiddenDeleteButton}
      onPress={onDelete}
      source={DELETE_ICON}
    />

    <IconButton
      onPress={onEdit}
      style={styles.hiddenEditButton}
      source={EDIT_ICON}
    />
  </View>
);
