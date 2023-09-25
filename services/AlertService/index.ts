import {
  MessageType,
  showMessage as showFlashMessage,
} from "react-native-flash-message";

import {
  ALERT_DISPLAY_DURATION_IN_MS,
  FlashMessageColors,
} from "../../constants";
import styles from "./styles";

const showMessage = (message: string, type: MessageType, duration: number) =>
  showFlashMessage({
    style: styles.container,
    titleStyle: styles.title,
    type,
    message,
    icon: type,
    position: "top",
    backgroundColor: FlashMessageColors[type],
    duration: duration,
  });

class AlertService {
  public info = (
    message: string,
    duration: number = ALERT_DISPLAY_DURATION_IN_MS
  ) => showMessage(message, "info", duration);

  public success = (
    message: string,
    duration: number = ALERT_DISPLAY_DURATION_IN_MS
  ) => showMessage(message, "success", duration);

  public warning = (
    message: string,
    duration: number = ALERT_DISPLAY_DURATION_IN_MS
  ) => showMessage(message, "warning", duration);

  public error(
    message: string,
    duration: number = ALERT_DISPLAY_DURATION_IN_MS
  ) {
    showMessage(message, "danger", duration);
  }
}

export default new AlertService();
