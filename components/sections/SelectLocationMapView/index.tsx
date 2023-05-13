import { FC, createRef, useEffect } from "react";
import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  MarkerDragStartEndEvent,
} from "react-native-maps";
import * as Location from "expo-location";
import { View } from "react-native";
import { FloatingActionButton } from "../FloatingActionButton";
import styles from "./styles";
import AlertService from "../../../services/AlertService";
import { ErrorMessages } from "../../../enums/errorMessages";

const LOCATION_ICON = require("../../../assets/icons/ic_location.png");

interface ISelectLocationMapViewProps {
  latitude: number;
  longitude: number;
  setCoordinates: (coordinate: LatLng) => void;
}

export const SelectLocationMapView: FC<ISelectLocationMapViewProps> = ({
  latitude,
  longitude,
  setCoordinates,
}) => {
  const mapViewRef = createRef<MapView>();

  const markerDraggedHandler = (e: MarkerDragStartEndEvent) => {
    setCoordinates(e.nativeEvent.coordinate);
  };

  const mapPressedHandler = (e: MapPressEvent) => {
    setCoordinates(e.nativeEvent.coordinate);
  };

  const setCurrentPositionHandler = async () => {
    const { coords } = await Location.getCurrentPositionAsync();

    setCoordinates(coords);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        await setCurrentPositionHandler();
      } else {
        AlertService.error(ErrorMessages.LOCATION_PERMISSION_DENIED);
      }
    })();
  }, []);

  useEffect(() => {
    mapViewRef.current?.animateToRegion({
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      latitude: latitude,
      longitude: longitude,
    });
  }, [latitude, longitude]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} ref={mapViewRef} onPress={mapPressedHandler}>
        <Marker
          draggable
          image={require("../../../assets/icons/ic_marker.png")}
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          onDragEnd={markerDraggedHandler}
        />
      </MapView>

      <FloatingActionButton
        style={styles.locationButton}
        source={LOCATION_ICON}
        onPress={setCurrentPositionHandler}
      />
    </View>
  );
};
