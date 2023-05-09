import React, { FC } from "react";
import { ListRenderItem, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import styles from "./styles";
import { FloatingActionButton } from "../../../components/sections/FloatingActionButton";
import { Pin } from "../../../types/map";
import { PinItem } from "./common/PinItem";

const PLUS_ICON = require("../../../assets/icons/ic_plus.png");

const pins: Array<Pin> = [
  {
    id: 1,
    location: { latitude: 41.39291018, longitude: 12.27313791 },
    label: "Favourite restairant",
  },
  {
    id: 2,
    location: { latitude: 14.920247891, longitude: 11.09561248 },
    label: "Buon Fratelli",
    isFavorite: true,
  },
  {
    id: 3,
    location: { latitude: 42.39242528, longitude: 18.29453291 },
    label: "School",
    isFavorite: true,
  },
  {
    id: 4,
    location: { latitude: 16.98453127, longitude: 10.76190482 },
    label: "Grocery",
  },
];

const renderPinItem: ListRenderItem<Pin> = ({ item }) => (
  <PinItem data={item} />
);

export const PinsScreen: FC = () => (
  <View style={styles.container}>
    <FlatList
      data={pins}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderPinItem}
    />
    <FloatingActionButton
      style={styles.addPinButton}
      source={PLUS_ICON}
      onPress={() => console.log("tap")}
    />
  </View>
);
