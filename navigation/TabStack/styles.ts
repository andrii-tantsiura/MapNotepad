import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { FontSizes } from "../../constants/fontSizes";
import { FontWeights } from "../../constants/fontWeights";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  tabBarIcon: { height: 29, width: 29 },
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
