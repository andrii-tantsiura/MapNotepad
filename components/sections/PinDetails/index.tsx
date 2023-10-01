import { FC } from "react";
import { Modal, Pressable, View } from "react-native";

import { textStyle_i12, textStyle_i14, textStyle_i6 } from "../../../constants";
import { formatCoordinate } from "../../../helpers";
import { IPinModel } from "../../../types/models";
import { Box, Typography } from "../../common";
import { Separator } from "../Separator";
import styles from "./styles";

type PinDetailsProps = {
  pin: IPinModel;
  onClose: () => void;
};

export const PinDetailsModal: FC<PinDetailsProps> = ({ pin, onClose }) => (
  <Modal
    hardwareAccelerated
    statusBarTranslucent
    animationType="slide"
    transparent
    onRequestClose={onClose}
  >
    <View style={styles.container}>
      <Pressable style={styles.foreground} onPress={onClose} />

      <Box backgroundColor="background" style={styles.content}>
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
      </Box>
    </View>
  </Modal>
);
