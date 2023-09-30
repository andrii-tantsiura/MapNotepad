import { StyleSheet } from "react-native";

import { AppPalette, ContainerStyles, ShadowStyles } from "../../../constants";
import { scaleSize } from "../../../utils";

const styles = StyleSheet.create({
  dialogContainer: {
    ...ContainerStyles.i1,
    backgroundColor: AppPalette.systemDarkGray80,
  },
  contentContainer: {
    margin: scaleSize(24),
    paddingVertical: scaleSize(16),
    paddingHorizontal: scaleSize(20),
    rowGap: scaleSize(8),
    borderRadius: 8,
    borderWidth: 1,
    ...ShadowStyles.shadow_i1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    columnGap: scaleSize(20),
    marginTop: scaleSize(8),
  },
});

export default styles;
