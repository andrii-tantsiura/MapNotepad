import React, { FC, useEffect, useMemo, useRef } from "react";
import { View } from "react-native";
import ClusteredMap from "react-native-map-clustering";
import MapView, { LatLng } from "react-native-maps";
import { useSelector } from "react-redux";

import { LOCATION_ICON, MARKER_ICON } from "../../../assets/icons";
import { CustomButton, CustomMarker } from "../../../components/common";
import {
  AppColors,
  CustomButtonStyles,
  DEFAULT_REGION,
} from "../../../constants";
import {
  pinModelToMarkerViewModel,
  pinModelToViewModel,
} from "../../../converters";
import { animateToLocation } from "../../../helpers/map";
import { useCurrentLocation, usePins } from "../../../hooks";
import { TabProps } from "../../../navigation/TabStack/types";
import { selectPinsSearch } from "../../../store/redux/slices";
import {
  IMarkerItemViewModel,
  IPinItemViewModel,
} from "../../../types/viewModels";
import { FoundPinsList } from "./components/FoundPinsList";
import styles from "./styles";

export const MapScreen: FC<TabProps> = ({ navigation, route }) => {
  const mapViewRef = useRef<MapView | null>(null);
  const { currentLocation, requestCurrentLocation } = useCurrentLocation(true);

  const { filterPinsBySearchQuery, getPins, pins } = usePins();
  const { searchQuery } = useSelector(selectPinsSearch);

  const filteredPins = useMemo(
    () =>
      searchQuery
        ? filterPinsBySearchQuery(searchQuery)
        : getPins((x) => x.isFavorite),
    [searchQuery, pins]
  );

  const pinViewModels = useMemo(
    () => filteredPins.map((x) => pinModelToViewModel(x)),
    [filteredPins]
  );

  const markersViewModels: Array<IMarkerItemViewModel> = useMemo(
    () =>
      filteredPins.map(
        (pin): IMarkerItemViewModel => ({
          ...pinModelToMarkerViewModel(pin),
          icon: MARKER_ICON,
        })
      ),
    [filteredPins]
  );

  const showMarkerCallout = (pinId: string) => {
    markersViewModels.find((x) => pinId === x.key)?.showCallout?.();
  };

  const focusMarker = (location: LatLng, markerId: string) => {
    animateToLocation(mapViewRef, location);
    showMarkerCallout(markerId);
  };

  const onPinFoundPressHandler = ({ location, key }: IPinItemViewModel) => {
    focusMarker(location, key);
  };

  useEffect(() => {
    animateToLocation(mapViewRef, currentLocation);
  }, [currentLocation]);

  useEffect(() => {
    if (route.params?.pin) {
      const { location, id } = route.params.pin;

      focusMarker(location, id);

      navigation.setParams(undefined);
    }
  }, [route.params?.pin]);

  return (
    <View style={styles.container}>
      {searchQuery && (
        <FoundPinsList
          pins={pinViewModels}
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
        {markersViewModels.map((pin) => (
          <CustomMarker
            key={pin.key}
            coordinate={pin.location}
            viewModel={pin}
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
