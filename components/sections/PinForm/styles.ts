import { StyleSheet } from "react-native";
import { scaleSize } from "../../../utils";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaleSize(16),
    paddingTop: scaleSize(8),
    paddingBottom: scaleSize(4),
    rowGap: scaleSize(4),
  },
  coordinatesContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  coordinateContainer: {
    width: "49%",
  },
});

export default styles;
