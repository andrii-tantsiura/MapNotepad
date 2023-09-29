import { StyleSheet } from "react-native";

import { scaleSize } from "../../../utils";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: scaleSize(16),
    paddingRight: scaleSize(17),
    height: scaleSize(58),
  },
});

export default styles;
