import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  menuContainer: {
    paddingBottom: 3,
    paddingTop: 3,
    borderRadius: 5,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  itemContainer: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  itemImage: {
    width: 22,
    height: 22,
  },
  itemText: {
    marginTop: 2,
    marginRight: 12,
  },
});

export default styles;
