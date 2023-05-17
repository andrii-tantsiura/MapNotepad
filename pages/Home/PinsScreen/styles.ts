import { StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyListContainer: { flex: 1 },
  addPinButton: {
    bottom: 0,
    right: 0,
    marginRight: 16,
    marginBottom: 18,
    backgroundColor: COLORS.lightPrimary,
  },
});

export default styles;
