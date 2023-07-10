import { FC, useEffect, useRef } from "react";
import { View } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker, Region } from "react-native-maps";
import { useSelector } from "react-redux";

import { LOCATION_ICON, MARKER_ICON } from "../../../assets/icons";
import { CustomButton } from "../../../components/common";
import COLORS from "../../../constants/colors";
import { IconButtonStyles } from "../../../constants/globalStyles";
import { useCurrentLocation } from "../../../hooks/useCurrentLocation";
import { TabProps } from "../../../navigation/TabStack/types";
import { selectPins } from "../../../store/redux/slices/pinsSlice";
import styles from "./styles";

const INITIAL_REGION = {
  latitude: 6.394999333003437,
  latitudeDelta: 136.53565015480194,
  longitude: -4.873477723449469,
  longitudeDelta: 144.64280527085066,
};

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

      // NOTE: perhaps this warning is a bug
      mapViewRef.current?.animateToRegion(region);
    }
  }, [currentLocation]);

  return (
    <View style={styles.container}>
      <MapView
        clusterColor={COLORS.lightPrimary}
        // clusterFontFamily={FontWeights.regular.fontFamily}
        clusterTextColor={COLORS.systemWhite}
        style={styles.map}
        ref={mapViewRef}
        initialRegion={INITIAL_REGION}
      >
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

      <CustomButton
        containerStyle={IconButtonStyles.float_i1}
        imageSource={LOCATION_ICON}
        onPress={requestCurrentLocation}
      />
    </View>
  );
};
