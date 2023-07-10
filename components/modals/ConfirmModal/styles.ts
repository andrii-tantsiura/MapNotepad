import { StyleSheet } from "react-native";

import { AppColors, ContainerStyles, ShadowStyles } from "../../../constants";

const styles = StyleSheet.create({
  dialogContainer: {
    ...ContainerStyles.fill_i1,
    backgroundColor: AppColors.systemDarkGray80,
  },
  contentContainer: {
    margin: 32,
    paddingVertical: 16,
    paddingHorizontal: 24,
    rowGap: 10,
    backgroundColor: AppColors.systemWhite,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColors.systemLightGray,
    ...ShadowStyles.shadow_i1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    columnGap: 24,
    marginTop: 16,
  },
  buttonContainer: {
    width: "50%",
  },
});

export default styles;
