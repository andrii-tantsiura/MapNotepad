import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  animateToLocation,
  hideMarkerCallout,
  showMarkerCallout,
} from "../../../helpers/map";
import { useCurrentLocation, usePins } from "../../../hooks";
import { TabProps } from "../../../navigation/TabStack/types";
import { stopSearchAction } from "../../../store/redux/actions";
import { selectSearch } from "../../../store/redux/slices";
import { useAppDispatch } from "../../../store/redux/store";
import { ICustomMarkerModel, IPinItemModel } from "../../../types/components";
import { IPinModel, IPinModelsArray } from "../../../types/models";
import { FoundPinsList } from "./components/FoundPinsList";
import styles from "./styles";

export const MapScreen: FC<TabProps> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();

  const mapViewRef = useRef<MapView | null>(null);
  const { currentLocation, requestCurrentLocation } = useCurrentLocation(true);
  const [selectedPin, setSelectedPin] = useState<IPinModel | null>(null);
  const [isPinDetailsOpened, setIsPinDetailsOpened] = useState<boolean>(false);

  const { filterPinsBySearchQuery, getPins, pins } = usePins();
  const { searchQuery } = useSelector(selectSearch);

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

  const selectMarkerHandler = useCallback((pin: ICustomMarkerModel) => {
    setSelectedPin(customMarkerModelToPinModel(pin));
  }, []);

  const showSelectedMarkerCallout = () => {
    if (selectedPin) {
      setTimeout(() => {
        showMarkerCallout(markers, selectedPin.id);
      }, 0);
    }
  };

  const pinFoundPressedHandler = (pinItem: IPinItemModel) => {
    animateToLocation(mapViewRef, pinItem.location);
    selectMarkerHandler(pinItem);
    showSelectedMarkerCallout();
    dispatch(stopSearchAction());
  };

  const hidePinDetailsHandler = () => {
    hideMarkerCallout(markers, selectedPin?.id ?? "");
    setSelectedPin(null);
    setIsPinDetailsOpened(false);
  };

  const regionChangeCompleteHandler = () => {
    setIsPinDetailsOpened(Boolean(selectedPin));
    showSelectedMarkerCallout();
  };

  useEffect(() => {
    animateToLocation(mapViewRef, currentLocation);
  }, [currentLocation]);

  useEffect(() => {
    if (route.params?.pin) {
      const { pin, ...restParams } = route.params;
      navigation.setParams(restParams);

      dispatch(stopSearchAction());

      setSelectedPin(pin);
      animateToLocation(mapViewRef, pin.location);
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
            marker={pin}
            coordinate={pin.location}
            onPress={selectMarkerHandler}
          />
        ))}
      </ClusteredMap>

      <CustomButton
        style={CustomButtonStyles.roundFloating_i1}
        imageSource={LOCATION_ICON}
        onPress={requestCurrentLocation}
      />

      {isPinDetailsOpened && selectedPin && (
        <PinDetailsModal pin={selectedPin} onClose={hidePinDetailsHandler} />
      )}
    </View>
  );
};
