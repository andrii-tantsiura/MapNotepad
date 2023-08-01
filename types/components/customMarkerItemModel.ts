import { LatLng, MapMarkerProps } from "react-native-maps";
import { IBaseItemModel } from "./baseItemModel";

export interface ICustomMarkerItemModel extends IBaseItemModel {
  label: string;
  description?: string;
  location: LatLng;
  icon?: MapMarkerProps["icon"];
  showCallout?: () => void;
}
