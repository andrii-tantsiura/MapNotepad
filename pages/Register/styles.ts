import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  inputsContainer: {
    rowGap: 4,
  },
  buttonsContainer: {
    marginTop: 24,
    rowGap: 16,
  },
  googleButton: {
    alignItems: "center",
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.systemLightGray,
  },
});

export default styles;
