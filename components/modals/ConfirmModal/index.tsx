import { FC } from "react";
import { Modal, View } from "react-native";

import { textStyle_i6, textStyle_i9 } from "../../../constants";
import { CustomButtonStyles } from "../../../constants/globalStyles";
import { CustomButton, Typography } from "../../common";
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
        <Typography style={textStyle_i6}>{title}</Typography>

        <Typography style={textStyle_i9}>{description}</Typography>

        <View style={styles.buttonsContainer}>
          <CustomButton
            style={CustomButtonStyles.outline_i1}
            containerStyle={styles.leftButton}
            onPress={onCancel}
          >
            {cancelText}
          </CustomButton>

          <CustomButton
            style={CustomButtonStyles.simple_i1}
            containerStyle={styles.leftButton}
            onPress={onConfirm}
          >
            {confirmText}
          </CustomButton>
        </View>
      </View>
    </View>
  </Modal>
);
