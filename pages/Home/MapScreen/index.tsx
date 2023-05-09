import { FC } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";
import styles from "./styles";
import { FloatingActionButton } from "../../../components/sections";
import { TabProps } from "../../../navigation/TabStack/types";

const LOCATION_ICON = require("../../../assets/icons/ic_location.png");

export const MapScreen: FC<TabProps> = () => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}></MapView>
      <FloatingActionButton
        style={styles.locationButton}
        source={LOCATION_ICON}
      />
    </View>
  );
};
