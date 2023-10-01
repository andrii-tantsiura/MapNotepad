import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import ClusteredMap from "react-native-map-clustering";
import MapView from "react-native-maps";
import { useSelector } from "react-redux";

import {
  LOCATION_ICON,
  MARKER_GRAY_ICON,
  MARKER_ICON,
} from "../../../assets/icons";
import { CustomMarker, IconButton } from "../../../components/common";
import { PinDetailsModal } from "../../../components/sections";
import { DEFAULT_REGION } from "../../../constants";
import { globalIconButtonStyles } from "../../../constants/styles";
import {
  customMarkerModelToPinModel,
  pinItemModelToPinModel,
  pinModelToCustomMarkerModel,
} from "../../../converters";
import {
  animateToLocation,
  hideMarkerCalloutById,
  showMarkerCalloutById,
} from "../../../helpers";
import { useAppTheme, usePins, useUserLocation } from "../../../hooks";
import { TabProps } from "../../../navigation/TabStack/types";
import { stopSearchAction } from "../../../store/redux/actions";
import { setUserLocationAction } from "../../../store/redux/actions/userLocation.actions";
import { selectSearch } from "../../../store/redux/slices";
import { useAppDispatch } from "../../../store/redux/store";
import { ICustomMarkerModel, IPinItemModel } from "../../../types/components";
import { IPinModel } from "../../../types/models";
import { FoundPinsList } from "./components/FoundPinsList";
import styles from "./styles";

export const MapScreen: FC<TabProps> = ({ navigation, route }) => {
  const { appColors, mapStyles, getColorStyle } = useAppTheme();
  const mapViewRef = useRef<MapView | null>(null);

  const dispatch = useAppDispatch();
  const { userLocation, requestUserLocation } = useUserLocation(true);
  const { getPinsBySearchQuery, pins } = usePins();
  const { searchQuery } = useSelector(selectSearch);

  const [markers, setMarkers] = useState<ICustomMarkerModel[]>([]);
  const [foundPins, setFoundPins] = useState<Array<IPinModel>>([]);
  const [selectedPin, setSelectedPin] = useState<IPinModel | null>(null);

  const showPinDetails = (pin: IPinModel) => {
    setSelectedPin(pin);

    animateToLocation(mapViewRef, pin.location);
    showMarkerCalloutById(markers, pin.id);
  };

  const markerPressHandler = useCallback((pin: ICustomMarkerModel) => {
    setSelectedPin(customMarkerModelToPinModel(pin));
  }, []);

  const pinFoundPressHandler = useCallback(
    (pinItem: IPinItemModel) => {
      dispatch(stopSearchAction());

      showPinDetails(pinItemModelToPinModel(pinItem));
    },
    [mapViewRef]
  );

  const hidePinDetailsHandler = () => {
    hideMarkerCalloutById(markers, selectedPin?.id ?? "");
    setSelectedPin(null);
  };

  const regionChangeCompleteHandler = () => {
    if (selectedPin) {
      setTimeout(() => {
        showMarkerCalloutById(markers, selectedPin.id);
      }, 0);
    }
  };

  useEffect(() => {
    dispatch(setUserLocationAction(userLocation));
    animateToLocation(mapViewRef, userLocation);
  }, [userLocation]);

  useEffect(() => {
    const markers = pins.map(
      (pin): ICustomMarkerModel => ({
        ...pinModelToCustomMarkerModel(pin),
        icon: pin.isFavorite ? MARKER_ICON : MARKER_GRAY_ICON,
      })
    );

    setMarkers(markers);
  }, [pins]);

  useEffect(() => {
    setFoundPins(getPinsBySearchQuery(searchQuery));
  }, [searchQuery, pins]);

  useEffect(() => {
    if (route.params?.pin) {
      const { pin, ...restParams } = route.params;
      navigation.setParams(restParams);

      showPinDetails(pin);
    }
  }, [route.params?.pin]);

  return (
    <View style={styles.container}>
      {searchQuery && (
        <FoundPinsList pins={foundPins} onPinPressed={pinFoundPressHandler} />
      )}

      <ClusteredMap
        style={styles.map}
        customMapStyle={mapStyles}
        initialRegion={
          userLocation ? { ...DEFAULT_REGION, ...userLocation } : DEFAULT_REGION
        }
        clusterColor={appColors.primary}
        clusterTextColor={appColors.variant}
        showsUserLocation
        showsMyLocationButton={false}
        moveOnMarkerPress={false}
        ref={mapViewRef}
        onRegionChangeComplete={regionChangeCompleteHandler}
      >
        {markers.map((pin) => (
          <CustomMarker
            key={pin.key}
            marker={pin}
            coordinate={pin.location}
            onPress={markerPressHandler}
          />
        ))}
      </ClusteredMap>

      <IconButton
        style={[
          globalIconButtonStyles.floating,
          getColorStyle("background", "background"),
        ]}
        imageStyle={getColorStyle("tint", "primary")}
        imageSource={LOCATION_ICON}
        onPress={requestUserLocation}
      />

      {selectedPin && (
        <PinDetailsModal pin={selectedPin} onClose={hidePinDetailsHandler} />
      )}
    </View>
  );
};
