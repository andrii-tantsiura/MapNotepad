import { FC } from "react";
import { Modal, Text, View } from "react-native";

import { CustomButton } from "../../common";
import styles from "./styles";

interface IConfirmModalProps {
  visible: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: FC<IConfirmModalProps> = ({
  visible = false,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => (
  <Modal
    visible={visible}
    hardwareAccelerated
    statusBarTranslucent
    animationType="fade"
    transparent
  >
    <View style={styles.dialogContainer}>
      <View style={styles.contentContainer}>
        {/* <Typography weight="semiBold" size="i12" color="systemBlack">
          {title}
        </Typography> */}
        <Text>{title}</Text>
        <Text>{description}</Text>
        {/* <Typography size="i12" color="systemBlack">
          {description}
        </Typography> */}

        <View style={styles.buttonsContainer}>
          <CustomButton
            style={styles.leftButton}
            // size="i12"
            // color="lightPrimary"
            onPress={onCancel}
          >
            {cancelText}
          </CustomButton>

          <CustomButton
            // size="i12"
            style={styles.rightButton}
            onPress={onConfirm}
          >
            {confirmText}
          </CustomButton>
        </View>
      </View>
    </View>
  </Modal>
);
