import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.systemWhite,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 16,
  },
  buttonsContainer: {
    rowGap: 16,
    margin: 16,
  },
  loginButton: {
    borderWidth: 2,
    borderColor: colors.lightPrimary,
    backgroundColor: colors.systemWhite,
  },
});

export default styles;
