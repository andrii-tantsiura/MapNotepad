import { LatLng } from "react-native-maps";

export interface IPinPayload {
  label: string;
  description: string;
  location: LatLng;
  isFavorite: boolean;
}

export interface ICreatePinResponse {
  name: string;
}

export interface IPin {
  label: string;
  description: string;
  location: LatLng;
  isFavorite: boolean;
}
