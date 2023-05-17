import { useEffect, useState } from "react";
import * as ExpoLocation from "expo-location";
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

export const useCurrentLocation = (): [Location | undefined, () => void] => {
  const [currentLocation, setCurrentLocation] = useState<Location>();

  useEffect(() => {
    (async () => {
      let status = await requestLocationPermissions();

      if (status === "granted") {
        const location = await getCurrentLocation();

        setCurrentLocation(location);
      } else {
        AlertService.error(ErrorMessages.LOCATION_PERMISSION_DENIED);
      }
    })();
  }, [currentLocation]);

  const updateCurrentLocation = () => {
    const { latitude = 0, longitude = 0 } = currentLocation || {};

    setCurrentLocation({
      latitude: latitude + 0.00000001,
      longitude,
    });
  };

  return [currentLocation, updateCurrentLocation];
};
