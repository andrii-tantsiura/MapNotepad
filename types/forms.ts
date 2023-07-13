interface BaseForm {
  [key: string]: string;
}

export interface LoginForm extends BaseForm {
  email: string;
  password: string;
}

export interface CreateUserForm extends BaseForm {
  name: string;
  email: string;
}

export interface CreatePasswordForm extends BaseForm {
  password: string;
  confirmPassword: string;
}
