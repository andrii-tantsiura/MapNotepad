import { LatLng } from "react-native-maps";

import { IBaseItemViewModel } from "./baseItemViewModel";

export interface IPinItemViewModel extends IBaseItemViewModel {
  label: string;
  description: string;
  location: LatLng;
  isFavorite: boolean;
}
