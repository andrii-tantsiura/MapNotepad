import { IBaseForm } from "./baseForm";

export interface ICreatePasswordForm extends IBaseForm {
  password: string;
  confirmPassword: string;
}
