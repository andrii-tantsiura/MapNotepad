import React, { useEffect, useRef } from "react";
import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  MarkerDragStartEndEvent,
  Region,
} from "react-native-maps";

import { LOCATION_ICON, MARKER_ICON } from "../../../assets/icons";
import { IconButtonStyles } from "../../../constants";
import { useCurrentLocation } from "../../../hooks";
import { CustomButton } from "../../common";
import styles from "./styles";

interface ISelectLocationViewProps {
  latitude: number;
  longitude: number;
  onPickCoordinates: (coordinate: LatLng) => void;
}

export const SelectLocationView: React.FC<ISelectLocationViewProps> = ({
  latitude,
  longitude,
  onPickCoordinates,
}) => {
  const mapViewRef = useRef<MapView>(null);
  const [currentLocation, requestCurrentLocation] = useCurrentLocation(true);

  const isCoordinatesValid = isFinite(latitude) && isFinite(longitude);
  const markerDraggedHandler = (e: MarkerDragStartEndEvent) => {
    onPickCoordinates(e.nativeEvent.coordinate);
  };

  const mapPressedHandler = (e: MapPressEvent) => {
    onPickCoordinates(e.nativeEvent.coordinate);
  };

  const pickCurrentLocationHandler = () => {
    requestCurrentLocation();
  };

  useEffect(() => {
    if (currentLocation) {
      const region: Region = {
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      };

      onPickCoordinates(currentLocation);

      mapViewRef.current?.animateToRegion(region);
    }
  }, [currentLocation]);

  return (
    <>
      <MapView ref={mapViewRef} style={styles.map} onPress={mapPressedHandler}>
        {isCoordinatesValid && (
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

      <CustomButton
        containerStyle={IconButtonStyles.float_i1}
        imageSource={LOCATION_ICON}
        onPress={pickCurrentLocationHandler}
      />
    </>
  );
};
