import { FC } from "react";
import { Modal, Pressable, View } from "react-native";

import { textStyle_i12, textStyle_i14, textStyle_i6 } from "../../../constants";
import { formatCoordinate } from "../../../helpers";
import { useAppTheme } from "../../../hooks";
import { IPinModel } from "../../../types/models";
import { Typography } from "../../common";
import { Separator } from "../Separator";
import styles from "./styles";

type PinDetailsProps = {
  pin: IPinModel;
  onClose: () => void;
};

export const PinDetailsModal: FC<PinDetailsProps> = ({ pin, onClose }) => {
  const { getColorStyle } = useAppTheme();

  return (
    <Modal
      hardwareAccelerated
      statusBarTranslucent
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Pressable style={styles.foreground} onPress={onClose} />

        <View
          style={[styles.content, getColorStyle("background", "background")]}
        >
          <View style={styles.header}>
            <Typography style={textStyle_i6}>{pin.label}</Typography>

            <Typography style={textStyle_i12}>
              {formatCoordinate(pin.location)}
            </Typography>
          </View>

          {Boolean(pin.description) && (
            <>
              <Separator />
              <Typography style={textStyle_i14}>{pin.description}</Typography>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};
