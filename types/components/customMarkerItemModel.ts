import { MutableRefObject } from "react";
import { LatLng, MapMarker, MapMarkerProps } from "react-native-maps";

import { IBaseItemModel } from "./baseItemModel";

export interface ICustomMarkerModel extends IBaseItemModel {
  label: string;
  description: string;
  location: LatLng;
  icon?: MapMarkerProps["icon"];
  showCallout?: () => void;
  hideCallout?: () => void;
}
