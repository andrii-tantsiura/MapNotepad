interface BaseForm {
  [key: string]: string;
}

export interface ILoginForm extends BaseForm {
  email: string;
  password: string;
}

export interface ICreateUserForm extends BaseForm {
  name: string;
  email: string;
}

export interface ICreatePasswordForm extends BaseForm {
  password: string;
  confirmPassword: string;
}
