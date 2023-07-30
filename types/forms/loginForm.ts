import { IBaseForm } from "./baseForm";

export interface ILoginForm extends IBaseForm {
  email: string;
  password: string;
}
