import { LatLng } from "react-native-maps";

export interface IPinData {
  id: string;
  label: string;
  description: string;
  location: LatLng;
  isFavorite: boolean;
}

export interface IPinDataArray extends Array<IPinData> {}
