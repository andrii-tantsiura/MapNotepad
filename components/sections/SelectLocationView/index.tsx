import { FC, createRef, useEffect } from "react";
import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  MarkerDragStartEndEvent,
} from "react-native-maps";
import * as Location from "expo-location";
import { View } from "react-native";
import { FloatingIconButton } from "../../common";
import styles from "./styles";
import AlertService from "../../../services/AlertService";
import { ErrorMessages } from "../../../enums/errorMessages";

const LOCATION_ICON = require("../../../assets/icons/ic_location.png");
const MARKER_ICON = require("../../../assets/icons/ic_marker.png");

interface ISelectLocationViewProps {
  latitude: number;
  longitude: number;
  onSelectCoordinates: (coordinate: LatLng) => void;
}

export const SelectLocationView: FC<ISelectLocationViewProps> = ({
  latitude,
  longitude,
  onSelectCoordinates,
}) => {
  const mapViewRef = createRef<MapView>();

  const isCoordinatedValid = isFinite(latitude) && isFinite(longitude);

  const markerDraggedHandler = (e: MarkerDragStartEndEvent) => {
    onSelectCoordinates(e.nativeEvent.coordinate);
  };

  const mapPressedHandler = (e: MapPressEvent) => {
    onSelectCoordinates(e.nativeEvent.coordinate);
  };

  const setCurrentPositionHandler = async () => {
    const { coords } = await Location.getCurrentPositionAsync();

    onSelectCoordinates(coords);
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
    if (isCoordinatedValid) {
      mapViewRef.current?.animateToRegion({
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        latitude: latitude,
        longitude: longitude,
      });
    }
  }, [latitude, longitude]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} ref={mapViewRef} onPress={mapPressedHandler}>
        {isCoordinatedValid && (
          <Marker
            draggable
            image={MARKER_ICON}
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            onDragEnd={markerDraggedHandler}
          />
        )}
      </MapView>

      <FloatingIconButton
        style={styles.locationButton}
        source={LOCATION_ICON}
        onPress={setCurrentPositionHandler}
      />
    </View>
  );
};
