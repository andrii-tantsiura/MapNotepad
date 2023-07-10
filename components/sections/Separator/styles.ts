import { StyleSheet } from "react-native";

import { AppColors } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 2,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: AppColors.lightVariant,
  },
});

export default styles;
