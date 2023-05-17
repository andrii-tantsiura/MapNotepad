import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../../constants/styles";
import COLORS from "../../../constants/colors";
import { scaleSize } from "../../../utils/dimensions";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: scaleSize(46),
    height: scaleSize(46),
    borderRadius: 30,
    ...GlobalStyles.shadow_i2,
    backgroundColor: COLORS.systemWhite,
  },
});

export default styles;
