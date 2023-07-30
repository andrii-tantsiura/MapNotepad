import { IBaseForm } from "./baseForm";

export interface ICreateUserForm extends IBaseForm {
  name: string;
  email: string;
}
