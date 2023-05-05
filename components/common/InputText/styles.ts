import { StyleSheet } from "react-native";
import { FontSizes } from "../../../constants/fontSizes";
import { FontWeights } from "../../../constants/fontWeights";
import colors from "../../../constants/colors";

const styles = StyleSheet.create({
  inputTitle: {
    marginLeft: 12,
    marginBottom: 10,
    ...FontSizes.i12,
    ...FontWeights.medium,
    color: colors.systemDarkGray,
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: colors.systemLightGray,
  },
  input: {
    flex: 1,
    height: 48,
    ...FontSizes.i14,
    ...FontWeights.medium,
    color: colors.systemBlack,
  },
  inputError: {
    marginTop: 4,
    marginLeft: 12,
    marginBottom: 10,
    ...FontSizes.i10,
    ...FontWeights.medium,
    color: colors.lightError,
  },
  clear: {
    justifyContent: "center",
  },
  buttonsContainer: {
    marginLeft: 8,
    flexDirection: "row",
    columnGap: 4,
  },
});

export default styles;
