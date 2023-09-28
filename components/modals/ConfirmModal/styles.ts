import { StyleSheet } from "react-native";

import { AppColors, ContainerStyles, ShadowStyles } from "../../../constants";
import { scaleSize } from "../../../utils";

const styles = StyleSheet.create({
  dialogContainer: {
    ...ContainerStyles.i1,
    backgroundColor: AppColors.systemDarkGray80,
  },
  contentContainer: {
    margin: scaleSize(24),
    paddingVertical: scaleSize(16),
    paddingHorizontal: scaleSize(20),
    rowGap: scaleSize(8),
    backgroundColor: AppColors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColors.background,
    ...ShadowStyles.shadow_i1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    columnGap: scaleSize(20),
    marginTop: scaleSize(8),
  },
  buttonContainer: {
    width: "50%",
  },
});

export default styles;
