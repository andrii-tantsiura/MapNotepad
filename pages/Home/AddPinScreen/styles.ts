import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputsContainer: {
    paddingHorizontal: 16,
  },
  coordinatesContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  coordinateContainer: {
    width: "49%",
  },
  map: {
    flex: 1,
  },
  locationButton: {
    bottom: 0,
    right: 0,
    marginRight: 16,
    marginBottom: 18,
  },
});

export default styles;
