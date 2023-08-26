import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import ClusteredMap from "react-native-map-clustering";
import MapView from "react-native-maps";
import { useSelector } from "react-redux";

import { LOCATION_ICON, MARKER_ICON } from "../../../assets/icons";
import { CustomButton, CustomMarker } from "../../../components/common";
import { PinDetailsModal } from "../../../components/sections/PinDetails";
import {
  AppColors,
  CustomButtonStyles,
  DEFAULT_REGION,
} from "../../../constants";
import {
  customMarkerModelToPinModel,
  pinModelToCustomMarkerModel,
} from "../../../converters";
import {
  hideMarkerCallout,
  showMarkerCallout,
  withAnimateToLocation,
} from "../../../helpers/map";
import { useCurrentLocation, usePins } from "../../../hooks";
import { TabProps } from "../../../navigation/TabStack/types";
import { selectPinsSearch } from "../../../store/redux/slices";
import { ICustomMarkerModel, IPinItemModel } from "../../../types/components";
import { IPinModel, IPinModelsArray } from "../../../types/models";
import { FoundPinsList } from "./components/FoundPinsList";
import styles from "./styles";

export const MapScreen: FC<TabProps> = ({ navigation, route }) => {
  const mapViewRef = useRef<MapView | null>(null);
  const { currentLocation, requestCurrentLocation } = useCurrentLocation(true);
  const [selectedPin, setSelectedPin] = useState<IPinModel | null>(null);

  const { filterPinsBySearchQuery, getPins, pins } = usePins();
  const { searchQuery } = useSelector(selectPinsSearch);

  const filteredPins: IPinModelsArray = useMemo(
    () =>
      searchQuery
        ? filterPinsBySearchQuery(searchQuery)
        : getPins((x) => x.isFavorite),
    [searchQuery, pins]
  );

  const markers: ICustomMarkerModel[] = useMemo(
    () =>
      filteredPins.map(
        (pin): ICustomMarkerModel => ({
          ...pinModelToCustomMarkerModel(pin),
          icon: MARKER_ICON,
        })
      ),
    [filteredPins]
  );

  const animateToLocation = withAnimateToLocation(mapViewRef);

  const showPinDetails = (pin: ICustomMarkerModel) => {
    setSelectedPin(customMarkerModelToPinModel(pin));
  };

  const pinFoundPressedHandler = (pinItem: IPinItemModel) => {
    animateToLocation(pinItem.location);
    showPinDetails(pinItem);
  };

  const hidePinDetailsHandler = () => {
    hideMarkerCallout(markers, selectedPin?.id ?? "");
    setSelectedPin(null);
  };

  const regionChangeCompleteHandler = () => {
    if (selectedPin) {
      setTimeout(() => {
        showMarkerCallout(markers, selectedPin.id);
      }, 0);
    }
  };

  useEffect(() => {
    animateToLocation(currentLocation);
  }, [currentLocation]);

  useEffect(() => {
    if (route.params?.pin) {
      const { pin, ...restParams } = route.params;

      setSelectedPin(pin);
      animateToLocation(pin.location);

      navigation.setParams(restParams);
    }
  }, [route.params?.pin]);

  return (
    <View style={styles.container}>
      {searchQuery && (
        <FoundPinsList
          pins={filteredPins}
          onPinPressed={pinFoundPressedHandler}
        />
      )}

      <ClusteredMap
        style={styles.map}
        clusterColor={AppColors.lightPrimary}
        clusterTextColor={AppColors.systemWhite}
        showsUserLocation
        showsMyLocationButton={false}
        initialRegion={DEFAULT_REGION}
        ref={mapViewRef}
        onRegionChangeComplete={regionChangeCompleteHandler}
      >
        {markers.map((pin) => (
          <CustomMarker
            key={pin.key}
            model={pin}
            coordinate={pin.location}
            onPress={() => showPinDetails(pin)}
          />
        ))}
      </ClusteredMap>

      <CustomButton
        style={CustomButtonStyles.roundFloating_i1}
        imageSource={LOCATION_ICON}
        onPress={requestCurrentLocation}
      />

      {selectedPin && (
        <PinDetailsModal pin={selectedPin} onClose={hidePinDetailsHandler} />
      )}
    </View>
  );
};
