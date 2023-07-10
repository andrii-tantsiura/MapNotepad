import { FC } from "react";
import { View } from "react-native";

import { DELETE_ICON, EDIT_ICON } from "../../../../../assets/icons";
import { CustomButton } from "../../../../../components/common";
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
    <CustomButton
      containerStyle={styles.hiddenDeleteButton}
      imageSource={DELETE_ICON}
      onPress={onDelete}
    />

    <CustomButton
      containerStyle={styles.hiddenEditButton}
      imageSource={EDIT_ICON}
      onPress={onEdit}
    />
  </View>
);
