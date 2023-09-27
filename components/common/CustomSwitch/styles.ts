import { StyleSheet } from "react-native";

import { AppColors } from "../../../constants";
import { ShadowStyles } from "../../../constants/styles";
import { scaleSize } from "../../../utils";

const styles = StyleSheet.create({
  track: {
    height: scaleSize(22),
    width: scaleSize(36),
    padding: scaleSize(1),
    borderRadius: 13,
    backgroundColor: AppColors.systemLightGray,
  },

  thumb: {
    height: scaleSize(20),
    width: scaleSize(20),
    borderRadius: 50,
    backgroundColor: AppColors.systemWhite,
    ...ShadowStyles.shadow_i3,
  },
  thumbToggled: {
    alignSelf: "flex-end",
    backgroundColor: AppColors.lightPrimary,
  },
});

export default styles;
