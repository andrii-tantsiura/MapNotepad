import { StyleSheet } from "react-native";

import { scaleSize } from "../../../utils";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
  },
  text: {
    marginHorizontal: scaleSize(2),
  },
  line: {
    flex: 1,
    height: 1,
  },
});

export default styles;
