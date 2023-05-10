import { StyleSheet } from "react-native";
import { SCALE_FACTOR } from "../../../constants/fontSizes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: { height: 150 * SCALE_FACTOR, width: "100%" },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 16,
  },
  buttonsContainer: {
    rowGap: 18,
    marginHorizontal: 16,
    marginVertical: 32,
  },
});

export default styles;
