import {
  MessageType,
  showMessage as showFlashMessage,
} from "react-native-flash-message";

import { FlashMessageColors } from "../../constants";
import styles from "./styles";
import { AOResult } from "../../helpers/AOResult";

const showMessage = (message: string, type: MessageType) =>
  showFlashMessage({
    style: styles.container,
    titleStyle: styles.title,
    type,
    message,
    icon: type,
    position: "top",
    backgroundColor: FlashMessageColors[type],
  });

class Alerter {
  info = (message: string) => showMessage(message, "info");
  success = (message: string) => showMessage(message, "success");
  warning = (message: string) => showMessage(message, "warning");
  error(message: string): void;
  error(message: AOResult<any>): void;
  error(message?: any) {
    const text: string =
      message instanceof AOResult ? message.getMessage() : message;

    showMessage(text, "danger");
  }
}

export default new Alerter();
