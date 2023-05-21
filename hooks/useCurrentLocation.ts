import * as ExpoLocation from "expo-location";
import { useEffect, useState } from "react";

import { ErrorMessages } from "../enums/errorMessages";
import AlertService from "../services/AlertService";
import { Location } from "../types/map";

const requestLocationPermissions =
  async (): Promise<ExpoLocation.PermissionStatus> => {
    const { status } = await ExpoLocation.requestForegroundPermissionsAsync();

    return status;
  };

const getCurrentLocation = async (): Promise<Location> => {
  const { coords } = await ExpoLocation.getCurrentPositionAsync();

  return {
    latitude: coords.latitude,
    longitude: coords.longitude,
  };
};

export const useCurrentLocation = (
  isNeedInitialRequest: boolean = false
): [location: Location | undefined, requestCurrentLocation: () => void] => {
  const [currentLocation, setCurrentLocation] = useState<Location>();
  const [isLocationUpdating, setIsLocationUpdating] =
    useState(isNeedInitialRequest);

  useEffect(() => {
    if (isLocationUpdating) {
      (async () => {
        try {
          let status = await requestLocationPermissions();

          if (status === "granted") {
            const location = await getCurrentLocation();

            setCurrentLocation(location);
          } else {
            setCurrentLocation(undefined);

            AlertService.error(ErrorMessages.LOCATION_PERMISSION_DENIED);
          }
        } catch (error) {
          setCurrentLocation(undefined);
        } finally {
          setIsLocationUpdating(false);
        }
      })();
    }
  }, [isLocationUpdating]);

  const requestCurrentLocation = () => {
    setIsLocationUpdating(true);
  };

  return [currentLocation, requestCurrentLocation];
};
