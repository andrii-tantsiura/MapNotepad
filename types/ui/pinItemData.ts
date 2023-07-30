import { LatLng } from "react-native-maps";

import { IBaseItemData } from "./baseItemData";

export interface IPinItemData extends IBaseItemData {
  label: string;
  description: string;
  location: LatLng;
  isFavorite: boolean;
}
