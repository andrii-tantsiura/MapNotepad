import { LatLng } from "react-native-maps";

export interface IPin {
  id: string;
  location: LatLng;
  label: string;
  description?: string;
  isFavorite?: boolean;
}
