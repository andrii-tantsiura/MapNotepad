export interface IBaseForm {
  [key: string]: string;
}

export interface ILoginForm extends IBaseForm {
  email: string;
  password: string;
}

export interface ICreateUserForm extends IBaseForm {
  name: string;
  email: string;
}

export interface ICreatePasswordForm extends IBaseForm {
  password: string;
  confirmPassword: string;
}

export interface IPinForm extends IBaseForm {
  label: string;
  description: string;
  latitude: string;
  longitude: string;
}
