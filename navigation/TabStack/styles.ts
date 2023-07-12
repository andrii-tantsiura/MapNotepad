import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

const styles = StyleSheet.create({
  searchBarContainer: {
    marginTop: getStatusBarHeight(),
  },
});

export default styles;
