import { StyleSheet } from "react-native";
import { fontSizes } from "../../../constants/sizes";
import { fontWeights } from "../../../constants/fontWeights";
import colors from "../../../constants/colors";

const styles = StyleSheet.create({
  inputTitle: {
    marginLeft: 12,
    marginBottom: 10,
    ...fontSizes.i12,
    ...fontWeights.medium,
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
    ...fontSizes.i14,
    ...fontWeights.medium,
    color: colors.systemBlack,
  },
  inputError: {
    marginTop: 4,
    marginLeft: 12,
    marginBottom: 10,
    ...fontSizes.i10,
    ...fontWeights.medium,
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
