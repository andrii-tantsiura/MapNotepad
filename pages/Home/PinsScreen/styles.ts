import { StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";
import { ComponentStyles } from "../../../constants/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyListContainer: { flex: 1 },
  addPinButton: {
    ...ComponentStyles.floatIconButton_i1,
    backgroundColor: COLORS.lightPrimary,
  },
});

export default styles;
