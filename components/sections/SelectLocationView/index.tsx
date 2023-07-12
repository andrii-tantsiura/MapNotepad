import React, { useEffect, useRef } from "react";
import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  MarkerDragStartEndEvent,
  Region,
} from "react-native-maps";

import { LOCATION_ICON, MARKER_ICON } from "../../../assets/icons";
import {
  CustomButtonStyles,
  DEFAULT_LATITUDE_DELTA,
  DEFAULT_LONGITUDE_DELTA,
} from "../../../constants";
import { useCurrentLocation } from "../../../hooks";
import { CustomButton } from "../../common";
import styles from "./styles";

interface ISelectLocationViewProps {
  latitude: number;
  longitude: number;
  shouldRequestLocationInitially?: boolean;
  onPickCoordinates: (coordinate: LatLng) => void;
}

export const SelectLocationView: React.FC<ISelectLocationViewProps> = ({
  latitude,
  longitude,
  shouldRequestLocationInitially = true,
  onPickCoordinates,
}) => {
  const mapViewRef = useRef<MapView>(null);
  const [currentLocation, requestCurrentLocation] = useCurrentLocation(
    shouldRequestLocationInitially
  );

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

  const mapViewReadyHandler = () => {
    if (latitude && longitude) {
      const region: Region = {
        latitudeDelta: DEFAULT_LATITUDE_DELTA,
        longitudeDelta: DEFAULT_LONGITUDE_DELTA,
        latitude: latitude,
        longitude: longitude,
      };

      mapViewRef.current?.animateToRegion(region);
    }
  };

  useEffect(() => {
    if (currentLocation) {
      const region: Region = {
        latitudeDelta: DEFAULT_LATITUDE_DELTA,
        longitudeDelta: DEFAULT_LONGITUDE_DELTA,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      };

      onPickCoordinates(currentLocation);

      mapViewRef.current?.animateToRegion(region);
    }
  }, [currentLocation]);

  return (
    <>
      <MapView
        ref={mapViewRef}
        style={styles.map}
        onPress={mapPressedHandler}
        onMapReady={mapViewReadyHandler}
      >
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
