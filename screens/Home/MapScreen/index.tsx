import { FC, useEffect, useRef } from "react";
import { View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { useSelector } from "react-redux";

import { LOCATION_ICON, MARKER_ICON } from "../../../assets/icons";
import { IconButton } from "../../../components/common";
import { IconButtonStyles } from "../../../constants/globalStyles";
import { useCurrentLocation } from "../../../hooks/useCurrentLocation";
import { TabProps } from "../../../navigation/TabStack/types";
import { selectPins } from "../../../store/redux/slices/pinsSlice";
import styles from "./styles";

export const MapScreen: FC<TabProps> = () => {
  const mapViewRef = useRef<MapView>(null);
  const [currentLocation, requestCurrentLocation] = useCurrentLocation(true);

  const pins = useSelector(selectPins);
  const favoritePins = pins.filter((x) => x.isFavorite);

  useEffect(() => {
    if (currentLocation) {
      const region: Region = {
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
        ...currentLocation,
      };

      mapViewRef.current?.animateToRegion(region);
    }
  }, [currentLocation]);

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

      <IconButton
        style={IconButtonStyles.float_i1}
        source={LOCATION_ICON}
        onPress={requestCurrentLocation}
      />
    </View>
  );
};
