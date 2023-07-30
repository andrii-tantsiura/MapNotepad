import { FC, useEffect, useRef } from "react";
import { View } from "react-native";
import ClusteredMap from "react-native-map-clustering";
import MapView, { LatLng, Marker } from "react-native-maps";
import { useSelector } from "react-redux";

import { LOCATION_ICON, MARKER_ICON } from "../../../assets/icons";
import { CustomButton } from "../../../components/common";
import {
  AppColors,
  CustomButtonStyles,
  DEFAULT_REGION,
} from "../../../constants";
import { pinDataToPinItem } from "../../../converters";
import { useCurrentLocation, usePins } from "../../../hooks";
import { TabProps } from "../../../navigation/TabStack/types";
import { selectPinsSearch } from "../../../store/redux/slices";
import { IPinItemData } from "../../../types/ui";
import { FoundPinsList } from "./components/FoundPinsList";
import styles from "./styles";

export const MapScreen: FC<TabProps> = ({ navigation, route }) => {
  const mapViewRef = useRef<MapView | null>(null);
  const { currentLocation, requestCurrentLocation } = useCurrentLocation(true);

  const { filterPinsBySearchQuery, getPins } = usePins();
  const { searchQuery } = useSelector(selectPinsSearch);

  const pins = searchQuery
    ? filterPinsBySearchQuery(searchQuery)
    : getPins((x) => x.isFavorite);

  const displayedPins = pins.map((x) => pinDataToPinItem(x));

  const animateToLocation = (location: LatLng | undefined) => {
    if (location) {
      mapViewRef.current?.animateToRegion({
        ...DEFAULT_REGION,
        ...location,
      });
    }
  };

  const onPinFoundPressHandler = (pin: IPinItemData) => {
    animateToLocation(pin.location);
  };

  useEffect(() => {
    animateToLocation(currentLocation);
  }, [currentLocation]);

  useEffect(() => {
    if (route.params?.pin) {
      animateToLocation(route.params.pin.location);

      navigation.setParams(undefined);
    }
  }, [route.params?.pin]);

  return (
    <View style={styles.container}>
      {searchQuery && (
        <FoundPinsList
          pins={displayedPins}
          onPinPressed={onPinFoundPressHandler}
        />
      )}

      <ClusteredMap
        style={styles.map}
        clusterColor={AppColors.lightPrimary}
        clusterTextColor={AppColors.systemWhite}
        initialRegion={DEFAULT_REGION}
        ref={mapViewRef}
      >
        {pins.map((pin, index) => (
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
      </ClusteredMap>

      <CustomButton
        style={CustomButtonStyles.roundFloating_i1}
        imageSource={LOCATION_ICON}
        onPress={requestCurrentLocation}
      />
    </View>
  );
};
