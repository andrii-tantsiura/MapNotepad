import { StyleSheet } from "react-native";

import { AppColors } from "../../../constants";
import { scaleSize } from "../../../utils";

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
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: AppColors.lightVariant,
    backgroundColor: AppColors.lightVariant,
  },
});
export default styles;
