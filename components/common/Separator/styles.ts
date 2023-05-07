import { StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";

const styles = StyleSheet.create({
  separator: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 2,
  },
  line: {
    flex: 1,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.systemLightGray,
  },
});

export default styles;
