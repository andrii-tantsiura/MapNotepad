import { StyleSheet } from "react-native";

import COLORS from "../../../constants/colors";
import { ContainerStyles, ShadowStyles } from "../../../constants/globalStyles";

const styles = StyleSheet.create({
  dialogContainer: {
    ...ContainerStyles.fill_i1,
    backgroundColor: COLORS.systemDarkGray80,
  },
  contentContainer: {
    margin: 32,
    paddingVertical: 16,
    paddingHorizontal: 24,
    rowGap: 10,
    backgroundColor: COLORS.systemWhite,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.systemLightGray,
    ...ShadowStyles.shadow_i1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    columnGap: 24,
    marginTop: 16,
  },
  leftButton: {
    // ...CustomButtonStyles.outline_i1,
    width: "50%",
  },
  rightButton: {
    // ...CustomButtonStyles.regular_i1,
    width: "50%",
  },
});

export default styles;
