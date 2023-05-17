import { FC, createRef, useEffect } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import styles from "./styles";
import { FloatingActionButton } from "../../../components/sections";
import { TabProps } from "../../../navigation/TabStack/types";
import { selectPins } from "../../../store/redux/slices/pinsSlice";
import { useCurrentLocation } from "../../../hooks/useCurrentLocation";

const LOCATION_ICON = require("../../../assets/icons/ic_location.png");
const MARKER_ICON = require("../../../assets/icons/ic_marker.png");

export const MapScreen: FC<TabProps> = () => {
  const mapViewRef = createRef<MapView>();
  const [currentLocation, updateCurrentLocation] = useCurrentLocation();

  const pins = useSelector(selectPins);
  const favoritePins = pins.filter((x) => x.isFavorite);

  const { latitude = 0, longitude = 0 } = currentLocation ?? {};

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
      <MapView ref={mapViewRef} style={styles.map}>
        {favoritePins.map((pin, index) => (
          <Marker
            image={MARKER_ICON}
            key={index}
            title={pin.label}
            description={pin.description}
            coordinate={{
              latitude: pin.location.latitude,
              longitude: pin.location.longitude,
            }}
          />
        ))}
      </MapView>

      <FloatingActionButton
        style={styles.locationButton}
        source={LOCATION_ICON}
        onPress={updateCurrentLocation}
      />
    </View>
  );
};
