import { FC } from "react";
import { Modal, View } from "react-native";

import {
  CustomButtonStyles,
  textStyle_i4,
  textStyle_i5,
  textStyle_i6,
  textStyle_i9,
} from "../../../constants";
import { useAppTheme } from "../../../hooks";
import { Box, CustomButton, Typography } from "../../common";
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
}) => {
  const { getColorStyle } = useAppTheme();

  return (
    <Modal
      visible={visible}
      hardwareAccelerated
      statusBarTranslucent
      animationType="fade"
      transparent
    >
      <View style={styles.dialogContainer}>
        <Box
          backgroundColor="variant"
          borderColor="variant"
          style={styles.contentContainer}
        >
          <Typography style={textStyle_i6}>{title}</Typography>

          <Typography style={textStyle_i9}>{description}</Typography>

          <View style={styles.buttonsContainer}>
            <CustomButton
              style={[
                CustomButtonStyles.base,
                {
                  width: "50%",
                },
                getColorStyle("border", "primary"),
              ]}
              textStyle={textStyle_i5}
              onPress={onCancel}
            >
              {cancelText}
            </CustomButton>

            <CustomButton
              style={[
                CustomButtonStyles.base,
                {
                  width: "50%",
                },
                getColorStyle("background", "primary"),
              ]}
              textStyle={textStyle_i4}
              onPress={onConfirm}
            >
              {confirmText}
            </CustomButton>
          </View>
        </Box>
      </View>
    </Modal>
  );
};
