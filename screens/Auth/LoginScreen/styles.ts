import { StyleSheet } from "react-native";

import { scaleSize } from "../../../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  inputsContainer: {
    rowGap: scaleSize(8),
  },
  buttonsContainer: {
    marginTop: scaleSize(26),
    rowGap: scaleSize(16),
  },
});

export default styles;
