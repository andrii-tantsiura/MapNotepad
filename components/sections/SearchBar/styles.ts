import { StyleSheet } from "react-native";

import { scaleSize } from "../../../utils";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scaleSize(16),
    paddingTop: 12,
    columnGap: 12,
    paddingBottom: 9,
  },
  input: {
    flex: 1,
    paddingVertical: 3,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingLeft: 16,
    paddingRight: 8,
    borderRadius: 4,
    borderWidth: 1,
  },
});
export default styles;
