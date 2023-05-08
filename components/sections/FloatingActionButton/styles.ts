import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../../constants/styles";
import COLORS from "../../../constants/colors";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 52,
    height: 52,
    borderRadius: 30,
    ...GlobalStyles.shadow_i2,
    backgroundColor: COLORS.systemWhite,
  },
});

export default styles;
