import {
  PermissionStatus,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { useCallback, useEffect, useState } from "react";
import { LatLng } from "react-native-maps";
import { useSelector } from "react-redux";

import { ErrorMessages } from "../enums";
import { ExecuteAsync } from "../helpers/AOResult";
import AlertService from "../services/AlertService";
import { selectUserLocation } from "../store/redux/slices";

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
  userLocation: LatLng | null;
  requestUserLocation: () => void;
};

export const useUserLocation = (
  shouldRequestLocationInitially: boolean = false
): UseCurrentLocationReturn => {
  const location = useSelector(selectUserLocation);

  const [userLocation, setUserLocation] = useState<LatLng | null>(location);

  const requestUserLocation = useCallback(async () => {
    const permissionResult = await ExecuteAsync(requestLocationPermissions);

    if (permissionResult.isSuccess) {
      const location = await getCurrentLocation();

      setUserLocation(location);
    } else {
      AlertService.info(permissionResult.getMessage());
    }
  }, [setUserLocation]);

  useEffect(() => {
    if (shouldRequestLocationInitially) {
      requestUserLocation();
    }
  }, [shouldRequestLocationInitially]);

  return { userLocation, requestUserLocation };
};
