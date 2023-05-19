import { StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";
import { IconButtonStyles } from "../../../constants/globalStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyListContainer: { flex: 1 },
  addPinButton: {
    ...IconButtonStyles.float_i1,
    backgroundColor: COLORS.lightPrimary,
  },
});

export default styles;
