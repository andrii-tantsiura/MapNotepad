import { StyleSheet } from "react-native";
import { scaleSize } from "../../../utils/dimensions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: scaleSize(150),
    width: "100%",
  },
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
