import { IBaseForm } from "./baseForm";

export interface IPinForm extends IBaseForm {
  label: string;
  description: string;
  latitude: string;
  longitude: string;
}
