import { StyleSheet } from "react-native";
import { FontSizes, SCALE_FACTOR } from "../../../constants/fontSizes";
import { FontWeights } from "../../../constants/fontWeights";
import COLORS from "../../../constants/colors";

const styles = StyleSheet.create({
  titleLabel: {
    marginLeft: 12,
    marginBottom: 10,
    ...FontSizes.i12,
    ...FontWeights.medium,
    color: COLORS.systemDarkGray,
  },
  inputContainer: {
    flexDirection: "row",
    paddingRight: 12,
    height: 40 * SCALE_FACTOR,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: COLORS.systemLightGray,
  },
  errorInputContainer: {
    borderColor: COLORS.lightError,
  },
  input: {
    flex: 1,
    paddingLeft: 12,
    height: 40 * SCALE_FACTOR,
    ...FontSizes.i14,
    ...FontWeights.medium,
    color: COLORS.systemBlack,
  },
  errorLabel: {
    marginTop: 4,
    marginLeft: 12,
    marginBottom: 5,
    ...FontSizes.i10,
    ...FontWeights.medium,
    color: COLORS.lightError,
  },
  buttonsContainer: {
    marginLeft: 8,
    flexDirection: "row",
    columnGap: 4,
  },
  button: {
    justifyContent: "center",
  },
});

export default styles;
