import { RefObject } from "react";
import MapView, { LatLng } from "react-native-maps";

import { DEFAULT_REGION } from "../constants";
import { ICustomMarkerModel } from "../types/components";

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

export const showMarkerCallout = (
  markers: ICustomMarkerModel[],
  pinId: string
) => {
  markers.find((x) => pinId === x.key)?.showCallout?.();
};

export const hideMarkerCallout = (
  markers: ICustomMarkerModel[],
  pinId: string
) => {
  markers.find((x) => pinId === x.key)?.hideCallout?.();
};
