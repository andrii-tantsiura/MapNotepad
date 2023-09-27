import { StyleSheet } from "react-native";

import { textStyle_i14 } from "../../../constants";
import { scaleSize } from "../../../utils";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: scaleSize(16),
    paddingRight: scaleSize(17),
    height: scaleSize(58),
  },
  optionTitle: {
    ...textStyle_i14,
  },
});

export default styles;
