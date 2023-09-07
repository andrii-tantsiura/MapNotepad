import {
  PermissionStatus,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { useCallback, useEffect, useState } from "react";
import { LatLng } from "react-native-maps";

import { ErrorMessages } from "../enums";

const requestLocationPermissions = async (): Promise<void> => {
  const { status } = await requestForegroundPermissionsAsync();

  switch (status) {
    case PermissionStatus.DENIED:
      throw new Error(ErrorMessages.LOCATION_PERMISSION_DENIED);
    case PermissionStatus.UNDETERMINED:
      throw new Error(ErrorMessages.SOME_WENT_WRONG);
  }
};

const getCurrentLocation = async (): Promise<LatLng> => {
  const { coords } = await getCurrentPositionAsync();
  return {
    latitude: coords.latitude,
    longitude: coords.longitude,
  };
};

type UseCurrentLocationReturn = {
  currentLocation: LatLng | undefined;
  requestCurrentLocation: () => void;
};

export const useCurrentLocation = (
  shouldRequestLocationInitially: boolean = false
): UseCurrentLocationReturn => {
  const [currentLocation, setCurrentLocation] = useState<LatLng | undefined>();
  const [isRequestingLocation, setIsRequestingLocation] = useState(
    shouldRequestLocationInitially
  );

  useEffect(() => {
    if (isRequestingLocation) {
      (async () => {
        try {
          await requestLocationPermissions();
          const location = await getCurrentLocation();

          setCurrentLocation(location);
        } catch (error) {
          setCurrentLocation(undefined);
        } finally {
          setIsRequestingLocation(false);
        }
      })();
    }
  }, [isRequestingLocation]);

  const requestCurrentLocation = useCallback(() => {
    setIsRequestingLocation(true);
  }, [setIsRequestingLocation]);

  return { currentLocation, requestCurrentLocation };
};
