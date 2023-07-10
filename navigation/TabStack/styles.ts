import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { AppColors } from "../../constants";

const styles = StyleSheet.create({
  tabBarLabel: {
    // ...FontSizes.i12,
    // ...FontWeights.semiBold,
    color: AppColors.lightPrimary,
  },
  searchBarContainer: {
    marginTop: getStatusBarHeight(),
  },
});

export default styles;
