import * as Location from "expo-location";
import { FC, createRef, useEffect } from "react";
import { View } from "react-native";
import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  MarkerDragStartEndEvent,
} from "react-native-maps";

import { LOCATION_ICON, MARKER_ICON } from "../../../assets/icons";
import { IconButtonStyles } from "../../../constants/globalStyles";
import { ErrorMessages } from "../../../enums/errorMessages";
import AlertService from "../../../services/AlertService";
import { IconButton } from "../../common";
import styles from "./styles";

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

      <IconButton
        style={IconButtonStyles.float_i1}
        source={LOCATION_ICON}
        onPress={setCurrentPositionHandler}
      />
    </View>
  );
};
