import { StyleSheet } from "react-native";

import { scaleSize } from "../../utils";

export const CustomButtonStyles = StyleSheet.create({
  base: {
    height: scaleSize(40),
    borderWidth: 1,
    borderRadius: 3,
  },
});
