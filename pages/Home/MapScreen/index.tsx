import { FC } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";
import styles from "./styles";
import { Typography } from "../../../components/common";

export const MapScreen: FC = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Typography color="lightPrimary">Map screen</Typography>
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  </View>
);
