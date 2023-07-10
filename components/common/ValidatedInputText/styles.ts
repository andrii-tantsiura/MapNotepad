import { StyleSheet } from "react-native";

import { AppColors } from "../../../constants";
import { scaleSize } from "../../../utils";

const styles = StyleSheet.create({
  titleLabel: {
    marginLeft: 12,
    marginBottom: 10,
    // ...FontSizes.i12,
    // ...FontWeights.medium,
    color: AppColors.systemDarkGray,
  },
  inputContainer: {
    flexDirection: "row",
    paddingRight: 12,
    height: scaleSize(40),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: AppColors.systemLightGray,
  },
  errorInputContainer: {
    borderColor: AppColors.lightError,
  },
  input: {
    flex: 1,
    paddingLeft: 12,
    height: scaleSize(40),
    // ...FontSizes.i14,
    // ...FontWeights.medium,
    color: AppColors.systemBlack,
  },
  errorLabel: {
    marginTop: 4,
    marginLeft: 12,
    marginBottom: 5,
    // ...FontSizes.i10,
    // ...FontWeights.medium,
    color: AppColors.lightError,
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
