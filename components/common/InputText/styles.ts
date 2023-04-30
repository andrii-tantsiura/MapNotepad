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
  input: {
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: colors.systemLightGray,
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
});

export default styles;
