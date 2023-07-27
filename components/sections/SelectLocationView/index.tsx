import React, { useEffect, useRef } from "react";
import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  MarkerDragStartEndEvent,
} from "react-native-maps";

import { LOCATION_ICON, MARKER_ICON } from "../../../assets/icons";
import { CustomButtonStyles, DEFAULT_REGION } from "../../../constants";
import { useCurrentLocation } from "../../../hooks";
import { CustomButton } from "../../common";
import styles from "./styles";

interface ISelectLocationViewProps {
  latitude: number;
  longitude: number;
  shouldRequestLocationInitially?: boolean;
  onPickLocation: (coordinate: LatLng) => void;
}

export const SelectLocationView: React.FC<ISelectLocationViewProps> = ({
  latitude,
  longitude,
  shouldRequestLocationInitially = true,
  onPickLocation,
}) => {
  const mapViewRef = useRef<MapView | null>(null);
  const { currentLocation, requestCurrentLocation } = useCurrentLocation(
    shouldRequestLocationInitially
  );

  const isCoordinatesValid = isFinite(latitude) && isFinite(longitude);

  const markerDraggedHandler = (e: MarkerDragStartEndEvent) => {
    onPickLocation(e.nativeEvent.coordinate);
  };

  const mapPressedHandler = (e: MapPressEvent) => {
    onPickLocation(e.nativeEvent.coordinate);
  };

  const pickCurrentLocationHandler = () => {
    requestCurrentLocation();
  };

  useEffect(() => {
    if (currentLocation) {
      onPickLocation(currentLocation);

      mapViewRef.current?.animateToRegion({
        ...DEFAULT_REGION,
        ...currentLocation,
      });
    }
  }, [currentLocation]);

  return (
    <>
      <MapView style={styles.map} ref={mapViewRef} onPress={mapPressedHandler}>
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
        style={CustomButtonStyles.roundFloating_i1}
        imageSource={LOCATION_ICON}
        onPress={pickCurrentLocationHandler}
      />
    </>
  );
};
