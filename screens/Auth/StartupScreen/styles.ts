import { StyleSheet } from "react-native";

import { scaleSize } from "../../../utils";
import { ContainerStyles } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: scaleSize(150),
    width: "100%",
  },
  logoContainer: {
    ...ContainerStyles.fill_i1,
    rowGap: 16,
  },
  buttonsContainer: {
    rowGap: 18,
    marginHorizontal: 16,
    marginVertical: 32,
  },
});

export default styles;
