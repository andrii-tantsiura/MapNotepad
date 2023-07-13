import { FC, useEffect, useRef } from "react";
import { View } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker, Region } from "react-native-maps";
import { useSelector } from "react-redux";

import { LOCATION_ICON, MARKER_ICON } from "../../../assets/icons";
import { CustomButton } from "../../../components/common";
import {
  AppColors,
  CustomButtonStyles,
  DEFAULT_LATITUDE_DELTA,
  DEFAULT_LONGITUDE_DELTA,
} from "../../../constants";
import { useCurrentLocation } from "../../../hooks";
import { TabProps } from "../../../navigation/TabStack/types";
import PinsService from "../../../services/PinsService";
import { setPins } from "../../../store/redux/actions";
import { selectPins } from "../../../store/redux/slices";
import { useAppDispatch } from "../../../store/redux/store";
import styles from "./styles";

const INITIAL_REGION = {
  latitude: 6.394999333003437,
  longitude: -4.873477723449469,
  latitudeDelta: DEFAULT_LATITUDE_DELTA,
  longitudeDelta: DEFAULT_LONGITUDE_DELTA,
};

export const MapScreen: FC<TabProps> = () => {
  const dispatch = useAppDispatch();
  const mapViewRef = useRef<MapView>(null);
  const [currentLocation, requestCurrentLocation] = useCurrentLocation(true);

  const pins = useSelector(selectPins);
  const favoritePins = pins.filter((x) => x.isFavorite);

  useEffect(() => {
    (async () => {
      const getPinsResult = await PinsService.getPins();

      if (getPinsResult.isSuccess && getPinsResult.result) {
        dispatch(setPins(getPinsResult.result));
      }
    })();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      const region: Region = {
        latitudeDelta: DEFAULT_LATITUDE_DELTA,
        longitudeDelta: DEFAULT_LONGITUDE_DELTA,
        ...currentLocation,
      };

      // NOTE: this warning may be a package error
      mapViewRef.current?.animateToRegion(region);
    }
  }, [currentLocation]);

  return (
    <View style={styles.container}>
      <MapView
        clusterColor={AppColors.lightPrimary}
        // clusterFontFamily={FontWeights.bold}
        clusterTextColor={AppColors.systemWhite}
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
        style={CustomButtonStyles.roundFloating_i1}
        imageSource={LOCATION_ICON}
        onPress={requestCurrentLocation}
      />
    </View>
  );
};
