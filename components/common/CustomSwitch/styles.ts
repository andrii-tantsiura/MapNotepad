import { StyleSheet } from "react-native";

import { AppPalette } from "../../../constants";
import { ShadowStyles } from "../../../constants/styles";

const styles = StyleSheet.create({
  container: {
    width: 36,
    height: 22,
    borderRadius: 30,
    justifyContent: "center",
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 30,
    backgroundColor: AppPalette.systemWhite,
    ...ShadowStyles.shadow_i3,
  },
});

export default styles;
