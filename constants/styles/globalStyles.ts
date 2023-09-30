import { StyleSheet } from "react-native";

import { scaleSize } from "../../utils";
import { AppPalette } from "../themes";

export const ShadowStyles = StyleSheet.create({
  shadow_i1: {
    elevation: 5,
    shadowColor: AppPalette.systemBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  shadow_i2: {
    elevation: 6,
    shadowColor: AppPalette.systemBlack,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  shadow_i3: {
    elevation: 5,
    shadowColor: AppPalette.systemBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});

export const ContainerStyles = StyleSheet.create({
  i1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const ImageStyles = StyleSheet.create({
  i1: {
    height: scaleSize(24),
    width: scaleSize(24),
  },
  i2: {
    height: scaleSize(20),
    width: scaleSize(20),
  },
});
