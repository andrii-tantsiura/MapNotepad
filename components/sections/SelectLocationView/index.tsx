import React, { useEffect, useRef } from "react";
import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  MarkerDragStartEndEvent,
  Region,
} from "react-native-maps";

import { LOCATION_ICON, MARKER_ICON } from "../../../assets/icons";
import { IconButtonStyles } from "../../../constants/styles";
import { animateToLocation } from "../../../helpers";
import { useAppTheme, useUserLocation } from "../../../hooks";
import { IconButton } from "../../common/IconButton";
import styles from "./styles";

interface ISelectLocationViewProps {
  latitude: number;
  longitude: number;
  initialRegion: Region;
  shouldRequestLocationInitially?: boolean;
  onPickLocation: (coordinate: LatLng) => void;
}

export const SelectLocationView: React.FC<ISelectLocationViewProps> = ({
  latitude,
  longitude,
  initialRegion,
  shouldRequestLocationInitially = true,
  onPickLocation,
}) => {
  const { mapStyles } = useAppTheme();
  const mapViewRef = useRef<MapView | null>(null);
  const { userLocation, requestUserLocation } = useUserLocation(
    shouldRequestLocationInitially
  );

  const isCoordinatesValid = isFinite(latitude) && isFinite(longitude);

  const markerDraggedHandler = (e: MarkerDragStartEndEvent) => {
    onPickLocation(e.nativeEvent.coordinate);
  };

  const mapPressedHandler = (e: MapPressEvent) => {
    onPickLocation(e.nativeEvent.coordinate);
  };

  useEffect(() => {
    if (userLocation) {
      onPickLocation(userLocation);

      animateToLocation(mapViewRef, userLocation);
    }
  }, [userLocation]);

  return (
    <>
      <MapView
        style={styles.map}
        customMapStyle={mapStyles}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton={false}
        ref={mapViewRef}
        onPress={mapPressedHandler}
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

      <IconButton
        style={IconButtonStyles.floating}
        backgroundColor="background"
        tintColor="primary"
        imageSource={LOCATION_ICON}
        onPress={requestUserLocation}
      />
    </>
  );
};
