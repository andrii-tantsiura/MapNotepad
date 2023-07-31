import { LatLng } from "react-native-maps";

import { IBaseItemModel } from "./baseItemModel";

export interface IPinItemModel extends IBaseItemModel {
  label: string;
  description: string;
  location: LatLng;
  isFavorite: boolean;
}
