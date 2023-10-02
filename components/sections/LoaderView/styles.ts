import { StyleSheet } from "react-native";

import { AppPalette, ContainerStyles, FontSizes } from "../../../constants";
import { scaleSize } from "../../../utils";

const styles = StyleSheet.create({
  container: {
    ...ContainerStyles.i1,
    opacity: 0.8,
    padding: scaleSize(24),
  },
  message: {
    fontSize: FontSizes.i12,
    color: AppPalette.systemGray,
    marginBottom: scaleSize(10),
  },
});

export default styles;
