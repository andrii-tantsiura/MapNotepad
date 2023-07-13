export interface Error {
  [key: string]: string;
}

export interface ErrorResponse {
  error: {
    code: number;
    errors: Error[];
    message: string;
  };
}

export interface ISignUpWithEmailPayload {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface ISignInWithEmailPayload extends ISignUpWithEmailPayload {}

export interface ISignUpWithEmailResponse extends ErrorResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export interface ISignInWithEmailResponse extends ISignUpWithEmailResponse {
  registered: boolean;
}

export interface LoginResult {
  idToken?: string;
  errorCode?: string;
  errorMessage?: string;
}
