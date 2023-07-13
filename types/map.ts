import { LatLng } from "react-native-maps";

import { IBaseModel } from "./baseModel";

export interface IPin extends IBaseModel {
  location: LatLng;
  label: string;
  description?: string;
  isFavorite?: boolean;
}
