import { RefObject } from "react";
import MapView, { LatLng } from "react-native-maps";

import { DEFAULT_REGION } from "../constants";
import { ICustomMarkerModel } from "../types/components";

export const animateToLocation = (
  mapViewRef: RefObject<MapView | null>,
  location: LatLng | null
) => {
  if (location) {
    mapViewRef.current?.animateToRegion({
      ...DEFAULT_REGION,
      ...location,
    });
  }
};

export const showMarkerCalloutById = (
  markers: ICustomMarkerModel[],
  pinId: string
) => {
  markers.find((x) => pinId === x.key)?.showCallout?.();
};

export const hideMarkerCalloutById = (
  markers: ICustomMarkerModel[],
  pinId: string
) => {
  markers.find((x) => pinId === x.key)?.hideCallout?.();
};
