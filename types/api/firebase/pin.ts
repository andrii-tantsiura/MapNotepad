import { LatLng } from "react-native-maps";

export interface IPinPayload {
  userId: string;
  label: string;
  description: string;
  location: LatLng;
  isFavorite: boolean;
}
