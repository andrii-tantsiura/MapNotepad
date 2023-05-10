import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../../constants/styles";
import COLORS from "../../../constants/colors";
import { SCALE_FACTOR } from "../../../constants/fontSizes";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 46 * SCALE_FACTOR,
    height: 46 * SCALE_FACTOR,
    borderRadius: 30,
    ...GlobalStyles.shadow_i2,
    backgroundColor: COLORS.systemWhite,
  },
});

export default styles;
