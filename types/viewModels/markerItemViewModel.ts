import { LatLng, MapMarkerProps } from "react-native-maps";

export interface IMarkerItemViewModel {
  key: string;
  label: string;
  description?: string;
  location: LatLng;
  icon?: MapMarkerProps["icon"];
  showCallout?: () => void;
}
