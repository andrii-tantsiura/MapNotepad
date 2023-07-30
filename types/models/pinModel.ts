import { LatLng } from "react-native-maps";
import { IBaseModel } from "./baseModel";

export interface IPinModel extends IBaseModel {
  label: string;
  description: string;
  location: LatLng;
  isFavorite: boolean;
}

export interface IPinModelsArray extends Array<IPinModel> {}
