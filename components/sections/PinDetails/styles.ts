import { StyleSheet } from "react-native";

import { scaleSize } from "../../../utils";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  foreground: {
    flex: 1,
  },
  content: {
    borderTopLeftRadius: scaleSize(8),
    borderTopRightRadius: scaleSize(8),
    paddingHorizontal: scaleSize(16),
    paddingTop: scaleSize(16),
    paddingBottom: scaleSize(24),
    rowGap: scaleSize(16),
  },
  header: { rowGap: 4 },
});

export default styles;
