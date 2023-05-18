import { FC } from "react";
import { Modal, View } from "react-native";
import { CustomButton, Typography } from "../../common";
import styles from "./styles";
import { ComponentStyles } from "../../../constants/styles";

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
        <Typography weight="semiBold" size="i12" color="systemBlack">
          {title}
        </Typography>

        <Typography size="i12" color="systemBlack">
          {description}
        </Typography>

        <View style={styles.buttonsContainer}>
          <CustomButton
            style={[ComponentStyles.buttonOutline_i1, styles.button]}
            size="i12"
            color="lightPrimary"
            onPress={onCancel}
          >
            {cancelText}
          </CustomButton>

          <CustomButton size="i12" style={styles.button} onPress={onConfirm}>
            {confirmText}
          </CustomButton>
        </View>
      </View>
    </View>
  </Modal>
);
