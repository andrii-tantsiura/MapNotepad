import { LatLng } from "react-native-maps";

import { IBaseModel } from "./baseModel";

export interface IPin extends IBaseModel {
  label: string;
  description: string;
  location: LatLng;
  isFavorite: boolean;
}

export interface IPins extends Array<IPin> {}
