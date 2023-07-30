export interface ISignUpWithEmailPayload {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface ISignInWithEmailPayload extends ISignUpWithEmailPayload {}

export interface ISignUpWithEmailResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export interface ISignInWithEmailResponse extends ISignUpWithEmailResponse {
  registered: boolean;
}

export interface ILoginResult {
  idToken?: string;
  errorCode?: string;
  errorMessage?: string;
}
