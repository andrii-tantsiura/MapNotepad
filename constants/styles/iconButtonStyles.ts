import { StyleSheet } from "react-native";
import { scaleSize } from "../../utils";

export const globalIconButtonStyles = StyleSheet.create({
  outline: {
    justifyContent: "center",
    alignItems: "center",
    height: scaleSize(40),
    borderWidth: 1,
    borderRadius: 2,
  },
  floating: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: scaleSize(46),
    height: scaleSize(46),
    borderRadius: 30,
    marginRight: 16,
    marginBottom: 18,
  },
});
