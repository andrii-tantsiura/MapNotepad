import { StyleSheet } from "react-native";

import COLORS from "../../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 2,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.lightVariant,
  },
});

export default styles;
