import { LatLng } from "react-native-maps";

export interface Pin {
  id: string;
  location: LatLng;
  label: string;
  description?: string;
  isFavorite?: boolean;
}
