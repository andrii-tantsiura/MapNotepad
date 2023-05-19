import { StyleSheet } from "react-native";

import COLORS from "../../../constants/colors";
import { CommonStyles } from "../../../constants/styles";

const styles = StyleSheet.create({
  dialogContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    ...CommonStyles.shadow_i1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    columnGap: 24,
    marginTop: 16,
  },
  button: {
    width: "50%",
    height: 40,
    borderRadius: 4,
  },
});

export default styles;
