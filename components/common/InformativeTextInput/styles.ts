import { StyleSheet } from "react-native";

import { scaleSize } from "../../../utils";

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: scaleSize(12),
    marginBottom: scaleSize(7),
  },
  errorText: {
    minHeight: scaleSize(15),
    marginHorizontal: scaleSize(12),
    marginTop: scaleSize(2),
  },
});

export default styles;
