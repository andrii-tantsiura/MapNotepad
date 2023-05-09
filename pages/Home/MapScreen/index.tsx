import { FC } from "react";
import MapView from "react-native-maps";
import styles from "./styles";
import { View } from "react-native";
import { FloatingActionButton } from "../../../components/sections/FloatingActionButton";

const LOCATION = require("../../../assets/icons/ic_location.png");

export const MapScreen: FC = () => (
  <View style={styles.container}>
    <MapView style={styles.map}></MapView>
    <FloatingActionButton style={styles.locationButton} source={LOCATION} />
  </View>
);
