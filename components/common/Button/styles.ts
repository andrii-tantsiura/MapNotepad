import { StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: COLORS.lightPrimary,
  },
  pressed: {
    opacity: 0.75,
  },
  disabled: {
    backgroundColor: COLORS.lightDisabled,
  },
});

export default styles;
