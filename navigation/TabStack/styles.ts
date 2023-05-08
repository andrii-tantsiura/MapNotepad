import { StyleSheet } from "react-native";
import { FontSizes } from "../../constants/fontSizes";
import { FontWeights } from "../../constants/fontWeights";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  tabBarIcon: { height: 24, width: 24 },
  tabBarLabel: {
    ...FontSizes.i12,
    ...FontWeights.semiBold,
    color: COLORS.lightPrimary,
  },
});

export default styles;
