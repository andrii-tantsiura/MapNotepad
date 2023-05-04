import {
  MessageType,
  showMessage as showFlashMessage,
} from "react-native-flash-message";
import styles from "./styles";
import { flashMessageColors } from "../../constants/colors";

const showMessage = (message: string, type: MessageType) =>
  showFlashMessage({
    style: styles.container,
    titleStyle: styles.title,
    type,
    message,
    icon: type,
    position: "top",
    hideStatusBar: true,
    backgroundColor: flashMessageColors[type],
  });

class Alerter {
  info = (message: string) => showMessage(message, "info");
  success = (message: string) => showMessage(message, "success");
  warning = (message: string) => showMessage(message, "warning");
  error = (message: string) => showMessage(message, "danger");
}

export default new Alerter();
