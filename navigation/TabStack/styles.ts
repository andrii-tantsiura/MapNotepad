import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import COLORS from "../../constants/colors";
import { FontSizes } from "../../constants/fontSizes";
import { FontWeights } from "../../constants/fontWeights";

const styles = StyleSheet.create({
  tabBarLabel: {
    ...FontSizes.i12,
    ...FontWeights.semiBold,
    color: COLORS.lightPrimary,
  },
  searchBarContainer: {
    marginTop: getStatusBarHeight(),
  },
});

export default styles;
