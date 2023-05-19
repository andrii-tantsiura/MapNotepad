import { StyleSheet } from "react-native";

import COLORS from "../../../constants/colors";

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  disabled: {
    backgroundColor: COLORS.lightDisabled,
  },
});

export default styles;
