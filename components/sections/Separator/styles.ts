import { StyleSheet } from "react-native";

import { AppColors } from "../../../constants";
import { scaleSize } from "../../../utils";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginHorizontal: scaleSize(2),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: AppColors.systemLightGray,
  },
});

export default styles;
