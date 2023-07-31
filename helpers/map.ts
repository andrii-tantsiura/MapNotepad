import { RefObject } from "react";
import MapView, { LatLng } from "react-native-maps";
import { DEFAULT_REGION } from "../constants";

export const animateToLocation = (
  mapViewRef: RefObject<MapView | null>,
  location: LatLng | undefined
) => {
  if (location) {
    mapViewRef.current?.animateToRegion({
      ...DEFAULT_REGION,
      ...location,
    });
  }
};
