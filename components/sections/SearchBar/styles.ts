import { StyleSheet } from "react-native";

import COLORS from "../../../constants/colors";
import { scaleSize } from "../../../utils/dimensions";
import { FontSizes, FontWeights } from "../../../constants/typography";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scaleSize(16),
    paddingTop: 12,
    paddingBottom: 9,
  },
  input: {
    flex: 1,
    marginHorizontal: scaleSize(12),
    paddingLeft: 16,
    ...FontSizes.i12,
    ...FontWeights.regular,
    color: COLORS.systemGray,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.lightVariant,
    backgroundColor: COLORS.lightVariant,
  },
});
export default styles;
