import { StyleSheet } from "react-native";
import colors from "../../../constants/colors";

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: colors.lightPrimary,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default styles;
