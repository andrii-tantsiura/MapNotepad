import {
  MessageType,
  showMessage as showFlashMessage,
} from "react-native-flash-message";

import { FLASH_MESSAGE_COLORS } from "../../constants/colors";
import styles from "./styles";

const showMessage = (message: string, type: MessageType) =>
  showFlashMessage({
    style: styles.container,
    titleStyle: styles.title,
    type,
    message,
    icon: type,
    position: "top",
    backgroundColor: FLASH_MESSAGE_COLORS[type],
  });

class Alerter {
  info = (message: string) => showMessage(message, "info");
  success = (message: string) => showMessage(message, "success");
  warning = (message: string) => showMessage(message, "warning");
  error = (message: string) => showMessage(message, "danger");
}

export default new Alerter();
