import { StyleSheet } from "react-native";
import { FontSizes } from "../../../constants/fontSizes";
import { FontWeights } from "../../../constants/fontWeights";
import COLORS from "../../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    marginHorizontal: 12,
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
